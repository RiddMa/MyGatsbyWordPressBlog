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

const BlogPostIndex = props => {
  // console.log(props)
  const posts = _.get(props, "data.allWpPost.nodes")
  const {
    nextPagePath,
    previousPagePath,
    postsPerPage,
    currentPage,
    totalPages,
  } = _.get(props, "pageContext")

  return (
    <ThreeColumn
      left={<MainLeftPanel />}
      center={
        <BlogPostList
          posts={posts}
          pageContext={{
            currentPage,
            totalPages,
          }}
        />
      }
      right={<MainRightPanel />}
    />
  )
}

const BlogPostList = ({
  posts,
  pageContext: { currentPage, totalPages },
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

  if (!posts.length) {
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
        "grid grid-flow-row sm:gap-y-4 2xl:gap-y-8 break-words min-w-0"
      }
    >
      <div className={"grid grid-flow-col justify-center"}>
        <BlogPostPagination
          currentPage={currentPage}
          totalPages={totalPages}
        ></BlogPostPagination>
      </div>
      <motion.div
        className={
          "grid grid-flow-row sm:gap-y-4 2xl:gap-y-8 break-words min-w-0"
        }
        key={`post-index-page-${path}`}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {posts.map(item => {
          return (
            <BlogPostIndexEntry
              key={item["uri"]}
              data={item}
              className={"mb-4 flex-auto"}
            ></BlogPostIndexEntry>
          )
        })}
      </motion.div>
      <div className={"grid grid-flow-col justify-center"}>
        <BlogPostPagination
          currentPage={currentPage}
          totalPages={totalPages}
        ></BlogPostPagination>
      </div>
    </div>
  )
}

export default BlogPostIndex

const getPageQuery = () => {
  console.log(store.getState().isDesktop)
  if (store.getState().isDesktop) {
    return graphql`
      query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
        allWpPost(
          sort: { fields: [date], order: DESC }
          limit: $postsPerPage
          skip: $offset
        ) {
          nodes {
            uri
            date(formatString: "YYYY-MM-DD")
            dateGmt(formatString: "YYYY-MM-DD")
            title
            excerpt
            categories {
              nodes {
                id
                name
                slug
                uri
              }
            }
            featuredImage {
              node {
                caption
                altText
                description
                title
                localFile {
                  childImageSharp {
                    gatsbyImageData(
                      placeholder: BLURRED
                      quality: 30
                      layout: CONSTRAINED
                      formats: WEBP
                      transformOptions: { cropFocus: ATTENTION, fit: COVER }
                      height: 300
                      aspectRatio: 1
                    )
                  }
                }
              }
            }
          }
        }
      }
    `
  } else {
    return graphql`
      query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
        allWpPost(
          sort: { fields: [date], order: DESC }
          limit: $postsPerPage
          skip: $offset
        ) {
          nodes {
            uri
            date(formatString: "YYYY-MM-DD")
            dateGmt(formatString: "YYYY-MM-DD")
            title
            excerpt
            categories {
              nodes {
                id
                name
                slug
                uri
              }
            }
            featuredImage {
              node {
                caption
                altText
                description
                title
                localFile {
                  childImageSharp {
                    gatsbyImageData(
                      placeholder: BLURRED
                      quality: 30
                      layout: CONSTRAINED
                      formats: WEBP
                      transformOptions: { cropFocus: ATTENTION, fit: COVER }
                      aspectRatio: 1.33
                    )
                  }
                }
              }
            }
          }
        }
      }
    `
  }
}

export const pageQuery = getPageQuery()
