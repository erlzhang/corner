import React, { useState } from "react";
import dayjs from 'dayjs';
import {
  GRAVATAR_URL
} from "../data/common";

const formatUrl = (url) => {
  if (url.includes('http')) {
    return url;
  } else {
    return `http://${url}`;
  }
}

export default function Comment({ item, children }) {
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
              { dayjs(item.created_at).format('YYYY-MM-DD HH:MM') }
            </time>
          </div>
          <div className="comment__content">
          { item.content }
          </div>
        </div>
      </div>
    </div>
  )
}
