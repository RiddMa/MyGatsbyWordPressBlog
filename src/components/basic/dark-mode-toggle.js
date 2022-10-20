import React from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import Button from "@mui/material/Button"

const DarkModeToggle = props => {
  const useDarkMode = useSelector(state => state.useDarkMode)
  const dispatch = useDispatch()

  return (
    <Button
      className={"href-text"}
      variant={"contained"}
      onClick={() =>
        dispatch({ type: "useDarkMode/setDarkMode", payload: !useDarkMode })
      }
    >
      {useDarkMode ? "切换浅色模式" : "切换深色模式"}
    </Button>
  )
}

// const mapState = state => ({
//   useDarkMode: state.useDarkMode,
// })
//
// const mapDispatch = ({ useDarkMode: { toggle } }) => ({
//   toggle: () => toggle(),
// })

// export default connect(mapState, mapDispatch)(DarkModeToggle)
export default DarkModeToggle
