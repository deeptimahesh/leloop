/**
 * @type {import('gatsby').GatsbyConfig}
*/
module.exports = {
  pathPrefix: "/leloop",
  siteMetadata: {
    title: `LeLoop`,
    siteUrl: `https://deeptimahesh.github.io`
  },
  plugins: ["gatsby-plugin-sitemap", "gatsby-plugin-mdx", "gatsby-plugin-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
  ]
};