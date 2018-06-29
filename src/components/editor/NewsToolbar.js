import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FontAwesome from "react-fontawesome"
import MARKS from "components/editor/constants/marks"
import {
  ToolbarButton,
  ToolBar as ToolbarContainer,
} from "styles/EditablePageStyles"

const NewsToolbar = props => {
  const hasMark = type => {
    const { value } = props
    return value.activeMarks.some(mark => mark.type === type)
  }

  const onClickMark = (e, type) => {
    e.preventDefault()
    const { value } = props
    const change = value.change().toggleMark(type)

    props.onChange(change)
  }

  const renderMarkButton = (type, title) => {
    const isActive = hasMark(type)
    const onMouseDown = e => onClickMark(e, type)

    let Tag

    switch (type) {
      case MARKS.BOLD:
        Tag = (
          <ToolbarButton>
            <FontAwesome name="bold" />
          </ToolbarButton>
        )
        break
      case MARKS.ITALIC:
        Tag = (
          <ToolbarButton>
            <FontAwesome name="italic" />
          </ToolbarButton>
        )
        break
      case MARKS.UNDERLINE:
        Tag = (
          <ToolbarButton>
            <FontAwesome name="underline" />
          </ToolbarButton>
        )
        break
      case MARKS.STRIKETHROUGH:
        Tag = (
          <ToolbarButton>
            <FontAwesome name="strikethrough" />
          </ToolbarButton>
        )
        break
      case MARKS.CODE:
        Tag = (
          <ToolbarButton>
            <FontAwesome name="code" />
          </ToolbarButton>
        )
        break
      default:
        return null
    }

    return (
      <Tooltip id={`tooltip-block-${type}`} title={title} placement="bottom">
        <span onMouseDown={onMouseDown} data-active={isActive}>
          {Tag}
        </span>
      </Tooltip>
    )
  }

  return (
    <ToolbarContainer>
      {renderMarkButton(MARKS.BOLD, "⌘ + b")}
      {renderMarkButton(MARKS.ITALIC, "⌘ + i")}
      {renderMarkButton(MARKS.UNDERLINE, "⌘ + u")}
      {renderMarkButton(MARKS.STRIKETHROUGH, "⌘ + d")}
    </ToolbarContainer>
  )
}

export default NewsToolbar
