import React, { useState } from "react"
import { graphql } from "gatsby"
import _ from "lodash"
import store from "../components/rematch/store"
import { AnimatePresence, motion } from "framer-motion"

import Bio from "../components/bio"
import Seo from "../components/seo"
import ThreeColumn from "../components/layout/three-column"
import MainLeftPanel from "../components/basic/main-left-panel"
import BlogPostIndexEntry from "../components/basic/blog-post-index-entry"
import MainRightPanel from "../components/basic/main-right-panel"
import BlogPostPagination from "../components/basic/blog-post-pagination"

const BlogPostArchiveV2 = props => {
  console.log(props)
  const posts = _.get(props, "data.allWpPost.nodes")
  const { currentPage, totalPages, pageUris, pageData } = _.get(
    props,
    "pageContext"
  )

  return (
    <ThreeColumn
      left={<MainLeftPanel />}
      center={
        <BlogPostList
          pageContext={{
            currentPage,
            totalPages,
            pageUris,
            pageData,
          }}
        />
      }
      right={<MainRightPanel />}
    />
  )
  // return (
  //   <ThreeColumn
  //     left={<MainLeftPanel />}
  //     center={
  //       <>
  //         <div>
  //           {currentPage}_{totalPages}_{pageUris}
  //         </div>
  //       </>
  //     }
  //     right={<MainRightPanel />}
  //   />
  // )
}

const BlogPostList = ({
  pageContext: { currentPage, totalPages, pageUris, pageData },
  path,
}) => {
  const duration = 0.25
  const variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: duration,
        delay: duration,
        when: "beforeChildren",
      },
    },
    exit: { opacity: 0, transition: { duration: duration } },
  }

  if (!pageData.length) {
    return (
      <div>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </div>
    )
  }
  return (
    <div
      className={
        "grid grid-flow-row transition-all sm:gap-y-4 2xl:gap-y-8 break-words min-w-0"
      }
    >
      <div className={"grid grid-flow-col justify-center"}>
        <BlogPostPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageUris={pageUris}
        ></BlogPostPagination>
      </div>
      <motion.div
        className={
          "grid grid-flow-row sm:gap-y-6 2xl:gap-y-8 my-4 break-words min-w-0"
        }
        key={`post-index-page-${path}`}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {pageData.map(item => {
          return (
            <BlogPostIndexEntry
              key={item["uri"]}
              data={item}
              className={"flex-auto"}
            ></BlogPostIndexEntry>
          )
        })}
      </motion.div>
      <div className={"grid grid-flow-col justify-center"}>
        <BlogPostPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageUris={pageUris}
        ></BlogPostPagination>
      </div>
    </div>
  )
}

export default BlogPostArchiveV2

// export const pageQuery = graphql`
//   query ($offset: Int!, $postsPerPage: Int!) {
//     allWpPost(
//       sort: { fields: [date], order: DESC }
//       limit: $postsPerPage
//       skip: $offset
//     ) {
//       nodes {
//         uri
//         date(formatString: "YYYY-MM-DD")
//         dateGmt(formatString: "YYYY-MM-DD")
//         title
//         excerpt
//         categories {
//           nodes {
//             id
//             name
//             slug
//             uri
//           }
//         }
//         featuredImage {
//           node {
//             caption
//             altText
//             description
//             title
//             localFile {
//               childImageSharp {
//                 desktop: gatsbyImageData(
//                   placeholder: BLURRED
//                   quality: 20
//                   layout: CONSTRAINED
//                   formats: WEBP
//                   transformOptions: { cropFocus: ATTENTION, fit: COVER }
//                   height: 300
//                   aspectRatio: 1.33
//                 )
//                 mobile: gatsbyImageData(
//                   placeholder: BLURRED
//                   quality: 30
//                   layout: CONSTRAINED
//                   formats: WEBP
//                   transformOptions: { cropFocus: ATTENTION, fit: COVER }
//                   height: 600
//                   aspectRatio: 1.5
//                 )
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
