import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import { Navigation } from "../components/Navigation"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Bio from "../components/bio"

const TagsPage = ({
  location,
  data: {
    allMarkdownRemark: { group: tags },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout location={location} title="Joel's dev blog: tags">
    <SEO
          title="Joel's dev blog - tags"
          keywords={[`blog`, `javascript`, `typescript`, `react`]}
        />
      <Bio />
    <div>
      {/* <h1
        style={{
          margin: `${rhythm(2)} ${rhythm(1)}`
        }}
      >Tags</h1> */}

      <Navigation />
      <div style={{ marginTop: `40px` }} />
      <ul
       
      >
        {[...tags].sort((a, b) => b.totalCount - a.totalCount).map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
)

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`