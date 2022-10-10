import { createMuiTheme } from "@mui/material";

const myTheme=createMuiTheme({

  // Theme settings
  palette:{
    type: toggleDark ? 'dark' : 'light',
  }
});