// @flow
import React, { Component } from "react"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"
import FontAwesome from "react-fontawesome"

type Props = {
  /** Styling passed from Material-UI theme */
  className: string,
  /** Number of pixels to scroll */
  scrollStepInPx: number,
  /** Delay (in milliseconds) used for scrolling */
  delayInMs: number,
}

type State = {
  /** Unique identifier for the interval ID */
  intervalId: number,
}

class ScrollButton extends Component<Props, State> {
  state = {
    intervalId: 0,
  }

  scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId)
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx)
  }

  scrollToTop = () => {
    let intervalId = setInterval(this.scrollStep, this.props.delayInMs)
    this.setState({ intervalId: intervalId })
  }

  render() {
    return (
      <Tooltip title="Go to top of page">
        <Button
          className={this.props.className}
          onClick={this.scrollToTop}
          variant="fab"
          color="secondary">
          <FontAwesome name="arrow-up" />
        </Button>
      </Tooltip>
    )
  }
}

export default ScrollButton