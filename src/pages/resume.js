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
import { SF, Theme } from "../styles/theme"
import "./resume.css"

const ResumePage = ({
  location,
  data: {
    allMarkdownRemark: { group: tags },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout location={location} title="Joel's dev blog: résumé">
    <SEO
          title="Joel's dev blog - resume"
          keywords={[`blog`, `resume`]}
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
      <div style={{ width: `100%`, display: `flex`, justifyContent: `center` }}>
      <a target="_blank" href="/joel-hj-mun-resume.pdf" class="resume-button" style={{ ...SF.button, padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`, cursor: `pointer`, borderRadius: `5px`, background: Theme.Dark50, color: Theme.Dark100 }}>Get my latest résumé here!!</a>
      </div>
    </div>
  </Layout>
)

ResumePage.propTypes = {
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

export default ResumePage

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