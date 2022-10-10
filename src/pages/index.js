import React from "react"
import { graphql } from "gatsby"
import { Provider } from "react-redux"
import Seo from "../components/seo"
import { Button, Link } from "@mui/material"
import MyLayout from "../components/my-layout"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import store from "../components/rematch/store"
import Count from "../components/rematch/count"
import HeroTitle from "../components/hero-title"
import { StyledEngineProvider } from "@mui/material/styles"
export default function Home({ data }) {
  //highlight-line
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <MyLayout title="Ridd的主页">
          <Seo title="Index" />
          <Container
            maxWidth={"xl"}
            sx={{ paddingTop: "24px", fontFamily: "Helvetica" }}
            className={"acrylic-light"}
          >
            <Container>
              <HeroTitle></HeroTitle>
              <Button variant="contained">博客</Button>
              <Button variant="contained">博客</Button>
              <h4>Posts</h4>
              <Count></Count>
              <Box sx={{ height: "640px" }}></Box>
            </Container>
          </Container>
        </MyLayout>
      </StyledEngineProvider>
    </Provider>
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
