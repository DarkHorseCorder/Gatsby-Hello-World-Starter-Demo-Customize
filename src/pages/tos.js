import React from "react"
import Layout from "../layouts"
import TOS from "../layouts/TOS"
import {  graphql } from 'gatsby'

export default function TosPage({data}) {
  return <>
    <Layout title={data.site.siteMetadata.title} lang="en">
      <TOS lang="en" data={data.allPrismicTos.edges[0].node.data.tos_content_group}/>
    </Layout>
  </>
}

export const query = graphql`
query TOSPageQuery {
  site {
    siteMetadata {
      title
      description
    }
  }
  allPrismicTos(filter: {lang: {eq: "en-us"}}) {
    edges {
      node {
        data {
          tos_content_group {
            tos_content {
              raw
            }
          }
        }
      }
    }
  }
}
`