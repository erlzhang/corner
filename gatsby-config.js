require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})


module.exports = {
  siteMetadata: {
    title: `Erl`,
    name: 'Erl',
    siteUrl: `http://corner.erl.im`,
    description: `
      Erl的自留地，纯流水账，记录日常生活点滴
    `,
    avatar: 'https://erlim.oss-cn-hongkong.aliyuncs.com/img/avatar.jpg',
    cover: 'https://erlim.oss-cn-hongkong.aliyuncs.com/img/sky/image.jpg'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-postcss",
    `gatsby-transformer-remark`,
    `gatsby-plugin-image`,
    `gatsby-transformer-remark`
  ],
}
