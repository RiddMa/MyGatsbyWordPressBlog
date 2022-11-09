import { init } from "@rematch/core"
import { count, isDesktop, useDarkMode } from "./model";

const store = init({
  models: {
    count: count,
    useDarkMode: useDarkMode,
    isDesktop: isDesktop,
  },
})

export default store
