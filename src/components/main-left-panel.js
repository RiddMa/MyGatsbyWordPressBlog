import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Avatar, Container, Link, List, Paper, Stack } from "@mui/material"
import Typography from "@mui/material/Typography"
import GitHubIcon from "@mui/icons-material/GitHub"

import DarkModeToggle from "./dark-mode-toggle"
import { RdButton } from "./rd-button"

const MainLeftPanel = props => {
  const data = useStaticQuery(graphql`
    query userQuery {
      allWpUser {
        nodes {
          name
          id
          description
          slug
          uri
          registeredDate
          avatar {
            url
          }
        }
      }
    }
  `)
  console.log(data)
  console.log()
  const username = data["allWpUser"]["nodes"][0]["name"]
  const userUrl = ``
  const avatar = data["allWpUser"]["nodes"][0]["avatar"]["url"].replace(
    /\?s=\d+/,
    "?s=150"
  )
  return (
    <div className={"flex flex-col space-y-4 py-16"}>
      <Avatar
        className={"avatar"}
        alt={username}
        src={avatar}
        sx={{ width: 150, height: 150 }}
      ></Avatar>
      <Link href={"/"} className={"title"}>
        <Typography
          variant={"h4"}
          component={"h1"}
          className={"href-text"}
          color={"primary"}
        >
          Ridd's Blog
        </Typography>
      </Link>
      <div className={"slogan"}>
        <Typography
          variant={"h6"}
          component={"h1"}
          // className={"text-primary"}
          color={"text.primary"}
        >
          Think Different.
        </Typography>
      </div>
      <div className={"flex flex-row"}>
        <GitHubIcon className={"text-primary"}></GitHubIcon>
      </div>

      <DarkModeToggle></DarkModeToggle>
      <RdButton>test</RdButton>
    </div>
  )
}

export default MainLeftPanel
