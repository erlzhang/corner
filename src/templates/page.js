import React, { useState } from "react"
import { graphql } from "gatsby"

import "../styles/index.css"

import Post from "../components/post";
import Layout from "../components/layout";
import Pagination from "../components/pagination";

export default function Index({ data, pageContext }) {
  const site = data.site.siteMetadata;
  const { currentPage, pageCount } = pageContext;

  const [focused, setFocused] = useState(null);

  const posts_data = data.allPost.nodes;

  const posts = posts_data.map(item => {
    return <Post
      item={item}
      focused={focused === item._id}
      onfocus={() => {
        if (focused === item._id) {
          setFocused(null);
        } else {
          setFocused(item._id);
        }
        console.warn('on focused');
      }}
    ></Post>
  });

  return (
    <Layout siteInfo={site}>
      <div className="devider">
        <div className="devider-content">
          共{ data.all.totalCount }条状态
        </div>
      </div>
      { posts }
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
      />
    </Layout>
  )
}

export const query = graphql`
query PageQuery($skip: Int!, $limit: Int!) {
  site {
    siteMetadata {
      avatar
      description
      siteUrl
      title
      cover
    }
  }
  allPost(
    skip: $skip,
    sort: {order: [ASC, DESC], fields: [top, created_at]},
    limit: $limit
  ) {
    nodes {
      content
      created_at
      images
      _id
      top
    }
  }

  all: allPost {
    totalCount
  }
}
`
