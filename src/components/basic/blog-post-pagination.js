import React from "react"
import { Pagination, PaginationItem } from "@mui/material"
import { Link } from "gatsby"

const BlogPostPagination = ({ currentPage, totalPages }) => {
  return (
    <Pagination
      page={currentPage}
      count={totalPages}
      showFirstButton
      showLastButton
      shape={"rounded"}
      renderItem={item => (
        <PaginationItem
          component={Link}
          to={`/blog${item.page === 1 ? "" : `/${item.page}`}`}
          {...item}
        />
      )}
    />
  )
}

export default BlogPostPagination
