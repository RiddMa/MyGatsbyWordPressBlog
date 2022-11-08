import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Link, Typography } from "@mui/material"
import _ from "lodash"
import { Scrollbars } from "react-custom-scrollbars-2"
import { Icon } from '@iconify/react';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


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

  // let categoryArray = _.get(data, "allWpCategory.nodes").sort((a, b) => {
  //   return nullLastCompare(a["count"], b["count"], false)
  // })
  let categoryArray = _.get(data, "allWpCategory.nodes", [])
  categoryArray.forEach((el, index) => {
    if (el.count === null) {
      categoryArray[index].count = 0
    }
  })
  categoryArray.sort((a, b) => {
    return b.count - a.count
  })

  return (
    <div className={"grid grid-flow-row"}>
      <Link href={'/blog/category'} className={"group my-0 ml-0 mr-auto p-0 no-underline"}>
        <div className={"flex flex-row items-center m-0 p-0 text-secondary-hover-href"}>
          <Icon icon="bx:category" width="24" height="24" rotate={3} />
          <Typography className={"text-secondary-hover-href"}>分类</Typography>
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
