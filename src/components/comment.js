import React, { useState } from "react";
import {
  GRAVATAR_URL
} from "../data/common";

const formatUrl = (url) => {
  if (!url) {
    return url;
  }
  if (url.includes('http')) {
    return url;
  } else {
    return `http://${url}`;
  }
}

export default function Comment({ item, children, onReply }) {
  return (
    <div className="comment">
      <div className="comment__main">
        <img
          src={`${GRAVATAR_URL}${ item.email }?d=mm&s=30`}
          className="comment-avatar"
        />
        <div className="comment__right">
          <div className="comment__meta">
            <a
              className="comment__author"
              href={formatUrl(item.url)}
              target="_blank"
              rel="nofollow"
            >{ item.name }</a>
            <time className="comment__time">
              { new Date(item.created_at).toLocaleString() }
            </time>
            <a
              className="comment__reply_btn"
              onClick={() => onReply(item)}
            >[回复]</a>
          </div>
          <div className="comment__content">
          { item.content }
          </div>
          {
            item.children.length > 0 &&
            <div className="comments">
              {
                item.children.map(child => {
                  return (
                  <Comment
                    item={child}
                    onClick={() => onReply(child)}
                  />
                  )
                })
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
}
