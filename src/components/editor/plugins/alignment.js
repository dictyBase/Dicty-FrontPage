import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft"
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter"
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight"

import ToolbarButton from "../toolbar/ToolbarButton"

/**
 * Functions to set the alignment blocks.
 */
const alignmentMarkStrategy = (change, align) =>
  change.unwrapBlock("alignment").wrapBlock({
    type: "alignment",
    data: { align },
  })

const alignLeft = change => alignmentMarkStrategy(change, "left")
const alignCenter = change => alignmentMarkStrategy(change, "center")
const alignRight = change => alignmentMarkStrategy(change, "right")

/**
 * Rendering component that provides the actual HTML to use inside the editor.
 */
const AlignmentNode = ({ children, attributes, node: { data } }) => (
  <div style={{ textAlign: `${data.get("align")}` }} {...attributes}>
    {children}
  </div>
)

/**
 * Button components that use click handlers to connect the buttons to the editor.
 */
const AlignmentLeftButton = ({ value, onChange }) => (
  <Tooltip title="⌘ + shift + l" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => {
        onChange(alignmentMarkStrategy(value.change(), "left"))
      }}>
      <FormatAlignLeftIcon />
    </ToolbarButton>
  </Tooltip>
)

const AlignmentCenterButton = ({ value, onChange }) => (
  <Tooltip title="⌘ + shift + c" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => {
        onChange(alignmentMarkStrategy(value.change(), "center"))
      }}>
      <FormatAlignCenterIcon />
    </ToolbarButton>
  </Tooltip>
)

const AlignmentRightButton = ({ value, onChange }) => (
  <Tooltip title="⌘ + shift + r" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => {
        onChange(alignmentMarkStrategy(value.change(), "right"))
      }}>
      <FormatAlignRightIcon />
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that specifies the keyboard shortcuts to use for alignment.
 * It accepts event and change as arguments.
 */
const AlignmentKeyboardShortcut = (event, change) => {
  const keyLeft = event.key === "l"
  const leftFullKeyPress = event.metaKey && event.shiftKey && keyLeft
  if (leftFullKeyPress) {
    event.preventDefault()
    return alignLeft(change)
  }

  const keyCenter = event.key === "c"
  const centerFullKeyPress = event.metaKey && event.shiftKey && keyCenter
  if (centerFullKeyPress) {
    event.preventDefault()
    return alignCenter(change)
  }

  const keyRight = event.key === "r"
  const rightFullKeyPress = event.metaKey && event.shiftKey && keyRight
  if (rightFullKeyPress) {
    event.preventDefault()
    return alignRight(change)
  }

  return
}

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more to it in the future.
 */
const AlignmentPlugin = options => ({
  onKeyDown(...args) {
    return AlignmentKeyboardShortcut(...args)
  },
})

export {
  AlignmentPlugin,
  AlignmentNode,
  AlignmentLeftButton,
  AlignmentCenterButton,
  AlignmentRightButton,
}
