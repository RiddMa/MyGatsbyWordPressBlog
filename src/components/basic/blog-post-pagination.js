import React from "react"
import { Pagination, PaginationItem } from "@mui/material"
import { Link } from "gatsby"

const BlogPostPagination = ({ currentPage, totalPages, pageUris }) => {
  return (
    <Pagination
      page={currentPage}
      count={totalPages}
      showFirstButton
      showLastButton
      shape={"rounded"}
      renderItem={item => (
        <PaginationItem component={Link} to={pageUris[item.page]} {...item} />
      )}
    />
  )
}

export default BlogPostPagination
