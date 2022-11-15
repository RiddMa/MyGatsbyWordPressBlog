// Order in '/blog/category' page
export const categoryLayoutOrder = [
  "tech",
  "photography",
  "thoughts",
  "life",
  "note",
  "assignment",
  "uncategorized",
]

// Use post count to sort categories in right panel widget,
// if false then use categoryLayoutOrder
export const categoryWidgetOrderUseCount = false

// Order in '/blog/tag' page
export const tagLayoutOrder = []

// Use post count to sort tags in right panel widget,
// if false then use tagLayoutOrder
export const tagWidgetOrderUseCount = true

// TODO: Add custom uri prefix support
// normally uri for category archive is "/category/", and for category post archive is "/category/<categoryName>/",
// here you can configure prefix added to uris, e.g. "/blog/category/"
export const blogPostUriPrefix = "/blog"
export const categoryUriPrefix = "/blog"
export const tagUriPrefix = "/blog"

export const defaultDescription = {
  category: "该分类暂无描述。",
  tag: "该标签暂无描述。",
  post: "暂无摘要。",
}

export const noPostText = "暂无内容"
