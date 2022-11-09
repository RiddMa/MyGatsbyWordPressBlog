import { breakPoints } from "../../css/theme"

export const count = {
  state: 0, // initial state
  reducers: {
    // handle state changes with pure functions
    increment(state, payload) {
      return state + payload
    },
  },
  effects: dispatch => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      dispatch.count.increment(payload)
    },
  }),
}

export const useDarkMode = {
  state: false,
  reducers: {
    toggleVariable(state, payload) {
      return payload
    },
  },
  effects: dispatch => ({
    setDarkMode(payload) {
      dispatch.useDarkMode.toggleVariable(payload)
      if (payload) {
        document.getElementById("___gatsby").classList.add("dark")
      } else {
        document.getElementById("___gatsby").classList.remove("dark")
      }
    },
    syncDarkMode(payload, rootState) {
      if (rootState.useDarkMode) {
        document.getElementById("___gatsby").classList.add("dark")
      } else {
        document.getElementById("___gatsby").classList.remove("dark")
      }
    },
  }),
}

export const isDesktop = {
  state: true,
  reducers: {
    setVariable(state, payload) {
      return payload >= breakPoints.values.lg
    },
  },
  effects: dispatch => ({
    setIsDesktop(payload) {
      dispatch.isDesktop.setVariable(payload)
      if (payload) {
      } else {
      }
    },
    syncIsDesktop(payload, rootState) {
      if (rootState.isDesktop) {
      } else {
      }
    },
  }),
}
