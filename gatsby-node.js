const path = require(`path`)
const chunk = require(`lodash/chunk`)
const _ = require("lodash")

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
const { dd } = require(`dumper.js`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
  // Query our posts from the GraphQL server
  const posts = await getPosts(gatsbyUtilities)

  // If there are no posts in WordPress, don't do anything
  if (!posts.length) {
    return
  }

  // If there are posts, create pages for them
  await createIndividualBlogPostPages({ posts, gatsbyUtilities })

  // And a paginated archive
  await createBlogPostArchive({ posts, gatsbyUtilities })

  await createBlogPostArchiveByCategory({ posts, gatsbyUtilities })

  await createBlogPostArchiveByTag({ posts, gatsbyUtilities })

  // const PageTemplate = path.resolve("./src/templates/Page.js")
  // gatsbyUtilities.actions.createPage({
  //   path: "/test",
  //   component: PageTemplate,
  //   context: {},
  // })
}

/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
    posts.map(({ previous, post, next }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: post.uri,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/blog-post.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: post.id,

          // We also use the next and previous id's to query them and add links!
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  )

async function createIndividualBlogPages({ posts, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(`
    query {
      allWpPage {
        pages:nodes {
          id
          uri
          title
          frontendSettings {
            frontendShow:frontendshow
          }
          slug
          modifiedGmt
          dateGmt
          featuredImage {
            node {
              id
            }
          }
          content
        }
      }  
    }
  `)
  const { pages } = _.get(graphqlResult, "data.allWpPage", [])
  return Promise.all(
    pages.map(async page => {
      await gatsbyUtilities.actions.createPage({
        path: page.uri,
        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/blog-page.js`),
        context: {
          id: page.id,
        },
      })
    })
  )
}

/**
 * This function creates blog page archive sorted by date in this site
 */
async function createBlogPostArchive({ posts, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(`
    query {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const postsPerPage = _.get(
    graphqlResult,
    "data.wp.readingSettings.postsPerPage",
    10
  )

  const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
  const totalPages = postsChunkedIntoArchivePages.length

  // console.log(totalPages, postsChunkedIntoArchivePages)

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1

      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          // Since our homepage is our blog page
          // we want the first page to be "/" and any additional pages
          // to be numbered.
          // "/blog/2" for example
          return page === 1 ? `/blog` : `/blog/${page}`
        }
        return null
      }
      const pageUris = ["don't use pageNumber 0"]
      for (let i = 0; i < totalPages; i++) {
        pageUris.push(getPagePath(i + 1))
      }

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),
        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/blog-post-archive.js`),
        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,
          postsPerPage,
          // We need to tell the template how many posts to display too.
          currentPage: pageNumber,
          totalPages,
          pageUris,
        },
      })
    })
  )
}

/**
 * This function creates blog page archive grouped by category and sorted by date
 */
async function createBlogPostArchiveByCategory({ posts, gatsbyUtilities }) {
  let graphqlResult = await gatsbyUtilities.graphql(`
    query {
      wp {
        readingSettings {
          postsPerPage
        }
      }
      allWpCategory {
        nodes {
          id
          slug
        }
      }
    }
  `)

  graphqlResult = JSON.parse(JSON.stringify(graphqlResult))

  const postsPerPage = _.get(
    graphqlResult,
    "data.wp.readingSettings.postsPerPage",
    10
  )

  const categoryArray = _.get(graphqlResult, "data.allWpCategory.nodes", [])

  const postChunksByCategory = []
  for (const category of categoryArray) {
    let byCategoryQueryResult = await gatsbyUtilities.graphql(`
      query {
        allWpPost(
          sort: {fields: [date], order: DESC}
          filter: {categories: {nodes: {elemMatch: {id: {eq: "${category.id}"}}}}}
        ) {
          nodes {
            id
            title
            uri
            dateGmt(formatString: "YYYY-MM-DD")
            modifiedGmt(formatString: "YYYY-MM-DD")
            excerpt
            categories {
              nodes {
                id
                name
                uri
              }
            }
            tags {
              nodes {
                id
                name
                uri
              }
            }
            featuredImage {
              node {
                caption
                altText
                description
                title
                localFile {
                  childImageSharp {
                    desktop: gatsbyImageData(
                      placeholder: BLURRED
                      quality: 20
                      layout: CONSTRAINED
                      formats: WEBP
                      transformOptions: {cropFocus: ATTENTION, fit: COVER}
                      height: 300
                      aspectRatio: 1.33
                    )
                    mobile: gatsbyImageData(
                      placeholder: BLURRED
                      quality: 30
                      layout: CONSTRAINED
                      formats: WEBP
                      transformOptions: {cropFocus: ATTENTION, fit: COVER}
                      height: 600
                      aspectRatio: 1.5
                    )
                  }
                }
              }
            }
          }
        }
      }
    `)
    byCategoryQueryResult = _.get(
      JSON.parse(JSON.stringify(byCategoryQueryResult)),
      "data.allWpPost.nodes",
      []
    )
    for (let i = 0; i < byCategoryQueryResult.length; i++) {
      byCategoryQueryResult[i].featuredImage = _.get(
        byCategoryQueryResult[i].featuredImage,
        "node",
        null
      )
    }
    byCategoryQueryResult = chunk(byCategoryQueryResult, postsPerPage)
    postChunksByCategory.push({
      categorySlug: category.slug,
      postChunk: byCategoryQueryResult,
    })
  }

  return Promise.all(
    // Loop through all categories
    postChunksByCategory.map(async (categoryChunksData, categoryIndex) => {
      const totalPages = categoryChunksData.postChunk.length || 1

      // Helper function to get path uri,
      // "/blog/category/<categoryName>/" if pageNumber==1 or "/blog/category/<categoryName>/<pageNumber>" if pageNumber>1
      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          return page === 1
            ? decodeURIComponent(
                `/blog/category/${categoryChunksData.categorySlug}/`
              )
            : decodeURIComponent(
                `/blog/category/${categoryChunksData.categorySlug}/${page}`
              )
        }
        return null
      }
      // pageUris for each pageNumber,
      // structure=["don't use pageNumber 0",
      //            "/blog/category/<categoryName>/",
      //            "/blog/category/<categoryName>/2",
      //            ...]
      const pageUris = ["don't use pageNumber 0"]
      for (let i = 0; i < totalPages; i++) {
        pageUris.push(getPagePath(i + 1))
      }

      if (categoryChunksData.postChunk.length === 0) {
        await gatsbyUtilities.actions.createPage({
          path: getPagePath(1),
          component: path.resolve(`./src/templates/blog-post-archive-v2.js`),
          context: {
            currentPage: 1,
            totalPages,
            pageUris,
            pageData: [],
            cardType: "post",
          },
        })
      }

      // Finally create individual archive pages for given category
      categoryChunksData.postChunk.map(async (categoryPageData, pageIndex) => {
        // console.log(categoryPageData, pageIndex)
        const pageNumber = pageIndex + 1

        await gatsbyUtilities.actions.createPage({
          path: getPagePath(pageNumber),
          component: path.resolve(`./src/templates/blog-post-archive-v2.js`),
          context: {
            currentPage: pageNumber,
            totalPages,
            pageUris,
            pageData: categoryPageData,
            cardType: "post",
          },
        })
      })
    })
  )
}

/**
 * This function creates blog page archive grouped by tag and sorted by date
 */
async function createBlogPostArchiveByTag({ posts, gatsbyUtilities }) {
  let graphqlResult = await gatsbyUtilities.graphql(`
    query {
      wp {
        readingSettings {
          postsPerPage
        }
      }
      allWpTag {
        nodes {
          id
          slug
        }
      }
    }
  `)

  graphqlResult = JSON.parse(JSON.stringify(graphqlResult))

  const postsPerPage = _.get(
    graphqlResult,
    "data.wp.readingSettings.postsPerPage",
    10
  )

  const tagArray = _.get(graphqlResult, "data.allWpTag.nodes", [])

  const postChunksByTag = []
  for (const tag of tagArray) {
    let byTagQueryResult = await gatsbyUtilities.graphql(`
      query {
        allWpPost(
          sort: {fields: [date], order: DESC}
          filter: {tags: {nodes: {elemMatch: {id: {eq: "${tag.id}"}}}}}
        ) {
          nodes {
            id
            title
            uri
            dateGmt(formatString: "YYYY-MM-DD")
            modifiedGmt(formatString: "YYYY-MM-DD")
            excerpt
            categories {
              nodes {
                id
                name
                uri
              }
            }
            tags {
              nodes {
                id
                name
                uri
              }
            }
            featuredImage {
              node {
                caption
                altText
                description
                title
                localFile {
                  childImageSharp {
                    desktop: gatsbyImageData(
                      placeholder: BLURRED
                      quality: 20
                      layout: CONSTRAINED
                      formats: WEBP
                      transformOptions: {cropFocus: ATTENTION, fit: COVER}
                      height: 300
                      aspectRatio: 1.33
                    )
                    mobile: gatsbyImageData(
                      placeholder: BLURRED
                      quality: 30
                      layout: CONSTRAINED
                      formats: WEBP
                      transformOptions: {cropFocus: ATTENTION, fit: COVER}
                      height: 600
                      aspectRatio: 1.5
                    )
                  }
                }
              }
            }
          }
        }
      }
    `)
    byTagQueryResult = _.get(
      JSON.parse(JSON.stringify(byTagQueryResult)),
      "data.allWpPost.nodes",
      []
    )
    for (let i = 0; i < byTagQueryResult.length; i++) {
      byTagQueryResult[i].featuredImage = _.get(
        byTagQueryResult[i].featuredImage,
        "node",
        null
      )
    }
    byTagQueryResult = chunk(byTagQueryResult, postsPerPage)
    postChunksByTag.push({
      tagSlug: tag.slug,
      postChunk: byTagQueryResult,
    })
  }

  return Promise.all(
    // Loop through all categories
    postChunksByTag.map(async (tagChunksData, tagIndex) => {
      const totalPages = tagChunksData.postChunk.length

      // Helper function to get path uri,
      // "/blog/category/<categoryName>/" if pageNumber==1 or "/blog/category/<categoryName>/<pageNumber>" if pageNumber>1
      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          return page === 1
            ? decodeURIComponent(`/blog/tag/${tagChunksData.tagSlug}/`)
            : decodeURIComponent(`/blog/tag/${tagChunksData.tagSlug}/${page}`)
        }
        return null
      }
      // pageUris for each pageNumber,
      // structure=["don't use pageNumber 0",
      //            "/blog/category/<categoryName>/",
      //            "/blog/category/<categoryName>/2",
      //            ...]
      const pageUris = ["don't use pageNumber 0"]
      for (let i = 0; i < totalPages; i++) {
        pageUris.push(getPagePath(i + 1))
      }

      // Finally create individual archive pages for given category
      tagChunksData.postChunk.map(async (tagPageData, pageIndex) => {
        // console.log(categoryPageData, pageIndex)
        const pageNumber = pageIndex + 1

        await gatsbyUtilities.actions.createPage({
          path: getPagePath(pageNumber),
          component: path.resolve(`./src/templates/blog-post-archive-v2.js`),
          context: {
            currentPage: pageNumber,
            totalPages,
            pageUris,
            pageData: tagPageData,
            cardType: "post",
          },
        })
      })
    })
  )
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      # Query all WordPress blog posts sorted by date
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }

          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            id
            uri
          }

          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPost.edges
}
