import React, { useState, useEffect } from "react";
import feather from "feather-icons";
import axios from "axios";
import {
  API_URL,
  GRAVATAR_URL,
  USER_STORAGE_KEY
} from "../data/common"
import md5 from "md5"

export default function NewCommentBox({ onClose, id, triggerLoad, replyTo }) {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    url: "",
    content: ""
  });

  const [loaded, setLoaded] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const setUser = (data) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({
      name: data.name,
      email: data.email,
      url: data.url
    }));
  }

  const loadUser = () => {
    const user = localStorage.getItem(USER_STORAGE_KEY);
    if (user) {
      return JSON.parse(user);
    }
  }

  useEffect(() => {
    if (loaded) {
      return;
    }
    const user = loadUser();
    if (user) {
      setFields({
        ...fields,
        ...user
      });
    }
    setLoaded(true);
  });

  const handleChange = (e) => {
    let data = {
      ...fields,
      [e.target.name]: e.target.value
    }
    setFields(data);
    setUser(data);
  }

  const submit = (e) => {
    setShowError(false);
    setLoading(true);
    e.preventDefault();
    axios.post(API_URL + '/' + id, {
      ...fields,
      post_id: Number(id),
      created_at: new Date().getTime(),
      parent: replyTo && replyTo.id,
      id: md5(fields.name + new Date().getTime())
    }).then(res => {
      triggerLoad();
      onClose();
    }).catch(e => setShowError(true))
    .finally(e => setLoading(false))
  }

  return (
    <>
      <div className="comment-mask">
        <div className="comment-dialog">
          <div className="comment-dialog-header">
        <img
          src={`${GRAVATAR_URL}${ md5(fields.email) }?d=mm&s=30`}
          className="comment-dialog-avatar"
        />
          {
            replyTo &&
            <span className="dialog-reply">
              回复给
              <strong className="dialog-reply">{ replyTo.name }</strong>
            </span>
          }
        <a
           className="icon close-btn"
          onClick={onClose}
           dangerouslySetInnerHTML={{ __html: feather.icons.x.toSvg({width: 20, height: 20}) }}
        />

          </div>
          <form>
            {
              showError &&
            <div className="comment__error_msg">
              失败了，不知道咋回事儿~
            </div>
            }
            <div class="comment__box">
       <div class="comment__box_top hide" id="visitorInfo">
         <div class="input-group">
            <input
              type="text" name="name" placeholder="*昵称"
              class="form-control form-control-name"
              required autocomplete="true"
              value={fields.name}
              onChange={handleChange}
            />
            <label class="input-label">
        <span
           className="icon"
           dangerouslySetInnerHTML={{ __html: feather.icons.user.toSvg({width: 16, height: 16}) }}
        />
            </label>
          </div>
          <div class="input-group">
            <input
              type="text" placeholder="*电子邮箱"
              class="form-control" type="email"
              required name="email" autocomplete="true"
              value={fields.email}
              onChange={handleChange}
            />
            <label class="input-label">
        <span
           className="icon"
           dangerouslySetInnerHTML={{ __html: feather.icons.mail.toSvg({width: 16, height: 16}) }}
        />
            </label>
          </div>
          <div class="input-group">
            <input
              type="text"
              placeholder="网站"
              class="form-control"
              type="url"
              name="url"
              value={fields.url}
              onChange={handleChange}
              autocomplete="true"
            />
            <label class="input-label">
        <span
           className="icon"
           dangerouslySetInnerHTML={{ __html: feather.icons.link.toSvg({width: 16, height: 16}) }}
        />
            </label>
          </div>
        </div>
      <div class="comment__box_center">
        <textarea
          name="content"
          class="form-control message-text"
          placeholder="说点什么吧..." rows="3"
          value={fields.content}
          onChange={handleChange}
        ></textarea>
      </div>
      <div class="comment__box_bottom">
        <button
          type="submit" class="submit-btn" id="submitBtn"
          onClick={submit}
        >
          {
            loading ?
            <span
              classNmae="icon icon-loading"
              dangerouslySetInnerHTML={{ __html: feather.icons.loader.toSvg({width: 16, height: 16}) }}
            ></span> :
            '发布'
          }
        </button>
      </div>
    </div>
          </form>
        </div>
      </div>
    </>
  )
}
