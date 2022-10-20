import React from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import { Button, Link } from "@mui/material"
import MyLayout from "../components/layout/my-layout"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import store from "../components/rematch/store"
import Count from "../components/rematch/count"
import HeroTitle from "../components/hero-title"
import DarkModeToggle from "../components/basic/dark-mode-toggle"

export default function Index(props) {
  //highlight-line
  return (
    <MyLayout title="Ridd的主页">
      <Seo title="Index" />
      <Container
        maxWidth={"xl"}
        sx={{ paddingTop: "24px", fontFamily: "Helvetica" }}
        className={"acrylic-light"}
      >
        <Container>
          <HeroTitle></HeroTitle>
          <DarkModeToggle></DarkModeToggle>
          <Button variant="contained" href={"/home"}>
            博客
          </Button>
          <Box sx={{ height: "640px" }}></Box>
        </Container>
      </Container>
    </MyLayout>
  )
}

//highlight-start
export const pageQuery = graphql`
  query {
    allWpPost(sort: { fields: [date] }) {
      nodes {
        title
        excerpt
        slug
      }
    }
  }
`
//highlight-end
