import React, { Component } from "react"
import { Helmet } from "react-helmet"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import Citations from "./Citations"
import DownloadsTable from "./DownloadsTable"
import DownloadsHeader from "./DownloadsHeader"
import DownloadsLoader from "./DownloadsLoader"
import withDataFetching from "common/utils/withDataFetching"
import { fetchDownloadTabs, changeTab } from "common/actions/downloads"

// create theme with our standard tab overrides
const muiTheme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        textTransform: "none",
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: "#cce6ff",
        color: "#000",
      },
      indicator: {
        backgroundColor: "#80c1ff",
      },
    },
  },
})

/**
 * This displays the Dicty downloads page.
 */

class Downloads extends Component {
  handleChange = (event, value) => {
    const { changeTab } = this.props

    changeTab(value)
  }

  generateTabs = (json) => {
    const tabs = json.data.map((item) => (
      <Tab
        value={item.id}
        label={item.attributes.scientific_name}
        key={item.id}
      />
    ))
    return tabs
  }

  generateTabContainers = (json) => {
    const { downloads } = this.props

    const tabContent = json.data.map((item) => {
      if (item.id === json.currentTab) {
        return (
          <Typography component="div" key={item.id}>
            <Citations citations={item.attributes.citations} />
            {downloads[item.id] && (
              <DownloadsTable data={downloads[item.id].data} />
            )}
          </Typography>
        )
      }
      return null
    })
    return tabContent
  }

  render() {
    const { downloads } = this.props

    // return null until downloads data is not empty
    if (Object.entries(downloads).length === 0) {
      return null
    }

    return (
      <MuiThemeProvider theme={muiTheme}>
        <Helmet>
          <title>dictyBase Downloads</title>
          <meta
            name="description"
            content="dictyBase Downloads - the central collection of downloadable material from dictyBase"
          />
        </Helmet>
        <Grid container justify="center">
          <Grid item xs={8}>
            <DownloadsHeader />
            <AppBar position="static">
              <Tabs
                value={downloads.currentTab}
                onChange={this.handleChange}
                variant="scrollable"
                scrollButtons="auto">
                {this.generateTabs(downloads)}
              </Tabs>
            </AppBar>
            {this.generateTabContainers(downloads)}
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = ({ downloads }) => ({ downloads })

const DownloadsWithFetch = withDataFetching(
  fetchDownloadTabs,
  "downloads",
  DownloadsLoader,
)(Downloads)

export { Downloads }
export default connect(mapStateToProps, { changeTab })(DownloadsWithFetch)