import React from "react"
import { graphql } from "gatsby"

import "../styles/index.css"

import Post from "../components/post";
import Layout from "../components/layout";
import Pagination from "../components/pagination";

export default function Index({ data, pageContext }) {
  const { currentPage, pageCount } = pageContext;

  const posts_data = data.allContentfulPost.nodes;

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
  allContentfulPost(
    skip: $skip,
    sort: {order: DESC, fields: createdAt},
    limit: $limit
  ) {
    nodes {
      createdAt(formatString: "YYYY-MM-DD HH:MM")
      content {
        raw
      }
    }
  }
}
`
