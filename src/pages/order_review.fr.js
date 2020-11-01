import React from "react"
import Layout from "../layouts"
import OrderReview from "../layouts/OrderReview"
import { withPrefix, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import "../components/shop"

export default function OrderReviewPage({ data }) {
  return <>
    <Helmet>
      <link rel="stylesheet" type="text/css" href="https://ws1.postescanada-canadapost.ca/css/addresscomplete-2.30.min.css?key=JH73-CY14-ZK13-GG77" />
      <script
        src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossOrigin="anonymous"
      />
      <script type="text/javascript" src={withPrefix("js/common/page_init.js")}></script>
      <script type="text/javascript" src={withPrefix("js/order_review.js")}></script>

      <script type="text/javascript" src={withPrefix("https://ws1.postescanada-canadapost.ca/js/addresscomplete-2.30.min.js")}></script>
      <script type="text/javascript" src={withPrefix("js/base.js")}></script>
    </Helmet>
    <Layout title={data.site.siteMetadata.title} lang="fr">
      <OrderReview lang="fr"/>
    </Layout>
  </>
}

export const query = graphql`
  query OrderReviewFRPageQuery {
    site {
      siteMetadata {
        title,
        description
      }
    }
  }
`