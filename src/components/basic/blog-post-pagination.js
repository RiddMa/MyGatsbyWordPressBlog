import React from "react"
import { Pagination, PaginationItem, Link } from "@mui/material"

const BlogPostPagination = ({ currentPage, totalPages, pageUris }) => {
  // console.log(currentPage, totalPages, pageUris)
  return (
    <Pagination
      page={currentPage}
      count={totalPages}
      showFirstButton
      showLastButton
      shape={"rounded"}
      renderItem={item => (
        <PaginationItem component={Link} href={pageUris[item.page]} {...item} />
      )}
    />
  )
}

export default BlogPostPagination
