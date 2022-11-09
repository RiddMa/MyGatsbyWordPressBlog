import { createTheme } from "@mui/material/styles"

export const breakPoints = {
  values: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },
}

export const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#38bdf8",
    },
    secondary: {
      main: "#f87171",
    },
    error: {
      main: "#f87171",
    },
    warning: {
      main: "#fb923c",
    },
    info: {
      main: "#60a5fa",
    },
    success: {
      main: "#4ade80",
    },
    background: {
      default: "#18181b",
      paper: "#262626",
    },
    text: {
      primary: "#e2e8f0", //text-slate-200
      secondary: "#94a3b8", //text-slate-400
      disabled: "#64748b", //text-slate-500
      hint: "#64748b", //text-slate-500
    },
    divider: "#404040",
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Noto Sans SC"',
      '"Helvetica Neue"',
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    htmlFontSize: 16,
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    subtitle2: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      fontSize: "1rem",
    },
  },
  overrides: {
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
          transform: "translateX(16px)",
          color: "#fff",
          "& + $track": {
            opacity: 1,
            border: "none",
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: "1px solid #bdbdbd",
        backgroundColor: "#fafafa",
        opacity: 1,
        transition:
          "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
  },
  shape: {
    borderRadius: 16,
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  breakpoints: breakPoints,
})

export const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#0284c7",
    },
    secondary: {
      main: "#dc2626",
    },
    background: {
      paper: "#fafafa",
      default: "#f1f5f9",
    },
    text: {
      primary: "#0f172a", //text-slate-900
      secondary: "#334155", //text-slate-700
      disabled: "#94a3b8", //text-slate-400
      hint: "#94a3b8", //text-slate-400
    },
    error: {
      main: "#dc2626",
    },
    warning: {
      main: "#f97316",
    },
    success: {
      main: "#16a34a",
    },
    info: {
      main: "#0284c7",
    },
    divider: "#e5e5e5",
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Noto Sans SC"',
      '"Helvetica Neue"',
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    htmlFontSize: 16,
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    subtitle2: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      fontSize: "1rem",
    },
  },
  overrides: {
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
          transform: "translateX(16px)",
          color: "#fff",
          "& + $track": {
            opacity: 1,
            border: "none",
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: "1px solid #bdbdbd",
        backgroundColor: "#fafafa",
        opacity: 1,
        transition:
          "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
  },
  shape: {
    borderRadius: 16,
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  breakpoints: breakPoints,
})
