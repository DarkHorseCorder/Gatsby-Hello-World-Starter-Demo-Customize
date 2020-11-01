import React from "react"
import Layout from "../layouts"
import { graphql } from 'gatsby'
import TV from "../layouts/TV"
import { Helmet } from 'react-helmet'
import { withPrefix } from "gatsby"
import "../components/shop"

export default function TVPage({data}) {
  return <>
  <Helmet>
    <link rel="stylesheet" type="text/css" href="https://ws1.postescanada-canadapost.ca/css/addresscomplete-2.30.min.css?key=JH73-CY14-ZK13-GG77" />
     
    <script type="text/javascript" src={withPrefix("js/common/page_init.js")}></script>
    <script type="text/javascript" src={withPrefix("js/common/modal_init.js")}></script>
 
    <script type="text/javascript" src={withPrefix("https://ws1.postescanada-canadapost.ca/js/addresscomplete-2.30.min.js")}></script>
    <script type="text/javascript" src={withPrefix("js/base.js")}></script>
  </Helmet>
  <Layout title={data.site.siteMetadata.title} lang="fr">
    <TV intro={data.allPrismicHomeP.edges[0].node.data.intro_content[0]} section={data.allPrismicHomeP.edges[0].node.data.section}  lang="fr"/>
  </Layout>
  </>
}

export const query = graphql`
  query TVFRPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allPrismicHomeP(filter: {lang: {eq: "fr-fr"}, tags: {in: "tv"}}) {
      edges {
        node {
          data {
            section {
              title_desc
              sub_title {
                text
              }
              section_hero {
                url
              }
              section_desc
              section_content {
                text
              }
              main_title {
                text
              }
            }
            intro_content {
              start_price
              intro_title {
                text
              }
              intro_subtitle {
                text
              }
              intro_desc_lists {
                text
              }
              img_intro_hero {
                url
              }
            }
          }
        }
      }
    }
  }
`