import React from "react"
import { Link, useMediaQuery, useTheme } from "@mui/material"
import Typography from "@mui/material/Typography"
import parse from "html-react-parser"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import _ from "lodash"
import { useSelector } from "react-redux"

const BlogPostIndexEntry = props => {
  const post = props.data
  // console.log(post)

  // const customExcerpt = String(_.get(post, "excerpt")).replace(
  //   /\[&hellip;]<\/p>/,
  //   "&hellip;</p>"
  // )
  const customExcerpt = String(_.get(post, "excerpt")).replace(
    /\n<p class="read-more">.+<\/p>/,
    ""
  )

  console.log(customExcerpt)

  const isDesktop = useSelector(state => state.isDesktop)

  if (isDesktop) {
    return <DesktopEntryCard post={post} customExcerpt={customExcerpt} />
  } else {
    return <MobileEntryCard post={post} customExcerpt={customExcerpt} />
  }
}

const DesktopEntryCard = ({ post, customExcerpt }) => {
  const featuredImage = {
    data: getImage(
      post.featuredImage?.node?.localFile?.childImageSharp?.desktop
    ),
    alt: post.featuredImage?.node?.alt || ``,
  }
  const hasImage = !!post.featuredImage
  return (
    <div
      className={
        "card flex flex-row space-x-4 sm:p-6 2xl:p-8 transition-all border-none rounded-3xl drop-shadow-xl hover:drop-shadow-2xl content-bg "
      }
    >
      {hasImage && (
        <div className="card-header">
          <Link className={"no-underline"} href={post["uri"]}>
            <GatsbyImage
              image={featuredImage.data}
              alt={featuredImage.alt}
              className={"rounded-2xl min-h-full"}
            />
          </Link>
        </div>
      )}
      {/*Note the w-full is important to keep card content full width of card*/}
      <div className={"card-body flex flex-col w-full"}>
        <Link className={"flex flex-col no-underline"} href={post["uri"]}>
          <Typography
            variant="h5"
            component={"span"}
            className={"text-primary-hover-href"}
          >
            {parse(post["title"])}
          </Typography>
        </Link>
        <Typography
          variant="body1"
          component={"span"}
          className={"text-secondary line-clamp-3"}
        >
          {parse(customExcerpt)}
        </Typography>
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

const MobileEntryCard = ({ post, customExcerpt }) => {
  const featuredImage = {
    data: getImage(
      post.featuredImage?.node?.localFile?.childImageSharp?.mobile
    ),
    alt: post.featuredImage?.node?.alt || ``,
  }
  const hasImage = !!post.featuredImage
  return (
    <div
      className={
        "card flex flex-col p-6 space-y-4 transition-all border-none rounded-3xl drop-shadow-xl hover:drop-shadow-2xl content-bg"
      }
    >
      {hasImage && (
        <div className="card-header">
          <Link className={"no-underline w-full h-fit"} href={post["uri"]}>
            <GatsbyImage
              image={featuredImage.data}
              alt={featuredImage.alt}
              className={"rounded-2xl w-full"}
            />
          </Link>
        </div>
      )}
      {/*Note the w-full is important to keep card content full width of card*/}
      <div className={"card-body flex flex-col w-full"}>
        <Link className={"flex flex-col no-underline"} href={post["uri"]}>
          <Typography
            variant="h5"
            component={"span"}
            className={"text-primary-hover-href"}
          >
            {parse(post["title"])}
          </Typography>
        </Link>
        <Typography
          variant="body1"
          component={"span"}
          className={"text-secondary line-clamp-3"}
        >
          {parse(customExcerpt)}
        </Typography>

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
