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
      resolve: `gatsby-source-faunadb`,
      options: {
        // The secret for the key you're using to connect to your Fauna database.
        // You can generate on of these in the "Security" tab of your Fauna Console.
        secret: process.env.FAUNA_SECRET,
        // The name of the index you want to query
        // You can create an index in the "Indexes" tab of your Fauna Console.
        index: `allPosts`,
        // If your index requires arguments, you can specify them like this.
        // You can omit this property if your index doesn't need any.
        //arguments: ["bird"],
        // This is the name under which your data will appear in Gatsby GraphQL queries
        // The following will create queries called `allBird` and `bird`.
        type: "post",
        // If you need to limit the number of documents returned, you can specify a
        // maximum number to read.
        size: 100
    },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-remark`,
  ],
}
