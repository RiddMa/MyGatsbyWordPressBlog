import React from "react"
import { useSelector } from "react-redux"
import { Link } from "@mui/material"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Typography from "@mui/material/Typography"
import parse from "html-react-parser"
import _ from "lodash"

const EntryCard = props => {
  const {
    title,
    description,
    slug,
    uri,
    featuredImage,
    categories,
    count,
    date,
  } = props.data
  const { showPostCount, showPublishDate, showCategories } = props

  return (
    <>
      <div
        className={
          "card flex sm:flex-col sm:space-y-4 lg:space-y-0 lg:flex-row sm:space-x-0 lg:space-x-4 sm:p-6 2xl:p-8 transition-all border-none rounded-3xl drop-shadow-xl hover:drop-shadow-2xl content-bg "
        }
      >
        <CardHeader featuredImage={featuredImage} uri={uri}></CardHeader>
        {/*Note the w-full is important to keep card content full width of card*/}
        <div
          className={
            "card-body flex flex-col w-full space-y-2 min-w-[300px] sm:min-h-[100px] lg:min-h-[200px]"
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
          <Typography
            variant="body1"
            component={"span"}
            className={"text-secondary line-clamp-3"}
          >
            {description}
          </Typography>
          <div className={"grow"}></div>
          <div className={"flex flex-row m-0 p-0"}>
            {showCategories && <CategoryDisplay categories={categories} />}
            <div className={"grow"}></div>
            {showPublishDate && <PublishDateDisplay date={date} />}
            {showPostCount && <PostCountDisplay count={count} />}
          </div>
        </div>
      </div>
    </>
  )
}

const CardHeader = ({ featuredImage, uri }) => {
  const isDesktop = useSelector(state => state.isDesktop)
  let image,
    { alt, caption } = featuredImage
  if (isDesktop) {
    image = _.get(featuredImage, "childImageSharp.desktop", null)
  } else {
    image = _.get(featuredImage, "childImageSharp.mobile", null)
  }
  if (!!featuredImage) {
    return (
      <div className="card-header">
        <Link className={"no-underline"} href={uri}>
          <GatsbyImage
            image={image}
            alt={alt}
            className={"rounded-2xl min-h-full"}
          />
        </Link>
      </div>
    )
  } else {
    return <></>
  }
}
const CategoryDisplay = ({ categories }) => {
  const isDesktop = useSelector(state => state.isDesktop)
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
    return <></>
  }
}

const PublishDateDisplay = ({ date }) => {
  if (!!date) {
    return (
      <>
        <Typography
          variant="body1"
          component={"span"}
          className={"text-hint whitespace-nowrap justify-self-end"}
        >
          {date}
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
