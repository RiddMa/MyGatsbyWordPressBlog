import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"

const Layout = ({ isHomePage, children ,pageName}) => {
  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  console.log(title)

  return (
    <div className="global-wrapper" data-is-root-path={isHomePage}>
      {/*<header className="global-header">*/}
      {/*  {isHomePage ? (*/}
      {/*    <h1 className="main-heading">*/}
      {/*      <Link to="/">{parse(title)}</Link>*/}
      {/*    </h1>*/}
      {/*  ) : (*/}
      {/*    <Link className="header-link-home" to="/">*/}
      {/*      {title}*/}
      {/*    </Link>*/}
      {/*  )}*/}
      {/*</header>*/}
      <header className="global-header">{pageName}</header>

      <main>{children}</main>

      <footer>
        © Ridd Ma {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        {` `}
        And <a href="https://wordpress.org/">WordPress</a>
        {`.`}
      </footer>
    </div>
  )
}

export default Layout
