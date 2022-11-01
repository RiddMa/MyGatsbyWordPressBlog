import React from "react"
import Footer from "../basic/footer"
import { Scrollbars } from "react-custom-scrollbars-2"

import { motion, AnimatePresence } from "framer-motion"

const duration = 0.5
const variants = {
  initial: {
    opacity: 0,
    x: 100,
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
    y: 200,
    transition: { duration: duration },
  },
}

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
              <div id={"left-column"} className={"w-64 py-16"}>
                {props.left}
              </div>
              <main id={"center-column"} className={"basis-8/12 py-16"}>
                {/*<div className={"px-12"}>{props.center}</div>*/}

                <AnimatePresence>
                  <motion.main
                    key={location.pathname}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {props.center}
                  </motion.main>
                </AnimatePresence>
              </main>
              <div id={"right-column"} className={"w-64 py-16"}>
                {props.right}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </Scrollbars>
  )
}

export default ThreeColumn
