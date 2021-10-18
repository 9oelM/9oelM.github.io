import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"
import { SF } from "../styles/theme"
import { BugcrowdLogo, GithubLogo, HackeroneLogo, LinkedinLogo, MediumLogo } from "./logos"

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
            <p
              style={SF.darkText}
            >
              Written by <strong>{author}</strong>. His main interests are fullstack and security. Likes GoLang, Typescript, React, Node.js, Wasm and more. Joel's been working as a lead SWE for some length of time. Really familiar with a wide range of tools. Now, he's digging into security.
              {` `}
              <div style={{ marginTop: '10px'}} />
              <a style={SF.logoButton} href="https://github.com/9oelM"  target="_blank" rel="noopener noreferer"><GithubLogo /></a>
              <a style={SF.logoButton} href="https://www.linkedin.com/in/7oelm/"  target="_blank" rel="noopener noreferer"><LinkedinLogo /></a>
              <a style={SF.logoButton} href="https://hackerone.com/9oelm" target="_blank" rel="noopener noreferer"><HackeroneLogo /></a>
              <a style={SF.logoButton} href="https://bugcrowd.com/9oelm" target="_blank" rel="noopener noreferer"><BugcrowdLogo /></a>
              <a style={SF.logoButton} href="https://medium.com/@9oelm" target="_blank" rel="noopener noreferer"><MediumLogo /></a>
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
