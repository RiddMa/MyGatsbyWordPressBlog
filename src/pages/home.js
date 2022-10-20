import React from "react"
import ThreeColumn from "../components/layout/three-column"
import MainLeftPanel from "../components/main-left-panel"
import MainRightPanel from "../components/main-right-panel";

export default function Home(props) {
  return <ThreeColumn left={<MainLeftPanel></MainLeftPanel>} />
}
