import React from "react"
import Typography from "@mui/material/Typography"
import MainLeftPanel from "../components/basic/main-left-panel"
import ThreeColumn from "../components/layout/three-column"
import MainRightPanel from "../components/basic/main-right-panel"

const About = props => {
  return (
    <>
      <ThreeColumn
        left={<MainLeftPanel />}
        center={<AboutBody />}
        right={<MainRightPanel />}
      />
    </>
  )
}

const AboutBody = props => {
  return (
    <>
      <div className={"card"}>
        <div className={"card-body"}>
          <Typography
            variant={"h3"}
            component={"h1"}
            className={"text-primary"}
          >
            关于
          </Typography>
        </div>
      </div>
    </>
  )
}

export default About

// query CategoryQuery {
//   allWpPage {
//     nodes {
//       uri
//       dateGmt(formatString: "YYYY-MM-DD")
//       modifiedGmt(formatString: "YYYY-MM-DD")
//       content
//       contentTypeName
//       contentType {
//         node {
//           id
//         }
//       }
//       id
//       title
//       status
//       slug
//       featuredImage {
//         node {
//           altText
//           caption
//           description
//           localFile {
//             childImageSharp {
//               gatsbyImageData(
//                 quality: 50
//               placeholder: BLURRED
//               layout: FULL_WIDTH
//               formats: WEBP
//             )
//             }
//           }
//         }
//       }
//     }
//   }
// }

