import React from "react"
import { Link } from "@mui/material"

const BlogPostIndexEntry = props => {
  const postData = props.data
  return (
    <Link className={"flex flex-col no-underline"} href={postData["uri"]}>
      <div className="card flex flex-row py-4 ml-8 space-x-4 border-solid rounded-2xl drop-shadow-lg">
        <div className="card-header -ml-8 max-w-sm max-h-48">
          <img
            className="max-w-sm max-h-48 rounded-2xl"
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="tailwind-card-image"
          />
        </div>
        <div className="card-body">
          <h4>{postData["title"]}</h4>
          <div dangerouslySetInnerHTML={{ __html: postData["excerpt"] }} />
          <div>{postData["dateGmt"]}</div>
        </div>
      </div>
    </Link>
  )
}

export default BlogPostIndexEntry
