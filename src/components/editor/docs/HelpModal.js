import React from "react"
import { Flex, Box } from "rebass"
import { withStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import { SaveButton } from "styles/EditablePageStyles"

function getModalStyle() {
  return {
    top: "15%",
    margin: "auto",
  }
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: "5px",
    backgroundColor: "#faf9f9",
  },
})

const HelpMuiModal = props => {
  return (
    <Modal open={props.helpModalOpen} style={{ justifyContent: "center" }}>
      <div style={getModalStyle()} className={props.classes.paper}>
        <Flex justify="center" direction="column">
          <Box w={"100%"}>
            <center>
              <h1>Editor Help</h1>
            </center>
          </Box>
          <Box w={"100%"}>
            <p>
              <h3>Keyboard Shortcuts:</h3>
            </p>
            <p>
              <Flex wrap>
                <Box w="50%">
                  <strong>Bold</strong>
                </Box>
                <Box w="50%">CTRL + B</Box>
                <Box w="50%">
                  <em>Italic</em>
                </Box>
                <Box w="50%">CTRL + I</Box>
                <Box w="50%">
                  <strike>Strikethrough</strike>
                </Box>
                <Box w="50%">CTRL + D</Box>
                <Box w="50%">
                  <u>Underline</u>
                </Box>
                <Box w="50%">CTRL + U</Box>
              </Flex>
            </p>
            <p>
              <h3>Pasting Content</h3>
            </p>
            <p>
              Most content from HTML pages can be copied and pasted directly
              into the editor like this:
            </p>
            <p>(insert gif here)</p>
            <p>
              Links can easily be added by highlighting text and pasting a URL.
            </p>
            <p>Images can be added by copying and pasting an image URL.</p>
            <p>
              Videos can be added by copying and pasting the video URL (either
              YouTube or Vimeo).
            </p>
            <SaveButton
              style={{
                width: "50%",
                color: "#fff",
              }}
              onClick={props.handleClose}>
              Close
            </SaveButton>
          </Box>
        </Flex>
      </div>
    </Modal>
  )
}

const HelpModal = withStyles(styles)(HelpMuiModal)

export default HelpModal
