import React from "react"
import Footer from "../basic/footer"
import { Scrollbars } from "react-custom-scrollbars-2"

import { motion, AnimatePresence } from "framer-motion"

const duration = 0.5
const variants = {
  initial: {
    opacity: 0,
    // x: -500,
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
    // x: -500,
    transition: { duration: duration },
  },
}

// const ThreeColumn = props => {
//   return (
//     <Scrollbars
//       id={"global-scroller"}
//       autoHeight
//       autoHeightMin={"100vh"}
//       autoHide
//       autoHideTimeout={1000}
//       autoHideDuration={200}
//       className={"global-scroller"}
//     >
//       <div
//         className={"container-box bg-fixed bg-cover min-h-screen m-0 p-0 "}
//         // style={{
//         //   backgroundImage:
//         //     "url(https://jp2.riddma.com/wp-content/uploads/2022/09/STScI-1Small.png)",
//         // }}
//       >
//         <div className={"flex flex-row justify-center"}>
//           <div className={"grow flex flex-col"}>
//             <div className={"flex flex-row max-w-screen-2xl"}>
//               <div id={"left-column"} className={"w-64 py-16"}>
//                 {props.left}
//               </div>
//               {/*<main id={"center-column"} className={"basis-8/12 py-16"}>*/}
//               {/*<div className={"px-12"}>{props.center}</div>*/}
//
//               <motion.main
//                 id={"center-column"}
//                 className={"basis-8/12 py-16 px-12"}
//                 key={window.location.pathname}
//                 variants={variants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 {props.center}
//               </motion.main>
//               {/*</main>*/}
//               <div id={"right-column"} className={"w-64 py-16"}>
//                 {props.right}
//               </div>
//             </div>
//             <Footer />
//           </div>
//         </div>
//       </div>
//     </Scrollbars>
//   )
// }

// const ThreeColumn = props => {
//   return (
//     <div className={"h-screen w-screen"}>
//       <div
//         className={"grid grid-rows-1 grid-cols-3 sm:grid-cols-[240px_auto_240px] xl:grid-cols-[288px_auto_288px] max-w-screen-2xl mx-auto"}
//       >
//         <div
//           id={"left-column"}
//           className={"box-border sticky top-0 max-h-screen py-16 ml-8 sm:mr-0 2xl:mr-8"}
//         >
//           {props.left}
//         </div>
//         <div className={"flex flex-col"}>
//           <motion.main
//             id={"center-column"}
//             className={"py-16 px-8"}
//             key={window.location.pathname}
//             variants={variants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//           >
//             {props.center}
//           </motion.main>
//           <Footer />
//         </div>
//         <div
//           id={"right-column"}
//           className={"box-border sticky top-0 max-h-screen py-16 mr-8 sm:ml-0 2xl:ml-8"}
//           // className={"min-w-0 sm:w-48 lg:w-56 2xl:w-64 py-16 sm:px-2 xl:px-4"}
//         >
//           {props.right}
//         </div>
//       </div>
//     </div>
//   )
// }
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
        className={
          "grid grid-rows-1 grid-cols-3 sm:grid-cols-[240px_auto_240px] xl:grid-cols-[256px_auto_256px] 2xl:grid-cols-[288px_auto_288px] max-w-screen-2xl mx-auto"
        }
      >
        <div
          id={"left-column"}
          className={
            "box-border sticky top-0 max-h-screen py-16 sm:ml-4 xl:ml-8 mr-0"
          }
        >
          {props.left}
        </div>
        <div className={"flex flex-col"}>
          <motion.main
            id={"center-column"}
            className={"py-16 sm:px-4 xl:px-8 2xl:px-12"}
            key={window.location.pathname}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {props.center}
          </motion.main>
          <Footer />
        </div>
        <div
          id={"right-column"}
          className={
            "box-border sticky top-0 max-h-screen py-16 sm:mr-4 xl:mr-8 ml-0"
          }
          // className={"min-w-0 sm:w-48 lg:w-56 2xl:w-64 py-16 sm:px-2 xl:px-4"}
        >
          {props.right}
        </div>
      </div>
    </Scrollbars>
  )
}

export default ThreeColumn
