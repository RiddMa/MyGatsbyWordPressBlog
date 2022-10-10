import React from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import Button from "@mui/material/Button"

const DarkModeToggle = props => {
  const useDarkMode = useSelector(state => state.useDarkMode)
  const dispatch = useDispatch()

  return (
    <div>
      <span>Dark mode: {useDarkMode.toString()}</span>
      <br />
      <Button onClick={() => dispatch({ type: "useDarkMode/toggle" })}>
        切换深色模式
      </Button>
    </div>
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
