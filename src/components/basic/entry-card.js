import React from "react"
import { useSelector } from "react-redux"
import { Link } from "@mui/material"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Typography from "@mui/material/Typography"
import parse from "html-react-parser"
import _ from "lodash"
import { defaultDescription } from "../../../blog-config"

const EntryCard = props => {
  // console.log(props)
  let {
    uri,
    title,
    dateGmt,
    modifiedGmt,
    description,
    excerpt,
    slug,
    featuredImage,
    categories,
    tags,
    count,
  } = props.data
  let { type, showPostCount, showPublishDate, showCategories, showTags } = props

  // If there's no description, then use default ones set in blog-config.js,
  // according to card type.

  switch (type) {
    case "category": {
      showPostCount = true
      showPublishDate = false
      showCategories = false
      showTags = false
      description = description || defaultDescription[type]
      break
    }
    case "tag": {
      showPostCount = true
      showPublishDate = false
      showCategories = false
      showTags = false
      description = description || defaultDescription[type]
      break
    }
    case "post": {
      showPostCount = false
      showPublishDate = true
      showCategories = true
      showTags = true
      description = excerpt || defaultDescription[type]
      break
    }
  }

  return (
    <>
      <div
        className={
          "card flex sm:flex-col sm:space-y-4 lg:space-y-0 lg:flex-row sm:space-x-2 lg:space-x-6 sm:p-6 2xl:p-8 transition-all border-none rounded-3xl drop-shadow-xl hover:drop-shadow-2xl content-bg "
        }
      >
        <CardHeader featuredImage={featuredImage} uri={uri}></CardHeader>
        {/*Note the w-full is important to keep card content full width of card*/}
        <div
          className={
            "card-body flex flex-col w-full space-y-4 min-w-[300px] sm:min-h-[100px] lg:min-h-[200px]"
          }
        >
          <Link className={"flex flex-col no-underline"} href={uri}>
            <Typography
              variant="h5"
              component={"span"}
              className={"text-primary-hover-href"}
            >
              {title}
            </Typography>
          </Link>
          <DescriptionDisplay description={description} />
          <div className={"grow"}></div>
          <div className={"flex flex-row m-0 p-0"}>
            <div className={"flex flex-col m-0 p-0"}>
              {showCategories && <CategoryDisplay categories={categories} />}
              {showTags && <TagDisplay tags={tags} />}
            </div>
            <div className={"grow min-w-[32px]"}></div>
            <div className={"flex flex-col"}>
              <div className={"grow"}></div>
              {showPublishDate && (
                <ModifiedDateDisplay modifiedGmt={modifiedGmt} />
              )}
              {showPostCount && <PostCountDisplay count={count} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const CardHeader = ({ featuredImage, uri }) => {
  // React Hooks cannot be called conditionally
  const isDesktop = useSelector(state => state.isDesktop)
  if (!!featuredImage) {
    let image
    const { altText, caption, description } = featuredImage
    if (isDesktop) {
      image = _.get(featuredImage, "localFile.childImageSharp.desktop", null)
    } else {
      image = _.get(featuredImage, "localFile.childImageSharp.mobile", null)
    }
    return (
      <div className="card-header">
        <Link className={"no-underline"} href={uri}>
          <GatsbyImage
            image={image}
            alt={altText}
            className={"rounded-2xl min-h-full"}
          />
        </Link>
      </div>
    )
  } else {
    return <></>
  }
}

const DescriptionDisplay = ({ description }) => {
  description = description
    .replace(/\n<p class="read-more">.+<\/p>/, "")
    .replace(/<p>/, "")
    .replace(/<\/p>/, "")

  return (
    <Typography
      variant="body1"
      component={"span"}
      className={"text-secondary line-clamp-3 m-0 p-0"}
    >
      {parse(description)}
    </Typography>
  )
}

const CategoryDisplay = ({ categories }) => {
  const isDesktop = useSelector(state => state.isDesktop)
  categories = _.get(categories, "nodes", [])
  if (!!categories) {
    return (
      <Typography variant="body1" component={"div"} className={"text-hint"}>
        <div className={"min-w-0 max-w-[700px] line-clamp-1"}>
          分类：
          {categories.map(item => {
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
    )
  } else {
    return (
      <Typography variant="body1" component={"div"} className={"text-hint"}>
        <div className={"min-w-0 max-w-[700px] line-clamp-1"}>分类：——</div>
      </Typography>
    )
  }
}

const TagDisplay = ({ tags }) => {
  const isDesktop = useSelector(state => state.isDesktop)
  tags = _.get(tags, "nodes", [])
  if (tags.length) {
    return (
      <Typography variant="body1" component={"div"} className={"text-hint"}>
        <div className={"min-w-0 max-w-[700px] line-clamp-1"}>
          标签：
          {tags.map(item => {
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
    )
  } else {
    return (
      <Typography variant="body1" component={"div"} className={"text-hint"}>
        <div className={"min-w-0 max-w-[700px] line-clamp-1"}>标签：——</div>
      </Typography>
    )
  }
}

const ModifiedDateDisplay = ({ modifiedGmt }) => {
  if (!!modifiedGmt) {
    return (
      <>
        <Typography
          variant="body1"
          component={"span"}
          className={
            "text-hint whitespace-nowrap justify-self-end align-bottom min-h-fit"
          }
        >
          {modifiedGmt}
        </Typography>
      </>
    )
  } else {
    return <></>
  }
}

const PostCountDisplay = ({ count }) => {
  let text = `${count}篇文章`
  if (!count) {
    text = "暂无文章"
  }
  return (
    <>
      <Typography
        variant="body1"
        component={"span"}
        className={"text-hint whitespace-nowrap justify-self-end"}
      >
        {text}
      </Typography>
    </>
  )
}

export default EntryCard
