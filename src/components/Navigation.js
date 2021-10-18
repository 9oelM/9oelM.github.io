import React from 'react'
import { Link } from 'gatsby'

export const Navigation = () => {
    return [[`Posts`, `/`], [`Journals`, `/journals`], [`Tags`, `/tags`]].map(([tabName, tabPath]) => {
        return <Link
        key={tabName}
        style={{
          display: 'block',
          cursor: `pointer`
        }}
        // style={{ 
        //   ...SF.button,
        //   padding: `${rhythm(0.3)} ${rhythm(0.8)}`,
        // }}
        href={tabPath}
      >{tabName}</Link>
      })
}