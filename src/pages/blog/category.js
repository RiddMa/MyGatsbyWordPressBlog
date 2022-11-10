import React, { useState } from "react"
import MainLeftPanel from "../../components/basic/main-left-panel"
import MainRightPanel from "../../components/basic/main-right-panel"
import ThreeColumn from "../../components/layout/three-column"
import { graphql, useStaticQuery } from "gatsby"

const Category = props => {
  return (
    <>
      <ThreeColumn
        left={<MainLeftPanel />}
        center={<CategoryList />}
        right={<MainRightPanel />}
      />
    </>
  )
}

const CategoryList = props => {
  const data = useStaticQuery(graphql`
    query {
      allWpMediaItem(filter: { title: { regex: "/splash_category_.*/" } }) {
        totalCount
        nodes {
          title
          caption
          altText
        }
      }
    }
  `)
  console.log(data)
  return (
    <>
      <div></div>
    </>
  )
}

export default Category
