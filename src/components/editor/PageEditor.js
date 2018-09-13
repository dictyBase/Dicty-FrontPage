// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { getEventTransfer, getEventRange } from "slate-react"
import { Value, type Change } from "slate"
import EditTable from "slate-edit-table"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"

// import Toolbar from "components/editor/Toolbar"
import EditorToolbar from "./toolbar/EditorToolbar"
import { insertImage } from "./plugins/image"
import { onPasteHtml, onPasteText } from "./utils/utils"
import { editPage, saveEditing, cancelEditing } from "actions/editablePages"
import { StyledEditor } from "styles/EditablePageStyles"
import placeholder from "./data/placeholder.json"

/** Import mark renderers */
import { BoldMark } from "./plugins/bold"
import { FontFamilyMark } from "./plugins/fontfamily"
import { ItalicMark } from "./plugins/italic"
import { StrikethroughMark } from "./plugins/strikethrough"
import { UnderlineMark } from "./plugins/underline"

/** Import node renderers */
import { AlignmentNode } from "./plugins/alignment"
import { DividerNode } from "./plugins/divider"
import { H1Node, H2Node, H3Node } from "./plugins/heading"
import { ImageNode } from "./plugins/image"
import { LinkNode } from "./plugins/link"
import {
  ListItemNode,
  OrderedListNode,
  UnorderedListNode,
} from "./plugins/list"
import { VideoNode } from "./plugins/video"

/** Import custom plugins */
import { AlignmentPlugin } from "./plugins/alignment"
import { BoldPlugin } from "./plugins/bold"
import { DividerPlugin } from "./plugins/divider"
import { HeadingPlugin } from "./plugins/heading"
import { ImagePlugin } from "./plugins/image"
import { ItalicPlugin } from "./plugins/italic"
import { LinkPlugin } from "./plugins/link"
import { ListPlugin } from "./plugins/list"
import { StrikethroughPlugin } from "./plugins/strikethrough"
import { UnderlinePlugin } from "./plugins/underline"
import { VideoPlugin } from "./plugins/video"

const styles = theme => ({
  buttonGrid: {
    marginRight: "8px",
    marginTop: "8px",
  },
  saveButton: {
    width: "100%",
    backgroundColor: "#15317e",
  },
  cancelButton: {
    width: "100%",
  },
})

/**
 * All of the plugins that go into our editor
 * These are generally keyboard shortcuts
 */
const plugins = [
  EditTable(),
  AlignmentPlugin(),
  BoldPlugin(),
  DividerPlugin(),
  HeadingPlugin(),
  ImagePlugin(),
  ItalicPlugin(),
  LinkPlugin(),
  ListPlugin(),
  StrikethroughPlugin(),
  UnderlinePlugin(),
  VideoPlugin(),
]

type markProps = {
  mark: Object,
}

/**
 * Necessary renderMark function that receives the mark type then renders the HTML
 * In our case, we are returning custom components
 */
export const renderMark = (props: markProps) => {
  const { mark } = props

  switch (mark.type) {
    case "bold":
      return <BoldMark {...props} />
    case "font-family":
      return <FontFamilyMark {...props} />
    case "italic":
      return <ItalicMark {...props} />
    case "strikethrough":
      return <StrikethroughMark {...props} />
    case "underline":
      return <UnderlineMark {...props} />

    default:
      return null
  }
}

type nodeProps = {
  node: Object,
  attributes: Object,
  children: any,
}

/**
 * Similar to renderMark above, except now we are working with nodes.
 */
export const renderNode = (props: nodeProps) => {
  const { node, attributes, children } = props
  switch (node.type) {
    case "alignment":
      return <AlignmentNode {...props} />
    case "divider":
      return <DividerNode {...props} />
    case "h1":
      return <H1Node {...props} />
    case "h2":
      return <H2Node {...props} />
    case "h3":
      return <H3Node {...props} />
    case "image":
      return <ImageNode {...props} />
    case "link":
      return <LinkNode {...props} />
    case "list-item":
      return <ListItemNode {...props} />
    case "unordered-list":
      return <UnorderedListNode {...props} />
    case "ordered-list":
      return <OrderedListNode {...props} />
    case "video":
      return <VideoNode {...props} />

    default:
      return <p {...attributes}>{children}</p>
  }
}

