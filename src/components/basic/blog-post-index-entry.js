import React from "react"
import { Link } from "@mui/material"
import Typography from "@mui/material/Typography"

const BlogPostIndexEntry = props => {
  const postData = props.data
  console.log(postData)

  const hasImage = !!postData.featuredImage?.node?.link

  return (
    <div
      className={
        (hasImage ? "space-x-4" : "") +
        " card flex flex-row p-4 border-solid rounded-2xl drop-shadow-lg"
      }
    >
      {hasImage && (
        <div className="card-header max-w-sm max-h-48">
          <Link className={"flex flex-col no-underline"} href={postData["uri"]}>
            <img
              className="max-w-sm max-h-48 rounded-2xl"
              // src={postData.featuredImage?.node?.link || ""}
              src={
                "https://images.unsplash.com/photo-1666731725101-8824fea39c2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              }
              alt={
                postData.featuredImage?.node?.alt || "No Image or Error Loading"
              }
            />
          </Link>
        </div>
      )}

      <div
        className={
          (hasImage ? "" : "") + " card-body flex flex-col"
        }
      >
        <Link className={"flex flex-col no-underline"} href={postData["uri"]}>
          <Typography
            variant="h5"
            component={"span"}
            className={"text-primary"}
          >
            {postData["title"]}
          </Typography>
          <Typography
            variant="body1"
            component={"span"}
            className={"text-secondary"}
            dangerouslySetInnerHTML={{ __html: postData["excerpt"] }}
          ></Typography>
        </Link>
        <div className={"flex flex-row"}>
          <Typography
            variant="body1"
            component={"span"}
            className={"text-hint"}
          >
            分类：
            {postData.categories?.nodes?.map(item => {
              return (
                <Link key={item.uri} className={"text-hint mr-2"} href={item.uri}>
                  {item.name}
                </Link>
              )
            })}
          </Typography>
          <div className={"grow"}></div>
          <Typography
            variant="body1"
            component={"span"}
            className={"text-hint justify-self-end"}
          >
            {postData["dateGmt"]}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default BlogPostIndexEntry
