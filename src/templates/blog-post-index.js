import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

import Bio from "../components/bio"
import Seo from "../components/seo"
import ThreeColumn from "../components/layout/three-column"
import MainLeftPanel from "../components/main-left-panel"
import BlogPostIndexEntry from "../components/basic/blog-post-index-entry"
import MainRightPanel from "../components/main-right-panel";

const BlogPostIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data["allWpPost"]["nodes"]

  // return (
  //   <Layout isHomePage>
  //     <Seo title="All posts" />
  //
  //     <Bio />
  //
  //     <ol style={{ listStyle: `none` }}>
  //       {posts.map(post => {
  //         const title = post.title
  //
  //         return (
  //           <li key={post.uri}>
  //             <article
  //               className="post-list-item"
  //               itemScope
  //               itemType="http://schema.org/Article"
  //             >
  //               <header>
  //                 <h2>
  //                   <Link to={post.uri} itemProp="url">
  //                     <span itemProp="headline">{parse(title)}</span>
  //                   </Link>
  //                 </h2>
  //                 <small>{post.date}</small>
  //               </header>
  //               <section itemProp="description">{parse(post.excerpt)}</section>
  //             </article>
  //           </li>
  //         )
  //       })}
  //     </ol>
  //
  //     {previousPagePath && (
  //       <>
  //         <Link to={previousPagePath}>Previous page</Link>
  //         <br />
  //       </>
  //     )}
  //     {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
  //   </Layout>
  // )
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
    <div className={"flex flex-col gap-y-4"}>
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
            link
            title
            uri
          }
        }
      }
    }
  }
`
