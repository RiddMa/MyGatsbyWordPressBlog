import React from "react"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"

const Footer = props => {
  return (
    <Container
      className={"acrylic-dark"}
      sx={{
        textAlign: "center",
        minHeight: "100px",
        margin: "24px 0 0 0",
        minWidth: "100vw",
      }}
    >
      <Typography variant="body2" color={"white"}>
        © Ridd Ma {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        {` `}
        And <a href="https://wordpress.org/">WordPress</a>
        {`.`}
      </Typography>
    </Container>
  )
}

export default Footer
