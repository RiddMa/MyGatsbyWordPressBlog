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
              <div className={"basis-3/12"}>{props.left}</div>
              <div className={"basis-6/12"}>
                <main>{props.center}</main>
              </div>
              <div className={"basis-3/12"}>{props.right}</div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </Scrollbars>
  )
}

const useStyles = makeStyles({
  container: {
    height: "100%", // So that grids 1 & 4 go all the way down
    minHeight: 150, // Give minimum height to a div
    border: "1px solid black",
    fontSize: 30,
    textAlign: "center",
  },
  containerTall: {
    minHeight: 250, // This div has higher minimum height
  },
})

export default ThreeColumn
