import React, { useState, useEffect } from "react";
import NewComment from "./new-comment";
import Comment from "./comment";
import "../styles/comment.css"
import NewCommentBox from "../components/new-comment-box";
import {
  API_URL,
  GRAVATAR_URL,
  USER_STORAGE_KEY
} from "../data/common";
import axios from "axios";
import feather from "feather-icons";
import md5 from "md5"

const groupCommentsTree = (data) => {
  const _mapById = {};
  const nodes = data.map(item => {
    const node = {
      ...item,
      children: []
    };
    _mapById[id] = node;
    return node;
  });

  const tree = [];

  nodes.forEach(node => {
    if (!node.parent) {
      tree.push(node);
    } else {
      const pNode = _mapById[node.parent];
      if (pNode) {
        pNode.children.push(node)
      }
    }
  });
  return tree;
}

export default function CommentBox({id}) {
  const [showDialog, setShowDialog] = useState(false);
  const [list, setList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [replyTo, setReplyTo] = useState(null);

  const loadData = () => {
    setLoading(true);
    return axios.get(API_URL + 'comments/' + id)
      .then(res => {
        setLoading(false);
        return setList(groupCommentsTree(res.data.data));
      });
  }

  const updateAvatar = () => {
    let user = localStorage.getItem(USER_STORAGE_KEY);
    if (user) {
      user = JSON.parse(user);
      setEmail(md5(user.email));
    }
  }

  useEffect(() => {
    if (loaded) {
      return;
    }

    updateAvatar();

    loadData()
      .then(res => {
        setLoaded(true);
      });
  });

  const comments = list.map(item => {
    return (
      <Comment
        item={item}
        onReply={(_item) => {
          setReplyTo({
            id: _item.id,
            name: _item.name
          })
          setShowDialog(true)
        }}
      />
    )
  })
  return (
    <div className="comment-box">
      <NewComment
        email={email}
        onFocus={() => {
          setShowDialog(true)
          setReplyTo(null);
        }}
      ></NewComment>
      <div className="comment-list">
        {
          loading &&
          <div className="comment-list-loading">
            <span
              classNmae="icon icon-loading"
              dangerouslySetInnerHTML={{ __html: feather.icons.loader.toSvg({width: 24, height: 24}) }}
            ></span>
          </div>
        }
        {
          (loaded && !comments.length) &&
          <div className="comment-blank-state">暂无评论</div>
        }
        { comments }
      </div>
      {
        showDialog &&
        <NewCommentBox
          id={id}
          replyTo={replyTo}
          onClose={() => {
            setShowDialog(false);
            updateAvatar();
          }}
          triggerLoad={loadData}
        />
      }
    </div>
  )
}
