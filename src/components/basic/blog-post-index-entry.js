import React from "react"
import { Link } from "@mui/material"
import Typography from "@mui/material/Typography"
import parse from "html-react-parser"
import { GatsbyImage } from "gatsby-plugin-image"
import _ from "lodash"

const BlogPostIndexEntry = props => {
  const post = props.data
  // console.log(post)

  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }
  const hasImage =
    post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData

  const customExcerpt = String(_.get(post, "excerpt")).replace(
    /\[&hellip;]<\/p>/,
    "&hellip;</p>"
  )

  return (
    <div
      className={
        "card flex flex-row flex-auto sm:p-6 2xl:p-8 transition-all border-none rounded-3xl drop-shadow-xl hover:drop-shadow-2xl content-bg space-x-4"
      }
    >
      {hasImage && (
        <div className="card-header">
          <Link className={"no-underline w-fit h-fit"} href={post["uri"]}>
            <GatsbyImage
              image={featuredImage.data}
              alt={featuredImage.alt}
              className={"rounded-2xl w-fit h-fit"}
            />
          </Link>
        </div>
      )}
      {/*Note the w-full is important to keep card content full width of card*/}
      <div className={(hasImage ? "" : "") + " card-body flex flex-col w-full"}>
        <Link className={"flex flex-col no-underline"} href={post["uri"]}>
          <Typography
            variant="h5"
            component={"span"}
            className={"text-primary-hover-href"}
          >
            {post["title"]}
          </Typography>
          <Typography
            variant="body1"
            component={"span"}
            className={"text-secondary line-clamp-3"}
          >
            {parse(customExcerpt)}
          </Typography>
        </Link>
        <div className={"grow"}></div>
        <div className={"flex flex-row"}>
          <Typography
            variant="body1"
            component={"span"}
            className={"text-hint"}
          >
            <div className={"min-w-0 max-w-[700px] line-clamp-1"}>
              分类：
              {post.categories?.nodes?.map(item => {
                return (
                  <span key={item.uri}>
                    <Link className={"text-hint mr-2"} href={item.uri}>
                      {item.name}
                    </Link>{" "}
                  </span>
                )
              })}
            </div>
          </Typography>
          <div className={"grow"}></div>
          <Typography
            variant="body1"
            component={"span"}
            className={"text-hint whitespace-nowrap justify-self-end"}
          >
            {post["dateGmt"]}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default BlogPostIndexEntry
