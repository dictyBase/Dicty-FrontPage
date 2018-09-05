import { isMod } from "components/editor/tools/isMod"
import { boldMarkStrategy } from "./BoldUtils"

const BoldKeyboardShortcut = (event, change) => {
  if (isMod(event) && event.key === "b") return boldMarkStrategy(change)
  return
}

export default BoldKeyboardShortcut
