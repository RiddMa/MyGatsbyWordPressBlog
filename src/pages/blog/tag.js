import React, { useState } from "react"
import MainLeftPanel from "../../components/basic/main-left-panel"
import MainRightPanel from "../../components/basic/main-right-panel"
import ThreeColumn from "../../components/layout/three-column"
import { graphql, useStaticQuery } from "gatsby"

const Tag = props => {
  return (
    <>
      <ThreeColumn
        left={<MainLeftPanel />}
        center={<TagList />}
        right={<MainRightPanel />}
      />
    </>
  )
}

const TagList = props => {
  const data = useStaticQuery(graphql`
    query {
      allWpCategory {
        nodes {
          description
          title: name
          uri
          slug
          id
          count
        }
      }
      allWpMediaItem(filter: { title: { regex: "/splash_tag_.*/" } }) {
        totalCount
        nodes {
          title
          caption
          altText
        }
      }
    }
  `)
  return (
    <>
      <div></div>
    </>
  )
}

export default Tag
