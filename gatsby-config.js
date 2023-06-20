require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})


module.exports = {
  siteMetadata: {
    title: `Stainsgate`,
    siteUrl: `http://corner.erl.im`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-postcss",
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `omrxkzhhrc93`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: `UdiQ8RfDpFfjAH6FImtzW5o4FW0yTqzVUbUeCTabNyU`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-remark`,
  ],
}
