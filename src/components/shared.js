import React from 'react'
import { Link } from 'gatsby' 
import Bio from "./bio"
import Layout from "./layout"
import { Navigation } from "./Navigation"
import SEO from "./seo"
import LandingPageBioDetails from "./LandingPageBioDetails";
import { rhythm } from "../utils/typography"

export const ContentsListing = ({ data, location, title }) => {
    const siteTitle = title ? title : data.site.siteMetadata.title
    const contents = data.allMarkdownRemark.edges

    const isJournalsPage = location.pathname === `/journals` || location.pathname === `/journals/`

    return (
      <Layout location={location} title={siteTitle}>
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
          <Navigation />
        </section>
        {contents.map(({ node }, index) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={index}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={isJournalsPage ? `/journals${node.fields.slug}` : node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
              {/* {node.frontmatter.tags.map((tag) => <Link href={`/tags/${tag}`}></Link>)} */}
            </div>
          )
        })}
      </Layout>
    )
}