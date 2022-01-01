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
        <a href="https://hits.seeyoufarm.com" style={{ border: `none`, color: 'transparent' }}><img style={{ marginBottom: 0 }} src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2F9oelm.github.io&count_bg=%23848683&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits+since+2022&edge_flat=false"/></a>
        <div style={{ height: `10px`}} />
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