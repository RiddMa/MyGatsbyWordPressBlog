import React from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "@mui/material/Button"
import { Icon } from "@iconify/react"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

const DarkModeToggle = props => {
  const useDarkMode = useSelector(state => state.useDarkMode)
  if (useDarkMode) {
    return (
      <SwitchButton>
        <Icon icon="ic:twotone-dark-mode" className={"w-6 h-full"} />
        <div>
          <ChevronRightIcon className={"w-6 h-full"}></ChevronRightIcon>
          <Icon icon="ic:twotone-light-mode" className={"w-6 h-full"} />
        </div>
      </SwitchButton>
    )
  } else {
    return (
      <SwitchButton>
        <Icon icon="ic:twotone-light-mode" className={"w-6 h-full"} />
        <div>
          <ChevronRightIcon className={"w-6 h-full"}></ChevronRightIcon>
          <Icon icon="ic:twotone-dark-mode" className={"w-6 h-full"} />
        </div>
      </SwitchButton>
    )
  }
}

const SwitchButton = props => {
  const useDarkMode = useSelector(state => state.useDarkMode)
  const dispatch = useDispatch()
  return (
    <div className={"h-9 m-0 p-0 w-full flex flex-row justify-center"}>
      <Button
        className={
          "m-1 p-0 w-full group transition-all ease-out rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 hover:m-0 hover:p-1 href-text"
        }
        onClick={() =>
          dispatch({ type: "useDarkMode/setDarkMode", payload: !useDarkMode })
        }
      >
        <div className={"m-0 p-0 rounded-lg website-bg w-full h-full"}>
          <div
            className={
              "text-secondary-hover-href mx-auto w-fit grid grid-flow-col place-items-center"
            }
          >
            <div
              className={
                "mt-0.5 pt-0 transition-all ease-out translate-x-6 group-hover:translate-x-0"
              }
            >
              {props.children[0]}
            </div>
            <div
              className={
                "mt-0.5 pt-0 transition-all ease-out scale-0 group-hover:scale-100 -translate-x-2 group-hover:translate-x-0"
              }
            >
              {props.children[1]}
            </div>
          </div>
        </div>
      </Button>
    </div>
  )
}

export default DarkModeToggle
