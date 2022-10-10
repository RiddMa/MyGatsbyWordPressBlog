import React from "react"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

const HeroTitle = props => {
  return (
    <Box>
      <Typography
        variant={"h5"}
        component={"h1"}
        className={
          "ml-0.5 mb-1 transition-all ease-in-out hover:translate-x-14 hover:scale-110 duration-500"
        }
      >
        Hi there, this is
      </Typography>
      <Typography
        variant={"h3"}
        component={"h1"}
        className={
          "mb-2 transition-all ease-in-out hover:translate-x-14 hover:scale-110 duration-500"
        }
      >
        Ridd Ma.
      </Typography>
      <Typography
        variant={"h1"}
        sx={{ fontFamily: "Helvetica" }}
        className={
          "transition-all ease-in-out hover:translate-x-36 hover:scale-125 duration-500 hover:mt-4"
        }
      >
        Think Different.
      </Typography>
    </Box>
  )
}

export default HeroTitle
