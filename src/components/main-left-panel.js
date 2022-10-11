import React from "react"
import { Avatar, Container, List, Paper, Stack } from "@mui/material"

const MainLeftPanel = props => {
  return (
    <Container>
      <Stack spacing={2}>
        <Avatar>123</Avatar>
        <Paper>
          <span className="box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ...">
            Hello
            <br />
            World
          </span>
        </Paper>
        <List>789</List>
      </Stack>
    </Container>
  )
}

export default MainLeftPanel