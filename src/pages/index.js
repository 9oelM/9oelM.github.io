import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LandingPageBioDetails from "../components/LandingPageBioDetails";
import { rhythm } from "../utils/typography"

import './index.css'
import { SF } from "../styles/theme"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Joel's dev blog"
          keywords={[`blog`, `javascript`, `typescript`, `react`]}
        />
        <Bio />
        <LandingPageBioDetails />
        <section
          style={{
            width: `100%`,
          }}
        >
          {/* <h3 style={{ margin: 0, padding: 0, marginTop: rhythm(1) }}>See</h3> */}
          <div style={{ marginTop: rhythm(1) }}></div>
          {
            [`Posts`, `Journals`, `Books`, `Tags`].map((tabName) => {
              return <Link
              style={{
                display: 'block',
                cursor: `pointer`
              }}
              // style={{ 
              //   ...SF.button,
              //   padding: `${rhythm(0.3)} ${rhythm(0.8)}`,
              // }}
              href="/tags"
            >{tabName}</Link>
            })
          }
        </section>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
