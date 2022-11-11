import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Link, Typography } from "@mui/material"
import _ from "lodash"
import { Scrollbars } from "react-custom-scrollbars-2"
import { nullLastCompare } from "../../util"
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Icon } from "@iconify/react";

const CategoryDisplay = props => {
  const data = useStaticQuery(graphql`
    query {
      allWpTag {
        totalCount
        nodes {
          id
          name
          uri
          description
          count
        }
      }
    }
  `)

  // let tagArray = _.get(data, "allWpTag.nodes").sort((a, b) => {
  //   return nullLastCompare(a["count"], b["count"], false)
  // })
  let tagArray = _.get(data, "allWpTag.nodes", [])
  tagArray.forEach((el, index) => {
    if (el.count === null) {
      tagArray[index].count = 0
    }
  })
  tagArray.sort((a, b) => {
    return b.count - a.count
  })

  return (
    <div className={"grid grid-flow-row m-0 p-0 gap-y-2"}>
      <Link href={'/blog/tag'} className={"group my-0 ml-0 mr-auto p-0 no-underline"}>
        <div className={"flex flex-row items-center m-0 p-0 text-secondary-hover-href"}>
          <Icon icon="system-uicons:tags" rotate={3} className={"w-6 h-6"}/>
          <Typography className={"w-auto"}>标签</Typography>
          <ChevronRightIcon
            className={
              "m-0 p-0 transition-all ease-out scale-0 group-hover:scale-100 -translate-x-5 group-hover:translate-x-1"
            }
          ></ChevronRightIcon>
        </div>
      </Link>

      <Scrollbars
        autoHeight
        autoHeightMin={0}
        autoHeightMax={200}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
      >
        <div className={"flex flex-row flex-wrap -ml-1"}>
          {tagArray.map(item => {
            return <CategoryChip key={item["uri"]} item={item}></CategoryChip>
          })}
        </div>
      </Scrollbars>
    </div>
  )
}

const CategoryChip = ({ item }) => {
  return (
    <Link
      href={item["uri"]}
      className={"group content-bg m-1 p-1 rounded-lg no-underline"}
    >
      <div className={"grid grid-flow-col place-items-baseline gap-x-2"}>
        <Typography
          variant={"body2"}
          className={"transition-all text-hint-hover-href"}
        >
          {item["name"]}
        </Typography>
        <Typography variant={"caption"} className={"transition-all text-hint"}>
          {item["count"]}
        </Typography>
      </div>
    </Link>
  )
}

export default CategoryDisplay
