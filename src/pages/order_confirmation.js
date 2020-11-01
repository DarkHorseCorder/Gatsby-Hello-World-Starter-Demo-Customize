import React from "react"
import Layout from "../layouts"
import OrderConfirmation from "../layouts/OrderConfirmation"
import {  withPrefix, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

export default function OrderConfirmationPage({data}) {
  return <>
  <Helmet>
     
    <script type="text/javascript" src={withPrefix("js/common/page_init.js")}></script>
    
    <script type="text/javascript" src={withPrefix("js/base.js")}></script>
    <script type="text/javascript" src='js/order_confirmation.js'></script>
  </Helmet>
  <Layout title={data.site.siteMetadata.title} lang="en">
    <OrderConfirmation lang="en" />
  </Layout>
  </>
}

export const query = graphql`
  query OrderConfirmationPageQuery {
    site {
      siteMetadata {
        title,
        description
      }
    }
  }
`