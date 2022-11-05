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

  // return (
  //   <Scrollbars
  //     ref={scrollRef}
  //     onScrollFrame={onScrollFrame}
  //     autoHeight
  //     autoHeightMin={"100vh"}
  //     autoHide
  //     autoHideTimeout={1000}
  //     autoHideDuration={200}
  //     id={"global-scroller"}
  //     className={"global-scroller"}
  //   >
  //     <div className={"container-box bg-fixed bg-cover min-h-screen m-0 p-0 "}>
  //       <div className={"flex flex-row justify-center"}>
  //         <div className={"grow flex flex-col max-w-screen-2xl"}>
  //           <div className={"flex flex-row"}>
  //             <div id={"left-column"} className={"w-64 py-16"}>
  //               {props.left}
  //             </div>
  //             {/*<main*/}
  //             {/*  id={"center-column"}*/}
  //             {/*  className={"flex flex-col basis-8/12 py-16"}*/}
  //             {/*>*/}
  //             <motion.main
  //               id={"center-column"}
  //               className={"flex flex-col basis-8/12 py-16 px-12"}
  //               key={window.location.pathname}
  //               variants={variants}
  //               initial="initial"
  //               animate="animate"
  //               exit="exit"
  //             >
  //               <div
  //                 className={"fixed"}
  //                 style={{ width: postWidth, zIndex: 0 }}
  //               >
  //                 {props.header}
  //               </div>
  //               <div ref={postRef} style={{ zIndex: 1 }}>
  //                 {props.center}
  //               </div>
  //             </motion.main>
  //             {/*</main>*/}
  //             <div id={"right-column"} className={"w-64 py-16"}>
  //               {props.right}
  //             </div>
  //           </div>
  //           <Footer />
  //         </div>
  //       </div>
  //     </div>
  //   </Scrollbars>
  // )

  return (
    <Scrollbars
      ref={scrollRef}
      onScrollFrame={onScrollFrame}
      autoHeight
      autoHeightMin={"100vh"}
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      className={"global-scroller"}
    >
      <div
        className={
          "grid grid-rows-1 grid-cols-3 sm:grid-cols-[240px_auto_240px] xl:grid-cols-[256px_auto_256px] 2xl:grid-cols-[288px_auto_288px] max-w-screen-2xl mx-auto"
        }
      >
        <div
          id={"left-column"}
          className={
            "box-border sticky top-0 max-h-screen sm:py-4 xl:py-16 sm:ml-4 xl:ml-8 mr-0"
          }
        >
          {props.left}
        </div>
        <div className={"grid grid-flow-row"}>
          <motion.main
            className={"sm:py-4 xl:py-16 sm:px-4 xl:px-8 2xl:px-12"}
            key={window.location.pathname}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className={"fixed"} style={{ width: postWidth, zIndex: 0 }}>
              {props.header}
            </div>
            <div ref={postRef} style={{ zIndex: 1 }}>
              {props.center}
            </div>
          </motion.main>
          <Footer />
        </div>
        <div
          className={
            "box-border sticky top-0 max-h-screen sm:py-4 xl:py-16 sm:mr-4 xl:mr-8 ml-0"
          }
        >
          {props.right}
        </div>
      </div>
    </Scrollbars>
  )
}

export default ThreeColumn
