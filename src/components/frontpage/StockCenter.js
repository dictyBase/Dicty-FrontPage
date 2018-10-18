// @flow
import React from "react"
import FontAwesome from "react-fontawesome"

import {
  StockTitle,
  StockHeader,
  StockSubHeader,
  ListBox,
  StockBox,
  AnnotationListItems,
  StockContainer,
  MoreLink,
  NewsStockTitle,
} from "styles"

type Props = {
  /** The Stock Center data in object form */
  stockcenter: Object,
}

/** Widget that displays the most recent plasmids and strains in the Stock Center */

const StockCenter = (props: Props) => {
  const plasmidlist = props.stockcenter.plasmids.map((plasmid, index) => (
    <AnnotationListItems key={index}>{plasmid}</AnnotationListItems>
  ))

  const strainlist = props.stockcenter.strains.map((strain, index) => (
    <AnnotationListItems key={index}>{strain}</AnnotationListItems>
  ))

  return (
    <StockContainer>
      <StockHeader>
        <FontAwesome name="shopping-cart fa-md" />
        <NewsStockTitle>DICTY STOCK CENTER</NewsStockTitle>
      </StockHeader>
      <StockSubHeader>
        <strong>New items</strong>
      </StockSubHeader>
      <StockBox color="#fff" background="#0073e6">
        <StockTitle>PLASMIDS</StockTitle>
        <ListBox margintop="5px" padbottom="0px">
          {plasmidlist}
        </ListBox>
        <MoreLink padbottom="0px">
          <FontAwesome name="plus fa-xs" />
        </MoreLink>
      </StockBox>
      <StockBox color="#242124" background="#80c1ff">
        <StockTitle>STRAINS</StockTitle>
        <ListBox margintop="5px" padbottom="0px">
          {strainlist}
        </ListBox>
        <MoreLink padbottom="0px">
          <FontAwesome name="plus fa-xs" />
        </MoreLink>
      </StockBox>
    </StockContainer>
  )
}

export default StockCenter
