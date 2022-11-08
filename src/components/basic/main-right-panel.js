import React from "react"
import { TextField } from "@mui/material"
import DarkModeToggle from "./dark-mode-toggle"
import CategoryDisplay from "./category-display"
import TagDisplay from "./tag-display"

const MainRightPanel = props => {
  return (
    <div
      className={"flex flex-col space-y-4 m-0 p-0 max-h-screen text-secondary"}
    >
      <DarkModeToggle></DarkModeToggle>
      <div id={"search-bar"}>
        <TextField label="搜索..." />
      </div>
      <div className={"flex flex-col"}>
        <span>归档Archives</span>
        <span>一个归档列表</span>
      </div>
      <div className={"flex flex-col"}>
        <CategoryDisplay></CategoryDisplay>
      </div>
      <div className={"flex flex-col"}>
        <TagDisplay></TagDisplay>
      </div>
    </div>
  )
}

export default MainRightPanel
