// @flow
import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Flex, Box } from "rebass"
import Skeleton from "react-loading-skeleton"
import NewsEditor from "components/editor/NewsEditor"
import { fetchNews } from "actions/news"
import { ListItems, MainContent } from "styles"

type Props = {
  /** Represents whether component is loading or not */
  isFetching: boolean,
  /** The object holding the fetched page content */
  page: Object,
  /** The slugname used to fetch content from the API server */
  slug: string,
  /** Action to fetch news content from API server */
  fetchNews: Function,
  /** Object representing auth part of state */
  auth: Object,
}

/** This component is for individual news items on the frontpage.
 *  It accepts a slugname as a prop and uses that to fetch the corresponding data.
 */

class NewsItem extends PureComponent<Props> {
  static defaultProps = {
    page: {
      data: {
        attributes: {},
      },
    },
  }

  componentDidMount() {
    this.props.fetchNews(this.props.slug)
  }

  render() {
    const { isFetching, page } = this.props
    if (!isFetching && page.data.attributes.content) {
      return (
        <ListItems>
          <MainContent>
            <NewsEditor auth={this.props.auth} page={this.props.page} />
          </MainContent>
        </ListItems>
      )
    }
    return (
      <Flex>
        <Box width="100%">
          <br />
          <Skeleton count={3} />
          <br />
        </Box>
      </Flex>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const slugName = ownProps.slug
  return {
    auth: state.auth,
    isFetching: state.news.isFetching,
    page: state.news[slugName],
  }
}

export default connect(
  mapStateToProps,
  { fetchNews },
)(NewsItem)