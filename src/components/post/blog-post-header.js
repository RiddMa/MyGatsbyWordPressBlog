import React, { useEffect } from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const BlogPostHeader = ({ post, featuredImage }) => {
  function getScrollPercent() {
    let h = document.documentElement,
      b = document.body,
      st = "scrollTop",
      sh = "scrollHeight"
    return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
  }

  const calcScroll = () => {
    document.body.style.setProperty("--scroll", getScrollPercent())
  }

  useEffect(() => {
    window.addEventListener("scroll", calcScroll)
    return () => {
      window.removeEventListener("scroll", calcScroll)
    }
  }, [])

  return (
    <div className={"w-full moveBehind m-0 p-0"}>
      {featuredImage && (
        <GatsbyImage
          image={featuredImage.data}
          alt={featuredImage.alt}
          className={"rounded-3xl w-full m-0 p-0 testImg"}
        />
      )}
    </div>
  )
}

export default BlogPostHeader
