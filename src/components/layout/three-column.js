import React from "react"
import Footer from "../basic/footer"
import { Scrollbars } from "react-custom-scrollbars-2"

import { motion, AnimatePresence } from "framer-motion"

const duration = 0.25
const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: duration,
      delay: duration,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration },
  },
}

const ThreeColumn = props => {
  return (
    <Scrollbars
      autoHeight
      autoHeightMin={"100vh"}
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      className={"global-scroller"}
    >
      <div
        className={
          "grid grid-rows-1 grid-cols-3 transition-all sm:grid-cols-[224px_auto_224px] xl:grid-cols-[256px_auto_256px] 2xl:grid-cols-[288px_auto_288px] max-w-screen-2xl mx-auto"
        }
      >
        <div
          id={"left-column"}
          className={
            "box-border sticky top-0 max-h-screen transition-all sm:py-8 xl:py-16 sm:ml-4 xl:ml-8 mr-0"
          }
        >
          {props.left}
        </div>
        <div className={"grid grid-flow-row dont-break-out"}>
          <main className={"transition-all sm:py-8 xl:py-16 sm:px-4 xl:px-8 2xl:px-12"}>
            {props.center}
          </main>
          <Footer />
        </div>
        <div
          id={"right-column"}
          className={
            "box-border sticky top-0 max-h-screen transition-all sm:py-8 xl:py-16 sm:mr-4 xl:mr-8 ml-0"
          }
        >
          {props.right}
        </div>
      </div>
    </Scrollbars>
  )
}

export default ThreeColumn
