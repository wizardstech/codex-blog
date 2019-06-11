import React from 'react'
import { graphql } from 'gatsby'
import Typography from '@material-ui/core/Typography'
import { shape, arrayOf, string } from 'prop-types'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ArticleList from '../components/ArticleList'

const title = 'Wizards Technologies - Codex'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title={title} />
    <Typography variant="srOnly">
      <h1>{title}</h1>
    </Typography>
    <ArticleList articles={data.strapi.articles} />
  </Layout>
)

IndexPage.propTypes = {
  data: shape({
    strapi: shape({
      articles: arrayOf(
        shape({
          node: shape({
            title: string.isRequired,
            content: string.isRequired,
          }).isRequired,
        })
      ),
    }).isRequired,
  }).isRequired,
}

export default IndexPage

export const query = graphql`
  query {
    strapi {
      articles {
        title
        content
      }
    }
  }
`
