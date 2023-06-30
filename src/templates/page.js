import React from "react"
import { graphql } from "gatsby"

import "../styles/index.css"

import Post from "../components/post";
import Layout from "../components/layout";
import Pagination from "../components/pagination";

export default function Index({ data, pageContext }) {
  const { currentPage, pageCount } = pageContext;

  const posts_data = data.allPost.nodes;

  const posts = posts_data.map(item => {
    return <Post item={item}></Post>
  });

  return (
    <Layout siteInfo={{}}>
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
  allPost(
    skip: $skip,
    sort: {order: DESC, fields: created_at},
    limit: $limit
  ) {
    nodes {
      content
      created_at
      images
    }
  }
}
`
