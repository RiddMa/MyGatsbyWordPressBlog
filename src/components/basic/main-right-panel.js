import React from "react"
import { TextField } from "@mui/material"

const MainRightPanel = props => {
  return (
    <div
      className={"flex flex-col space-y-4 m-0 p-0 max-h-screen text-secondary"}
    >
      <span>this is a simple right panel.</span>
      <div id={"search-bar"}>
        <TextField label="搜索..." />
      </div>
      <div className={"flex flex-col"}>
        <span>归档Archives</span>
        <span>一个归档列表</span>
      </div>
      <div className={"flex flex-col"}>
        <span>分类Categories</span>
        <span>一个分类列表</span>
      </div>
      <div className={"flex flex-col"}>
        <span>标签Tags</span>
        <span>一个标签列表</span>
      </div>
    </div>
  )
}

export default MainRightPanel
