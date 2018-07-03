// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Flex, Box } from "rebass"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"
import FontAwesome from "react-fontawesome"
import PageEditor from "components/editor/PageEditor"
import HelpModal from "components/editor/docs/HelpModal"
import ScrollButton from "components/common/ScrollButton"
import { saveEditing, cancelEditing } from "actions/editablePages"
import { EditorStyle } from "styles/EditablePageStyles"
import { NAMESPACE } from "constants/namespace"

const styles = theme => ({
  scrollButton: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  helpButton: {
    position: "fixed",
    bottom: theme.spacing.unit * 10,
    right: theme.spacing.unit * 3,
  },
})

type Props = {
  /** React Router's match object */
  match: Object,
  /** action creator to cancel editing */
  cancelEditing: Function,
  /** the user's ID number */
  id: string,
  /** value for who last updated the page */
  updated_by: string,
  /** action creator to save page content */
  saveEditing: Function,
  /** The object holding the fetched page content */
  page: Object,
  /** Styling classes from Material-UI */
  classes: Object,
}

type State = {
  /** Boolean for whether help modal is open or not */
  helpModalOpen: boolean,
}

/**
 * Allows page editing
 */

class EditInfoPage extends Component<Props, State> {
  state = {
    helpModalOpen: false,
  }

  handleClick = () => {
    this.setState({ helpModalOpen: true })
  }

  handleClose = () => {
    this.setState({ helpModalOpen: false })
  }

  render() {
    return (
      <Flex justify="center">
        <Box w={["90%", "90%", "90%", "65%"]}>
          <EditorStyle>
            <PageEditor page={this.props.page} match={this.props.match} />
          </EditorStyle>
        </Box>
        <Box>
          <Tooltip title="Editor Help">
            <Button
              onClick={this.handleClick}
              variant="fab"
              color="primary"
              className={this.props.classes.helpButton}>
              <FontAwesome name="question" />
            </Button>
          </Tooltip>
          <ScrollButton
            className={this.props.classes.scrollButton}
            scrollStepInPx={50}
            delayInMs={5}
          />
        </Box>
        <Box />
        {this.state.helpModalOpen && (
          <HelpModal
            helpModalOpen={this.state.helpModalOpen}
            handleClose={this.handleClose}
            onClick={() => window.scrollTo(0, 0)}
          />
        )}
      </Flex>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const slugName = `${NAMESPACE}-${ownProps.match.params.name}`
  return {
    page: state.editablePages[slugName],
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, { saveEditing, cancelEditing })(EditInfoPage),
)
