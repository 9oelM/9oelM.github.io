import React from 'react'
import { Link } from 'gatsby'
import { useLocation }  from '@reach/router'
import './navigation.css'

export const Navigation = () => {
    const location = useLocation()
    console.log()

    return [[`Posts`, `/`], [`Journals`, `/journals/`], [`Tags`, `/tags/`], 
      // [`résumé`, `/resume/`]
    ].map(([tabName, tabPath]) => {
        return <Link
        key={tabName}
        className="navigation-link"
        style={{
          display: 'block',
          cursor: `pointer`,
        }}
        href={tabPath}
      >{location.pathname === tabPath ? `👉  ${tabName}` : tabName}</Link>
      })
}