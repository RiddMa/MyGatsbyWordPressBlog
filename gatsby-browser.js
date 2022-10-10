// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// normalize CSS across browsers
// import "./src/css/normalize.css"

// custom CSS styles
// import "./src/css/style.css"

import "./src/css/ridd.css"

import React from "react"
import { createTheme, ThemeProvider } from "@mui/material"
import { orange } from "@mui/material/colors"
import { connect, Provider, useSelector } from "react-redux"
import store from "./src/components/rematch/store"
import { StyledEngineProvider } from "@mui/material/styles"

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

  const myTheme = createTheme({
    status: {
      danger: orange[500],
    },
    palette: {
      mode: useDarkMode ? "dark" : "light",
    },
  })
  return <ThemeProvider theme={myTheme}>{props.children}</ThemeProvider>
}

// export default connect(mapState)(wrapRootElement)
// export default wrapRootElement
