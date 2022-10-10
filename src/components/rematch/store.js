import { init } from "@rematch/core"
import { count, useDarkMode } from "./model"

const store = init({
  models: {
    count: count,
    useDarkMode: useDarkMode,
  },
})

export default store
