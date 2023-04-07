import React from "react"
import { Link, graphql } from "gatsby"
import Disqus from 'gatsby-plugin-disqus'
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

import "katex/dist/katex.min.css"
import "./blog-post.css"
import { SF } from "../styles/theme"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { title, siteUrl } = this.props.data.site.siteMetadata
    const { previous, next } = this.props.pageContext
    const { location } = this.props

    const isJournalsSubPage = location.pathname.startsWith(`/journals/`)

    return (
      <Layout location={location} title={`${isJournalsSubPage ? `${title}: journals` : title }`}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          keywords={post.frontmatter.keywords}
        />
        <h1
          style={{ ...SF.darkText, marginTop: `5px` }}
        >{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
            ...SF.darkText
          }}
        >
          {post.frontmatter.date}
        </p>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
            ...SF.darkText
          }}
        >
          ⏳ {post.fields.readingTime.text}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
            ...SF.darkText
          }}
        >
          <li
            style={SF.darkText}
          >
            {previous && (
              <Link to={isJournalsSubPage ? `/journals${previous.fields.slug}` : previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li
            style={SF.darkText}
          >
            {next && (
              <Link to={isJournalsSubPage ? `/journals${next.fields.slug}` : next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
        
        <Disqus 
          identifier={post.id}
          title={post.frontmatter.title}
          url={`${siteUrl}${location.pathname}`}
        />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        keywords
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`
