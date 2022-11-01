import React, { useRef } from "react"
import { useState, useEffect } from "react"
import Footer from "../basic/footer"
import { Scrollbars } from "react-custom-scrollbars-2"
import { useElementSize } from "usehooks-ts"

import { motion, AnimatePresence } from "framer-motion"

const duration = 0.5
const variants = {
  initial: {
    opacity: 0,
    // x: 500,
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
    // x: 500,
    transition: { duration: duration },
  },
}

const ThreeColumn = props => {
  const [postRef, { width: postWidth, height: postHeight }] = useElementSize()
  const scrollRef = useRef(null)

  const onScrollFrame = () => {
    const { clientHeight, scrollTop } = scrollRef.current.getValues()
    document.documentElement.style.setProperty(
      "--scroll",
      (scrollTop / clientHeight).toString()
    )
  }

  useEffect(() => {}, [])

  return (
    <Scrollbars
      ref={scrollRef}
      onScrollFrame={onScrollFrame}
      autoHeight
      autoHeightMin={"100vh"}
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      id={"global-scroller"}
      className={"global-scroller"}
    >
      <div className={"container-box bg-fixed bg-cover min-h-screen m-0 p-0 "}>
        <div className={"flex flex-row justify-center"}>
          <div className={"grow flex flex-col max-w-screen-2xl"}>
            <div className={"flex flex-row"}>
              <div id={"left-column"} className={"w-64 py-16"}>
                {props.left}
              </div>
              {/*<main*/}
              {/*  id={"center-column"}*/}
              {/*  className={"flex flex-col basis-8/12 py-16"}*/}
              {/*>*/}
              <motion.main
                id={"center-column"}
                className={"flex flex-col basis-8/12 py-16 px-12"}
                key={window.location.pathname}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div
                  className={"fixed"}
                  style={{ width: postWidth, zIndex: 0 }}
                >
                  {props.header}
                </div>
                <div ref={postRef} style={{ zIndex: 1 }}>
                  {props.center}
                </div>
              </motion.main>
              {/*</main>*/}
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
