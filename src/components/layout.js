import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import { SF } from "../styles/theme"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
            ...SF.darkText
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              ...SF.darkText
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(40),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          ...SF.darkBackground,
        }}
      >
        <header
        >{header}</header>
        <main
        >{children}</main>
        <footer
          style={{
            ...SF.darkBackground,
            ...SF.darkText,
            marginTop: rhythm(2),
          }}
        >
          © Joel Mun {new Date().getFullYear()}
        </footer>
      </div>
    )
  }
}

export default Layout
