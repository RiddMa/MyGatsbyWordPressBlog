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
    console.log(1)
  }

  useEffect(() => {
    window.addEventListener("scroll", calcScroll)
    return () => {
      window.removeEventListener("scroll", calcScroll)
    }
  }, [])

  return (
    <div className={"w-full moveBehind"}>
      {/*if we have a featured image for this post let's display it*/}
      {featuredImage && (
        <GatsbyImage
          image={featuredImage.data}
          alt={featuredImage.alt}
          className={"rounded-3xl w-full"}
        />
      )}
    </div>
  )
}

export default BlogPostHeader
