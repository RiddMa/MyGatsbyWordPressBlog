import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import Seo from "../seo"
import Bio from "../bio"
import Typography from "@mui/material/Typography"
import { useElementSize } from "usehooks-ts"
import _ from "lodash"
// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../../css/@wordpress/block-library/build-style/style.css"
import "../../css/@wordpress/block-library/build-style/theme.css"

const BlogPostBody = ({ previous, next, post, featuredImage }) => {
  // 计算正确的封面图高度
  const [postBodyRef, { width: postBodyWidth, height: postBodyHeight }] =
    useElementSize()
  const imgWidth = _.get(featuredImage, "data.width", 0)
  const imgHeight = _.get(featuredImage, "data.height", 0)
  let paddingTop = imgWidth
    ? `${postBodyWidth * (imgHeight / imgWidth) + 24}px`
    : "0"

  return (
    <div
      ref={postBodyRef}
      className={"flex flex-col m-0 px-0 "}
      style={{ paddingTop: 0 }}
    >
      <div
        className={"z-10"}
        style={{ width: "100%", height: paddingTop }}
      ></div>
      <div
        className={
          "card flex flex-col m-0 p-8 border-none rounded-3xl drop-shadow-lg content-bg"
        }
      >
        {/*<Seo title={post.title} description={post.excerpt} />*/}
        <article
          className="blog-post text-primary"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <Typography
              variant={"h3"}
              component={"h1"}
              itemProp="headline"
              className={"text-primary"}
            >
              {parse(post.title)}
            </Typography>

            <Typography
              variant="body2"
              component={"p"}
              className={"text-secondary"}
            >
              {post.date}
            </Typography>
          </header>

          {!!post.content && (
            <section itemProp="articleBody" className={"prose"}>
              {parse(post.content)}
            </section>
          )}
        </article>

        <nav className="blog-post-nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.uri} rel="prev">
                  ← {parse(previous.title)}
                </Link>
              )}
            </li>

            <li>
              {next && (
                <Link to={next.uri} rel="next">
                  {parse(next.title)} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default BlogPostBody
