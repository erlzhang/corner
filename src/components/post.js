import React, { useState } from "react";
import { MEDIA_URL } from "../data/common";
import Gallery from "../components/gallery";
import CommentBox from "./comments";
import feather from "feather-icons";

const collapsedLength = 120;

function CollapsedContent({content}) {
  const [collapsed, setCollapsed] = useState(true);

  return(
    <>
      { collapsed ? 
        <>
          { content.slice(0, collapsedLength) }
          <span
            className="read-more"
            onClick={() => setCollapsed(false)}
          >[全文]</span>
        </> :
        content
      }
    </>
);
}

function Content({item}) {
  return (
        <div
          className="post__content content"
        >
          {
            item.length > collapsedLength ?
            <CollapsedContent content={item}/> :
            item
          }
        </div>
  );
}

export default function Post({item, focused, onfocus}) {
  const content = item.content;

  return (
    <article className="post">
      <div className="post__header">
        <img className="post__avatar" src="https://erlim.oss-cn-hongkong.aliyuncs.com/img/avatar.jpg"/>
        <div className="post__meta">
          <div className="post__author">
           Erl
           {
              item.top &&
               <span className="top-badge">置顶</span>
           }
          </div>
			    <time className="post__datetime">
            { new Date(item.createdAt).toLocaleString() }
          </time>
        </div>
			</div>
			{
				item.title &&
				<h1 className="post__title">{ item.title }</h1>
			}
      {
        content &&
        <Content item={item.content}/>
      }
      {
        item.images &&
        <Gallery images={item.images}/>
      }
      <a
        className="devider comment-devider"
        onClick={onfocus}
      >
      <div className="devider-content">
        {focused ? '收起' : '展开'}评论
      </div>
      </a>
      {
        focused &&
        <CommentBox id={item._id}/>
      }
    </article>
  )
}
