import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Link, Typography } from "@mui/material"
import _ from "lodash"
import { Scrollbars } from "react-custom-scrollbars-2"
import { nullLastCompare } from "../../util"

const CategoryDisplay = props => {
  const data = useStaticQuery(graphql`
    query CategoryQuery {
      allWpCategory {
        nodes {
          name
          uri
          slug
          description
          parentId
          id
          count
        }
      }
    }
  `)

  let categoryArray = _.get(data, "allWpCategory.nodes").sort((a, b) => {
    return nullLastCompare(a["count"], b["count"], false)
  })

  return (
    <div className={"grid grid-flow-row"}>
      <div className={"grid grid-flow-col"}>
        <Typography className={"text-secondary-hover-href"}>分类</Typography>
      </div>

      <Scrollbars
        autoHeight
        autoHeightMin={0}
        autoHeightMax={192}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
      >
        <div className={"flex flex-row flex-wrap -ml-1"}>
          {categoryArray.map(item => {
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
