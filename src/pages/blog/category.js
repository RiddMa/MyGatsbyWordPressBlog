import React, { useState } from "react"
import MainLeftPanel from "../../components/basic/main-left-panel"
import MainRightPanel from "../../components/basic/main-right-panel"
import ThreeColumn from "../../components/layout/three-column"
import { graphql, useStaticQuery } from "gatsby"
import EntryCard from "../../components/basic/entry-card"
import _ from "lodash"
import { categoryLayoutOrder } from "../../../blog-config"

const Category = props => {
  const path = props.path
  return (
    <>
      <ThreeColumn
        left={<MainLeftPanel />}
        center={<CategoryList path={path} />}
        right={<MainRightPanel />}
      />
    </>
  )
}

const CategoryList = props => {
  const path = props.path
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
      allWpMediaItem(filter: { title: { regex: "/splash_category_.*/" } }) {
        nodes {
          title
          caption
          altText
          localFile {
            childImageSharp {
              desktop: gatsbyImageData(
                placeholder: BLURRED
                quality: 30
                layout: CONSTRAINED
                formats: WEBP
                transformOptions: { cropFocus: ATTENTION, fit: COVER }
                height: 300
                aspectRatio: 1.5
              )
              mobile: gatsbyImageData(
                placeholder: BLURRED
                quality: 30
                layout: CONSTRAINED
                formats: WEBP
                transformOptions: { cropFocus: ATTENTION, fit: COVER }
                height: 600
                aspectRatio: 1.5
              )
            }
          }
        }
      }
    }
  `)

  const splashMap = _.get(data, "allWpMediaItem.nodes", []).reduce(
    (acc, cur) => ({
      ...acc,
      [cur.title.split("_")[2]]: {
        caption: cur["caption"],
        alt: cur["altText"],
        childImageSharp: _.get(cur, "localFile.childImageSharp", {
          desktop: null,
          mobile: null,
        }),
      },
    }),
    {}
  )

  const categoryArray = _.get(data, "allWpCategory.nodes", [])
    .map(el => ({
      ...el,
      featuredImage: _.get(splashMap, el["slug"], null),
    }))
    .sort((a, b) => {
      return (
        categoryLayoutOrder.indexOf(a["slug"]) -
        categoryLayoutOrder.indexOf(b["slug"])
      )
    })
  console.log(categoryArray)

  // Structure =
  // [{description,
  //   title,
  //   uri,
  //   slug,
  //   id,
  //   count,
  //   featuredImage: {caption,
  //                   alt,
  //                   childImageSharp:{desktop(alias for gatsbyImageData),
  //                                    mobile(alias for gatsbyImageData)}}
  // }]

  return (
    <>
      <div
        className={
          "grid grid-flow-row sm:gap-y-6 2xl:gap-y-8 break-words min-w-0"
        }
        key={`category-index-${path}`}
      >
        {categoryArray.map(el => {
          return (
            <EntryCard
              key={el["id"]}
              data={el}
              showPostCount={true}
              className={"flex-auto"}
            ></EntryCard>
          )
        })}
      </div>
    </>
  )
}

export default Category
