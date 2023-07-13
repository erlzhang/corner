require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})


module.exports = {
  siteMetadata: {
    title: `Erl`,
    name: 'Erl',
    siteUrl: `http://corner.erl.im`,
    description: `
      Erl的自留地，日常，吐槽
    `,
    avatar: 'https://erlim.oss-cn-hongkong.aliyuncs.com/img/avatar.jpg',
    cover: 'https://erlim.oss-cn-hongkong.aliyuncs.com/img/sky/image.jpg'
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
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-G8WW41ZF4X", // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "G-G8WW41ZF4X",
          anonymize_ip: true,
          cookie_expires: 0,
        },
      },
    },

  ],
}
