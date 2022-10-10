import React from "react"
import { graphql } from "gatsby"

import './index.css'
import { ContentsListing } from "../components/shared"

export default ContentsListing

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tab: { eq: "post" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tab
          }
        }
      }
    }
  }
`
