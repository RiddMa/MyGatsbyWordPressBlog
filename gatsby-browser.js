// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// normalize CSS across browsers
import "./src/css/normalize.css"

// custom CSS styles
// import "./src/css/style.css"

import "./src/css/ridd.css"

import React, { useEffect, useLayoutEffect } from "react"
import { ThemeProvider } from "@mui/material"
import { Provider, useDispatch, useSelector } from "react-redux"
import store from "./src/components/rematch/store"
import { StyledEngineProvider } from "@mui/material/styles"
import { darkTheme, lightTheme } from "./src/css/theme"

import { AnimatePresence } from "framer-motion"
import { useEventListener, useWindowSize } from "usehooks-ts"

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <MyThemeProvider>{element}</MyThemeProvider>
      </StyledEngineProvider>
    </Provider>
  )
}

const MyThemeProvider = props => {
  const useDarkMode = useSelector(state => state.useDarkMode)
  const dispatch = useDispatch()

  const { width, height } = useWindowSize()
  const resizeHandler = () => {
    dispatch({ type: "isDesktop/setIsDesktop", payload: width })
  }
  useEventListener("resize", resizeHandler)

  useEffect(() => {
    dispatch({ type: "useDarkMode/syncDarkMode" })
  }, [])

  useLayoutEffect(() => {
    dispatch({ type: "isDesktop/setIsDesktop", payload: document.body.getBoundingClientRect().width })
  }, [])

  return (
    <ThemeProvider theme={useDarkMode ? darkTheme : lightTheme}>
      <div className={"website-bg"}>{props.children}</div>
    </ThemeProvider>
  )
}

export const wrapPageElement = ({ element, props }) => {
  return <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
}
