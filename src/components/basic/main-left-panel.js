import React, { useCallback, useEffect, useRef, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Avatar, Link, Typography, Button } from "@mui/material"
import { Icon } from "@iconify/react"
import _ from "lodash"

import GitHubIcon from "@mui/icons-material/GitHub"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import DarkModeToggle from "./dark-mode-toggle"

const MainLeftPanel = props => {
  const data = useStaticQuery(graphql`
    query {
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
      allWp {
        nodes {
          generalSettings {
            url
            title
            description
          }
        }
      }
      allWpPage {
        nodes {
          id
          uri
          title
          frontendSettings {
            frontendshow
          }
        }
      }
    }
  `)
  // console.log(_.get(data, "allWpPage.nodes", []))
  const username = data["allWpUser"]["nodes"][0]["name"]
  const userUrl = ``
  const avatar = data["allWpUser"]["nodes"][0]["avatar"]["url"].replace(
    /\?s=\d+/,
    "?s=150"
  )
  const generalSettings = data["allWp"]["nodes"][0]["generalSettings"]
  const siteUrl = generalSettings["url"]
  const siteTitle = generalSettings["title"]
  const siteDesc = generalSettings["description"]
  const allWpPage = _.get(data, "allWpPage.nodes", []).filter(el => {
    return el.frontendSettings.frontendshow
  })
  console.log(allWpPage)

  return (
    <div
      className={"flex flex-col space-y-4 m-0 p-0 max-h-screen justify-center"}
    >
      <Avatar
        className={"avatar w-[150px] h-[150px] mx-auto"}
        alt={username}
        src={avatar}
      ></Avatar>
      <Link href={"/"} className={"title no-underline group mx-auto"}>
        <Typography
          variant={"h5"}
          component={"h1"}
          className={"text-secondary-hover-href text-primary"}
        >
          {siteTitle}
        </Typography>
      </Link>
      <div className={"slogan  mx-auto"}>
        <Typography
          variant={"body1"}
          component={"span"}
          className={"text-secondary"}
        >
          {siteDesc}
        </Typography>
      </div>
      <div className={"flex flex-row mx-auto"}>
        <Link
          href={"https://github.com/RiddMa"}
          target="_blank"
          rel="noopener noreferrer"
          className={"text-secondary"}
        >
          <GitHubIcon className={"text-primary"}></GitHubIcon>
        </Link>
      </div>
      <div className={"flex flex-col transition-all sm:gap-y-2 lg:gap-y-4"}>
        <NavButton href={"/"}>
          <div className={"grid grid-flow-col items-center gap-x-2"}>
            <Icon icon="bx:home" className={"w-6 h-full"} />
            <span>??????</span>
          </div>
        </NavButton>
        <NavButton href={"/blog"}>
          <div className={"grid grid-flow-col items-center gap-x-2"}>
            <Icon icon="icomoon-free:blog" className={"w-6 h-full"} />
            <span>??????</span>
          </div>
        </NavButton>
        <NavButton href={"/photography"}>
          <div className={"grid grid-flow-col items-center gap-x-2"}>
            <Icon icon="clarity:image-gallery-line" className={"w-6 h-full"} />
            <span>??????</span>
          </div>
        </NavButton>
        {allWpPage.map(el => {
          return (
            <NavButton key={el.id} href={el.uri}>
              <div className={"grid grid-flow-col items-center gap-x-2"}>
                <Icon icon="bi:info-circle" className={"w-6 h-full"} />
                <span>{el.title}</span>
              </div>
            </NavButton>
          )
        })}
        {/*<NavButton href={"/about"}>*/}
        {/*  <div className={"grid grid-flow-col items-center gap-x-2"}>*/}
        {/*    <Icon icon="bi:info-circle" className={"w-6 h-full"} />*/}
        {/*    <span>??????</span>*/}
        {/*  </div>*/}
        {/*</NavButton>*/}
        <DarkModeToggle></DarkModeToggle>
      </div>
    </div>
  )
}

export default MainLeftPanel

const NavButton = props => {
  return (
    <div className={"h-9 m-0 p-0 w-full flex flex-row justify-center"}>
      <Button
        href={props.href}
        className={
          "m-1 p-0 w-full group transition-all ease-out rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 hover:m-0 hover:p-1"
        }
      >
        <div className={"m-0 p-0 rounded-lg website-bg w-full h-full"}>
          <div
            className={
              "text-secondary-hover-href mx-auto w-fit grid grid-flow-col place-items-center"
            }
          >
            <span
              className={
                "m-0 p-0 transition-all ease-out translate-x-2 group-hover:translate-x-1"
              }
            >
              {props.children}
            </span>
            <ChevronRightIcon
              className={
                "m-0 p-0 mt-0.5 transition-all ease-out scale-0 group-hover:scale-100 -translate-x-5 group-hover:translate-x-1"
              }
            ></ChevronRightIcon>
          </div>
        </div>
      </Button>
    </div>
  )
}
