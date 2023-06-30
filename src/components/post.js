import React, { useState } from "react";
import { MEDIA_URL } from "../data/common";
import Gallery from "../components/gallery";
import dayjs from 'dayjs';

function Content({item}) {
  const [collapsed, setCollapsed] = useState(true);

  return (
        <div
          className="post__content content"
        >
          { item }
        </div>
  );
}

export default function Post({item}) {
  const content = item.content;
  console.warn('item', item, content);

  return (
    <article className="post">
      <div className="post__header">
        <img className="post__avatar" src="https://erlim.oss-cn-hongkong.aliyuncs.com/img/avatar.jpg"/>
        <div className="post__meta">
          <div className="post__author">
           Erl
          </div>
			    <time className="post__datetime">{ dayjs(item.created_at).format('YYYY-MM-DD HH:MM')}</time>
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
    </article>
  )
}
