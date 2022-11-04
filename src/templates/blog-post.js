import React from "react"
import _ from "lodash"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import ThreeColumn from "../components/layout/three-column"
import MainLeftPanel from "../components/basic/main-left-panel"
import MainRightPanel from "../components/basic/main-right-panel"
import BlogPostBody from "../components/post/blog-post-body"
import ThreeColumnPost from "../components/layout/three-column-post"
import BlogPostHeader from "../components/post/blog-post-header"

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
  // console.log(post)
  const featuredImage = {
    data: _.get(
      post,
      "featuredImage.node.localFile.childImageSharp.gatsbyImageData",
      null
    ),
    alt: _.get(post, "featuredImage.node.alt", ""),
  }

  return (
    <ThreeColumnPost
      left={<MainLeftPanel />}
      header={<BlogPostHeader post={post} featuredImage={featuredImage} />}
      center={
        <BlogPostBody
          previous={previous}
          next={next}
          post={post}
          featuredImage={featuredImage}
        />
      }
      right={<MainRightPanel />}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                placeholder: BLURRED
                layout: FULL_WIDTH
                formats: AUTO
              )
            }
          }
        }
      }
    }
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`
