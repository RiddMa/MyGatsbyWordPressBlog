import React from "react"
import { Link, graphql } from "gatsby"
import _ from "lodash"

import Bio from "../components/bio"
import Seo from "../components/seo"
import ThreeColumn from "../components/layout/three-column"
import MainLeftPanel from "../components/basic/main-left-panel"
import BlogPostIndexEntry from "../components/basic/blog-post-index-entry"
import MainRightPanel from "../components/basic/main-right-panel"
import BlogPostPagination from "../components/basic/blog-post-pagination"

const BlogPostIndex = props => {
  console.log(props)
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
}) => {
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
    <div className={"flex flex-col gap-y-8 items-stretch"}>
      <div className={"flex flex-row justify-center"}>
        <BlogPostPagination
          currentPage={currentPage}
          totalPages={totalPages}
        ></BlogPostPagination>
      </div>
      {posts.map(item => {
        return (
          <BlogPostIndexEntry
            key={item["uri"]}
            data={item}
            className={"mb-4"}
          ></BlogPostIndexEntry>
        )
      })}
      <div className={"flex flex-row justify-center"}>
        <BlogPostPagination
          currentPage={currentPage}
          totalPages={totalPages}
        ></BlogPostPagination>
      </div>
    </div>
  )
}

export default BlogPostIndex

export const pageQuery = graphql`
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
                  layout: FIXED
                  formats: AUTO
                  transformOptions: { cropFocus: ATTENTION, fit: COVER }
                  height: 200
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
