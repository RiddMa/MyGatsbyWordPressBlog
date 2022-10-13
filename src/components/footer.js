import React from "react"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { Link } from "@mui/material"
import { StaticImage } from "gatsby-plugin-image"
import { useSelector } from "react-redux"

const Footer = props => {
  return (
    // <div className="acrylic-dark">
    <div className={"flex flex-col space-y-4 pb-20"}>
      <Typography
        variant="body2"
        component={"span"}
        color={"text.hint"}
        className={"text-center"}
      >
        ©{" "}
        <Link
          href={"https://github.com/RiddMa"}
          target="_blank"
          rel="noopener noreferrer"
          className={"text-secondary"}
        >
          Ridd
        </Link>{" "}
        since 2022.
      </Typography>
      <div className={"flex flex-col place-items-center space-y-2"}>
        <Typography
          variant="body2"
          component={"span"}
          color={"text.hint"}
          className={"text-center"}
        >
          Built with
        </Typography>
        <div className={"flex flex-row justify-center space-x-2 gap-y-4 flex-wrap"}>
          <Link
            href="https://wordpress.org/"
            target="_blank"
            rel="noopener noreferrer"
            className={
              "flex flex-col place-items-center space-y-1 w-20 text-hint"
            }
            variant={"caption"}
          >
            <img
              src={
                "https://raw.githubusercontent.com/reactjs/reactjs.org/main/src/icons/logo.svg"
              }
              alt={"Logo of React"}
              width={45}
              height={45}
            ></img>
            <span>React</span>
          </Link>
          <Link
            href="https://mui.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={
              "flex flex-col place-items-center space-y-1 w-20 text-hint"
            }
            variant={"caption"}
          >
            <img
              src="https://raw.githubusercontent.com/mui/material-ui/master/docs/public/static/logo.svg"
              alt="MUI logo"
              width={45}
              height={45}
            />
            <span>MUI</span>
          </Link>
          <Link
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={
              "flex flex-col place-items-center space-y-1 w-20 text-hint"
            }
            variant={"caption"}
          >
            <img
              src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.79614a5f61617ba49a0891494521226b.svg"
              alt="MUI logo"
              width={45}
              height={45}
            />
            <span>Tailwind CSS</span>
          </Link>
          <Link
            href="https://www.gatsbyjs.com"
            target="_blank"
            rel="noopener noreferrer"
            className={
              "flex flex-col place-items-center space-y-1 w-20 text-hint"
            }
            variant={"caption"}
          >
            <img
              src={"https://www.gatsbyjs.com/Gatsby-Monogram.svg"}
              alt={"Logo of Gatsby"}
              width={"45px"}
              height={"45px"}
            ></img>
            <span>Gatsby</span>
          </Link>
          <Link
            href="https://wordpress.org/"
            target="_blank"
            rel="noopener noreferrer"
            className={
              "flex flex-col place-items-center space-y-1 w-20 text-hint"
            }
            variant={"caption"}
          >
            <WpLogo></WpLogo>
            <span>WordPress</span>
          </Link>
        </div>
      </div>
      <div className={"flex flex-col place-items-center space-y-2"}>
        <Typography
          variant="body2"
          component={"span"}
          color={"text.hint"}
          className={"text-center"}
        >
          Theme{" "}
          <Link
            href={""}
            target="_blank"
            rel="noopener noreferrer"
            className={"text-hint"}
          >
            ReStack
          </Link>{" "}
          designed by{" "}
          <Link
            href={"https://github.com/RiddMa"}
            target="_blank"
            rel="noopener noreferrer"
            className={"text-hint"}
          >
            Ridd
          </Link>
          ,
          <br />
          inspired by
        </Typography>
        <Link
          href={"https://github.com/CaiJimmy/hugo-theme-stack"}
          target="_blank"
          rel="noopener noreferrer"
          className={
            "flex flex-col place-items-center space-y-1 w-14 text-hint"
          }
          variant={"caption"}
        >
          <StaticImage
            src={
              "https://user-images.githubusercontent.com/5889006/190859553-5b229b4f-c476-4cbd-928f-890f5265ca4c.png"
            }
            alt={"Logo of Hugo Theme Stack"}
            layout={"fixed"}
            placeholder={"blurred"}
            width={45}
          ></StaticImage>
          <span>Stack</span>
        </Link>
      </div>
    </div>
  )
}

const WpLogo = props => {
  const useDarkMode = useSelector(state => state.useDarkMode)
  if (useDarkMode) {
    return (
      <StaticImage
        src={
          "https://s.w.org/style/images/about/WordPress-logotype-wmark-white.png"
        }
        alt={"Logo of WordPress"}
        layout={"fixed"}
        width={45}
        height={45}
        transformOptions={{ trim: 10 }}
        className={"dark:hidden"}
      ></StaticImage>
    )
  } else {
    return (
      <StaticImage
        src={"https://s.w.org/style/images/about/WordPress-logotype-wmark.png"}
        alt={"Logo of WordPress"}
        layout={"fixed"}
        width={45}
        height={45}
        transformOptions={{ trim: 10 }}
        className={"dark:hidden"}
      ></StaticImage>
    )
  }
}

export default Footer
