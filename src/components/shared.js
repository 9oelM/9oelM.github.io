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
        <a href="https://hits.seeyoufarm.com" style={{ border: `none`, color: 'transparent' }}><img style={{ marginBottom: 0 }} src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2F9oelm.github.io&count_bg=%23848683&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits+since+2022&edge_flat=false"/></a>
        <div style={{ height: `10px`}} />
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