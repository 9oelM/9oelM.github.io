const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const kebabCase = require('lodash.kebabcase')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve("src/templates/tags.js")

  return graphql(
    `
      {
        postsRemark: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { tab: { eq: "post" } } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tab
                tags
                keywords
              }
            }
          }
        }
        journalsRemark: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { tab: { eq: "journal" } } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tab
                tags
                keywords
              }
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const createContentPage = (contents, content, index, pathFunc) => {
      const previous = index === contents.length - 1 ? null : contents[index + 1].node
      const next = index === 0 ? null : contents[index - 1].node

      createPage({
        path: pathFunc ? pathFunc(content.node.fields.slug) : content.node.fields.slug,
        component: blogPost,
        context: {
          slug: content.node.fields.slug,
          previous,
          next,
        },
      })
    }
    // Create blog posts pages.
    const posts = result.data.postsRemark.edges
    posts.forEach((post, index) => createContentPage(posts, post, index))
    const journals = result.data.journalsRemark.edges
    journals.forEach((journal, index) => createContentPage(journals, journal, index, (path) => `/journals${path}`))
    // Extract tag data from query
    const tags = result.data.tagsGroup.group
    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${kebabCase(tag.fieldValue)}/`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
        },
      })
    })


  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /darkreader/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
