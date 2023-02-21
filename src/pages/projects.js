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
import "./projects.css"

import GraphMp4 from "./projectvids/graph.mp4"
import RiscVMp4 from "./projectvids/riscv.mp4"
import AsyncjobsMp4 from "./projectvids/asyncjobs.mp4"
import UITheoryMp4 from "./projectvids/uitheory.mp4"
import YoutubeLiteMp4 from "./projectvids/youtubelite.mp4"
import Elasticpwn0Png from "./projectvids/elasticpwn0.png"
import Elasticpwn1Png from "./projectvids/elasticpwn1.png"
import PngRsPng from "./projectvids/pngrs.png"
import AtmPng from "./projectvids/atm.png"
import EmccPng from "./projectvids/emcc.png"

const ProjectItem = ({
  title,
  link,
  desc,
  gifLink,
  ghLink,
}) => {
  const shieldsParams = String(ghLink).replace(`https://github.com/`, ``)

  return <article
  >
    <h2><a href={link} target="_blank">{title}</a></h2>
    <a style={{
    }} href={ghLink} target="_blank">
      <img
        src={`https://img.shields.io/github/stars/${shieldsParams}?style=for-the-badge&logo=appveyor`}
        style={{
          margin: 0,
          padding: 0,
        }}
      />
    </a>
    <p>{desc}</p>
    <a
      href={link} target="_blank"
      style={{
        textDecoration: `none`,
        border: `none`
      }}
    >{
        (() => {
          if (typeof gifLink !== 'string') {
            return gifLink.map((link, i) => {
              return <img
                className="responsive-media"
                style={{
                  maxHeight: "400px",
                  maxWidth: `800px`,
                }} src={link} key={i} />
            })

          } else if (gifLink.endsWith(`.mp4`)) {
            return <video autoPlay loop
              className="responsive-media"
              style={{
                maxWidth: `800px`,
              }}>
              <source src={gifLink} type="video/mp4" />
            </video>
          } else {
            return <img
              className="responsive-media"
              style={{
                maxWidth: `800px`,
              }}
              src={gifLink} />
          }
        })()
      }
    </a>
  </article>
}

const ProjectsPage = ({
  location,
  data: {
    allMarkdownRemark: { group: tags },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout location={location} title="Joel's dev blog: projects">
    <SEO
      title="Joel's dev blog - projects"
      keywords={[`blog`, `projects`]}
    />
    <a href="https://hits.seeyoufarm.com" style={{ border: `none`, color: 'transparent' }}><img style={{ marginBottom: 0 }} src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2F9oelm.github.io&count_bg=%23848683&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits+since+2022&edge_flat=false" /></a>
    <div style={{ height: `10px` }} />
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
        <div
          style={{
            display: `grid`,
            gridTemplateRows: `1fr`,
          }}
        >
          {
            [
              {
                title: `@graphcentral/graph`,
                link: `https://graphcentral.github.io/graph/`,
                ghLink: `https://github.com/graphcentral/graph`,
                desc: `Performant graph visualization on the web with WebGL + Webworkers + IndexedDB`,
                gifLink: GraphMp4,
              },
              {
                title: `Youtube Lite`,
                link: `https://youtube-lite.js.org/#/`,
                ghLink: `https://github.com/9oelM/youtube-lite`,
                desc: `No more wasting time on watching random, irrelevant videos on Youtube`,
                gifLink: YoutubeLiteMp4,
              },
              {
                title: `RISC-V Simulator`,
                link: `https://github.com/9oelM/risc-v-web-simulator`,
                ghLink: `https://github.com/9oelM/risc-v-web-simulator`,
                desc: `RISC-V Simulator running on Webassembly`,
                gifLink: RiscVMp4,
              },
              {
                title: `elasticpwn`,
                link: `https://github.com/9oelM/elasticpwn`,
                ghLink: `https://github.com/9oelM/elasticpwn`,
                desc: `Elasticsearch security analytics tool`,
                gifLink: [Elasticpwn0Png, Elasticpwn1Png],
              },
              {
                title: `png-rs`,
                link: `https://github.com/9oelM/png-rs`,
                ghLink: `https://github.com/9oelM/png-rs`,
                desc: `Webassembly-first PNG decoder in Rust`,
                gifLink: PngRsPng,
              },
              {
                title: `UI Theory`,
                link: `https://github.com/9oelM/ui-theory`,
                ghLink: `https://github.com/9oelM/ui-theory`,
                desc: `React made out of vanilla Javascript`,
                gifLink: UITheoryMp4,
              },
              {
                title: `async-jobs`,
                link: `https://9oelm.github.io/async-jobs`,
                ghLink: `https://github.com/9oelM/async-jobs`,
                desc: `Track, manage, access all async jobs like network requests on browser at one place`,
                gifLink: AsyncjobsMp4,
              },
              {
                title: `atm`,
                link: `https://github.com/9oelM/atm`,
                ghLink: `https://github.com/9oelM/atm`,
                desc: `A set of AuToMation scripts for hacking.`,
                gifLink: AtmPng,
              },
              {
                title: `emscripten-cplusplus-webpack-example`,
                link: `https://9oelm.github.io/emscripten-cplusplus-webpack-example/`,
                ghLink: `https://github.com/9oelM/emscripten-cplusplus-webpack-example`,
                desc: `Example of compiling C++ using Emscripten for the use in webpack environments`,
                gifLink: EmccPng,
              },
              {
                title: `as-pect`,
                link: `https://github.com/as-pect/as-pect`,
                ghLink: `https://github.com/as-pect/as-pect`,
                desc: `Assemblyscript testing framework`,
                gifLink: ``,
              },
              {
                title: `react-typescript-monorepo-boilerplate`,
                link: `https://github.com/9oelM/react-typescript-monorepo-boilerplate`,
                ghLink: `https://github.com/9oelM/react-typescript-monorepo-boilerplate`,
                desc: `Well-organized monorepo boilerplate for modern frontend`,
                gifLink: ``,
              },
            ].map((props, i) => <ProjectItem key={i} {...props} />)
          }
        </div>
      </div>
      <Bio />
      <Navigation />
    </div>
  </Layout>
)


export default ProjectsPage

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