// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// normalize CSS across browsers
import "./src/css/normalize.css"

// custom CSS styles
// import "./src/css/style.css"

import "./src/css/ridd.css"

import React, { useEffect } from "react"
import { createTheme, ThemeProvider } from "@mui/material"
import { orange } from "@mui/material/colors"
import { Provider, useDispatch, useSelector } from "react-redux"
import store from "./src/components/rematch/store"
import { StyledEngineProvider } from "@mui/material/styles"
import { darkTheme, lightTheme } from "./src/css/theme"

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

  useEffect(() => {
    dispatch({ type: "useDarkMode/syncDarkMode" })
  })

  return (
    <ThemeProvider theme={useDarkMode ? darkTheme : lightTheme}>
      <div className={"my-bg"}>{props.children}</div>
    </ThemeProvider>
  )
}
