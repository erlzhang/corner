const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

// Pagination
const PER_PAGE = 5;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allContentfulPost {
        totalCount
      }
    }
  `)
  const count = result.data.allContentfulPost.totalCount;
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
