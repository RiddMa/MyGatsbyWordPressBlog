import React, { useCallback, useEffect, useRef, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Avatar, Link, Typography, Button } from "@mui/material"

import GitHubIcon from "@mui/icons-material/GitHub"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

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
      allWp {
        nodes {
          generalSettings {
            url
            title
            description
          }
        }
      }
    }
  `)
  // console.log(data)
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

  return (
    <div className={"flex flex-col space-y-4 m-0 p-0 max-h-screen"}>
      <Avatar
        className={"avatar"}
        alt={username}
        src={avatar}
        sx={{ width: 150, height: 150 }}
      ></Avatar>
      <Link href={"/"} className={"title"}>
        <Typography
          variant={"h5"}
          component={"h1"}
          className={"href-text text-primary"}
          // color={"primary"}
        >
          {siteTitle}
        </Typography>
      </Link>
      <div className={"slogan"}>
        <Typography
          variant={"body1"}
          component={"span"}
          className={"text-secondary"}
          // color={"text.secondary"}
        >
          {siteDesc}
        </Typography>
      </div>
      <div className={"flex flex-row"}>
        <Link
          href={"https://github.com/RiddMa"}
          target="_blank"
          rel="noopener noreferrer"
          className={"text-secondary"}
        >
          <GitHubIcon className={"text-primary"}></GitHubIcon>
        </Link>
      </div>
      <div className={"flex flex-col sm:gap-y-2 lg:gap-y-4"}>
        <NavButton href={"/"}>主页</NavButton>
        <NavButton href={"/blog"}>博客</NavButton>
        <NavButton href={"/photography"}>相册</NavButton>
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
              "nav-button-text mx-auto w-fit grid grid-flow-col place-items-center"
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

const Test = props => {
  return (
    <>
      <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Cyan to blue
        </span>
      </button>

      <a
        href="#_"
        className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
      >
        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
        <span className="relative">Button Text</span>
      </a>

      <a
        href="#_"
        className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
      >
        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
        <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
          <svg
            className="w-5 h-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </span>
        <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
          <svg
            className="w-5 h-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </span>
        <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
          Button Text
        </span>
      </a>
    </>
  )
}