type Props = {
  /** The object holding the fetched page content */
  page: Object,
  /** Action to fetch page content from API server */
  fetchPage: Function,
  /** Action that saves page editor content to API server */
  saveEditing: Function,
  /** Action that cancels page editing and redirects to main route */
  cancelEditing: Function,
  /** Action creator to edit page content */
  editPage: Function,
  /** React Router's match object */
  match: Object,
  /** Whether the editor is in read-only mode or not */
  readOnly: boolean,
  /** ID of current logged in user */
  userId: string,
  /** Material-UI styling */
  classes: Object,
}

type State = {
  /** This is the initial value of the editable page content. */
  value: Object,
  /** Determines whether the editor is read only or not */
  readOnly: boolean,
}

/**
 * This is a reusable Slate page editor component.
 */

class PageEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    if (props.page) {
      this.state = {
        // Initial value of editor
        value: Value.fromJSON(JSON.parse(props.page.data.attributes.content)),
        readOnly: props.readOnly,
      }
    } else {
      this.state = {
        // set default value for any page route refreshing
        value: Value.fromJSON(placeholder),
        readOnly: props.readOnly,
      }
    }
  }

  onChange = ({ value }: Object) => {
    this.setState({ value })
  }

  onEdit = e => {
    e.preventDefault()
    this.setState({
      readOnly: false,
    })
    const { editPage, page, match } = this.props
    editPage(page.data.attributes.content, match.url)
  }

  onCancel = () => {
    const { value } = this.state
    this.setState({
      value,
      readOnly: true,
    })
    const { cancelEditing, match } = this.props
    cancelEditing(match.url.slice(0, -5))
  }

  // on save, save the value to the content API server
  onSave = () => {
    const { value } = this.state
    const { page, saveEditing, match, userId } = this.props

    const content = JSON.stringify(value.toJSON())

    const body = {
      id: page.data.id,
      data: {
        id: page.data.id,
        type: "contents",
        attributes: {
          updated_by: userId,
          content,
        },
      },
    }
    saveEditing(page.data.id, body, match.url)

    this.setState(value)
  }

  onPaste = (e: SyntheticEvent<>, change: Change) => {
    const transfer = getEventTransfer(e)
    const { type } = transfer
    switch (type) {
      case "text":
        return onPasteText(e, change)
      case "html":
        return onPasteHtml(e, change)
      default:
        break
    }
  }

  onDrop = (event, change, editor) => {
    const target = getEventRange(event, change.value)
    if (!target && event.type === "drop") return

    const transfer = getEventTransfer(event)
    const { type, files } = transfer

    if (type === "files") {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split("/")
        if (mime !== "image") continue

        reader.addEventListener("load", () => {
          editor.change(c => {
            c.call(insertImage, reader.result, target)
          })
        })

        reader.readAsDataURL(file)
      }
    }
  }

  render() {
    const { readOnly, value } = this.state
    const { classes } = this.props

    return (
      <div>
        {!readOnly && <EditorToolbar value={value} onChange={this.onChange} />}

        <StyledEditor
          value={value}
          onChange={this.onChange}
          onPaste={this.onPaste}
          onDrop={this.onDrop}
          renderMark={renderMark}
          renderNode={renderNode}
          readOnly={readOnly}
          plugins={plugins}
        />

        <Grid container justify="flex-end">
          <Grid item xs={2} className={classes.buttonGrid}>
            {!readOnly && (
              <Button
                className={classes.cancelButton}
                size="small"
                variant="contained"
                onClick={this.onCancel}>
                Cancel
              </Button>
            )}
          </Grid>
          <Grid item xs={2} className={classes.buttonGrid}>
            {!readOnly && (
              <Button
                className={classes.saveButton}
                size="small"
                variant="contained"
                color="primary"
                onClick={this.onSave}>
                Save
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  if (state.auth.user) {
    return {
      userId: state.auth.user.data.id,
    }
  }
  return {}
}

export default connect(
  mapStateToProps,
  { editPage, saveEditing, cancelEditing },
)(withStyles(styles)(PageEditor))
