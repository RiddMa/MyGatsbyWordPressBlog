import React from "react"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"

const Footer = props => {
  return (
    // <div className="acrylic-dark">
    <div>
      <Typography variant="body2" color={"text.hint"}>
        © Ridd Ma {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        {` `}
        And <a href="https://wordpress.org/">WordPress</a>
        {`.`}
      </Typography>
    </div>
  )
}

export default Footer
