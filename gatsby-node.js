const path = require(`path`)
const axios = require('axios')
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const BASE_URL = process.env.API;

const getPosts = () => {
  return axios.get(BASE_URL + '/posts')
    .then(res => {
      return res.data.data;
    })
}

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode, createNodeField } = actions
  const posts = await getPosts()
  posts.forEach(post => {
    post.id = post.createdAt;
    createNode({
      ...post,
      name: post.id,
      id: createNodeId(`book-${post.id}`),
      internal: {
        type: 'post',
        content: JSON.stringify(post),
        contentDigest: createContentDigest(post),
      },
    });
  })
}

// Pagination
const PER_PAGE = 5;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allPost {
        totalCount
      }
    }
  `)
  const count = result.data.allPost.totalCount;
  const pageCount = Math.ceil(count / PER_PAGE);
  for (let i = 0; i < pageCount; i++) {
    let pagePath = i === 0 ? '/' : `/${i + 1}`;
    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/page.js`),
      context: {
        limit: PER_PAGE,
        skip: i * PER_PAGE,
        currentPage: i + 1,
        pageCount: pageCount
      }
    });
  }
}
