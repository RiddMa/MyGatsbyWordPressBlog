import React from "react"
import Grid2 from "@mui/material/Unstable_Grid2"
import { makeStyles } from "@mui/styles"
import clsx from "clsx"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import ResponsiveAppBar from "../responsive-app-bar"
import MainLeftPanel from "../main-left-panel"
import Footer from "../footer"
import { Scrollbars } from "react-custom-scrollbars-2"

const ThreeColumn = props => {
  return (
    <Scrollbars
      id={"global-scroller"}
      autoHeight
      autoHeightMin={"100vh"}
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      className={"global-scroller"}
    >
      <div
        className={"container-box bg-fixed bg-cover min-h-screen m-0 p-0 "}
        // style={{
        //   backgroundImage:
        //     "url(https://jp2.riddma.com/wp-content/uploads/2022/09/STScI-1Small.png)",
        // }}
      >
        <div className={"flex flex-row justify-center"}>
          <div className={"grow flex flex-col max-w-screen-2xl"}>
            <div className={"flex flex-row"}>
              <div id={"left-column"} className={"w-64 py-16"}>{props.left}</div>
              <main id={"center-column"}  className={"basis-8/12 py-16"}>
                <div className={"px-12"}>{props.center}</div>
              </main>
              <div id={"right-column"}  className={"w-64 py-16"}>{props.right}</div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </Scrollbars>
  )
}

export default ThreeColumn
