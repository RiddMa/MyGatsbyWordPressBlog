import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import Seo from "../components/seo"
import Bio from "../components/bio"
// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"
import Typography from "@mui/material/Typography"

const BlogPostBody = ({ previous, next, post }) => {
  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }
  console.log(post)
  // return <div dangerouslySetInnerHTML={{ __html: props["post"]["content"] }} />
  return (
    <div className={"flex flex-col"}>
      {/* if we have a featured image for this post let's display it */}
      {featuredImage?.data && (
        <GatsbyImage
          image={featuredImage.data}
          alt={featuredImage.alt}
          className={
            "rounded-t-3xl rounded-b-none -mx-8 -mt-8 mb-12 sticky w-full self-start"
          }
        />
      )}
      <div
        className={
          "card flex flex-col p-8 border-none rounded-3xl drop-shadow-lg content-bg"
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
              variant="h3"
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
            <section itemProp="articleBody">{parse(post.content)}</section>
          )}

          <hr />

          <footer>
            <Bio />
          </footer>
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
