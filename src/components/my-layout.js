import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Scrollbars } from "react-custom-scrollbars-2"
import "/src/css/ridd.css"
import Footer from "./footer"
import ResponsiveAppBar from "./ResponsiveAppBar"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

const MyLayout = props => {
  // const {
  //   wp: {
  //     generalSettings: { title },
  //   },
  // } = useStaticQuery(graphql`
  //   query MyLayoutQuery {
  //     wp {
  //       generalSettings {
  //         title
  //         description
  //       }
  //     }
  //   }
  // `)

  return (
    <Scrollbars
      autoHeight
      autoHeightMin={"100vh"}
      autoHide
      // Hide delay in ms
      autoHideTimeout={1000}
      // Duration for hide animation in ms.
      autoHideDuration={200}
      className={"global-scroller"}
    >
      <Box
        sx={{ margin: 0, padding: 0, minHeight: "100vh" }}
        className={"container-box bg-fixed bg-cover"}
        style={{
          backgroundImage:
            "url(https://jp2.riddma.com/wp-content/uploads/2022/09/STScI-1Small.png)",
        }}
      >
        <ResponsiveAppBar title={props.title}></ResponsiveAppBar>

        <main>{props.children}</main>

        <Footer />
      </Box>
    </Scrollbars>
  )
}

export default MyLayout
