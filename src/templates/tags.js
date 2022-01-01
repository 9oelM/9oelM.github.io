import React from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import SEO from "../components/seo"
import Bio from "../components/bio"
import { Navigation } from "../components/Navigation"
const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`
  return (
    <Layout location={location} title={`Joel's dev blog: tags`}>
      <SEO
          title={`Joel's dev blog - tagged as ${tag}`}
          keywords={[`blog`, `javascript`, `typescript`, `react`, `security`, tag]}
        />
        <a href="https://hits.seeyoufarm.com" style={{ border: `none`, color: 'transparent' }}><img style={{ marginBottom: 0 }} src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2F9oelm.github.io&count_bg=%23848683&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits+since+2022&edge_flat=false"/></a>
        <div style={{ height: `10px`}} />
      <Bio />
      <Navigation />
      <h1
      >{tagHeader}</h1>
      <ul
      >
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title, tab } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={tab === `journal` ? `/journals${slug}` : slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
      {/*
              This links to a page that does not yet exist.
              You'll come back to it!
            */}
      <Link to="/tags"
      >All tags</Link>
    </Layout>
  )
}
Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}
export default Tags
export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            tab
          }
        }
      }
    }
  }
`