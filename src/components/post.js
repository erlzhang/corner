import React, { useState } from "react";
import { MEDIA_URL } from "../data/common";
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import Gallery from "../components/gallery";

const Text = ({ children }) => <p>{children}</p>

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}


function Content({item}) {
  const [collapsed, setCollapsed] = useState(true);

  return (
        <div
          className="post__content content"
        >
          {item && renderRichText(item, options)}
        </div>
  );
}

export default function Post({item}) {
  const content = item.content.raw;
  console.warn('item', item, content);

  return (
    <article className="post">
      <div className="post__header">
        <img className="post__avatar" src="https://erlim.oss-cn-hongkong.aliyuncs.com/img/avatar.jpg"/>
        <div className="post__meta">
          <div className="post__author">
           Erl
          </div>
			    <time className="post__datetime">{ item.createdAt}</time>
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
        item.gallery &&
        <Gallery images={item.gallery} />
      }
    </article>
  )
}
