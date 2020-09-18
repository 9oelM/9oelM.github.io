import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
            }}
          >
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <p>
              Written by <strong>{author}</strong>. Joel's been interested in Javascript, Typescript, Assemblyscript, Rust, Dart, and React, Flutter, and more.  
              {` `}
              <a href={`https://github.com/${social.twitter}`}>
                Go check him up on Github!
              </a>
              <br />
              {` `}
              Joel's also got his own random thoughts journal (mostly in Korean). 
              <a href='https://www.notion.so/9oelm/2acfc525c9964be080d218770e6b8431?v=a7970392a2c54d3b857db145ded4de9e'>
                Check it out too if you are curious.
              </a>
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
