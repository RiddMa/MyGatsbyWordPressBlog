import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

import Bio from "../components/bio"
import Seo from "../components/seo"
import ThreeColumn from "../components/layout/three-column"
import MainLeftPanel from "../components/main-left-panel"
import BlogPostIndexEntry from "../components/basic/blog-post-index-entry"
import MainRightPanel from "../components/main-right-panel"

const BlogPostIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data["allWpPost"]["nodes"]

  return (
    <ThreeColumn
      left={<MainLeftPanel />}
      center={
        <BlogPostList
          posts={posts}
          pageContext={{ nextPagePath, previousPagePath }}
        />
      }
      right={<MainRightPanel />}
    />
  )
}

const BlogPostList = ({
  posts,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  console.log(posts, nextPagePath, previousPagePath)
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
    <div className={"flex flex-col gap-y-8"}>
      {posts.map(item => {
        return (
          <BlogPostIndexEntry
            key={item["uri"]}
            data={item}
            className={"mb-4"}
          ></BlogPostIndexEntry>
        )
      })}
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

// export const pageQuery = graphql`
//   query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
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
//                 fluid(
//                   cropFocus: ATTENTION
//                   maxHeight: 300
//                   maxWidth: 300
//                   quality: 30
//                   toFormat: AUTO
//                 ) {
//                   base64
//                   tracedSVG
//                   srcWebp
//                   srcSetWebp
//                   originalImg
//                   originalName
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
