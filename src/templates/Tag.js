import React from 'react'
import { graphql } from 'gatsby'
import { shape, arrayOf, string } from 'prop-types'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ArticleList from '../components/ArticleList'

const TagTemplate = ({ data }) => {
  const { name, articles } = data.strapi.tag
  return (
    <Layout>
      <SEO title={`Tag | ${name}`} />
      <h1>{name}</h1>
      <ArticleList articles={articles} />
    </Layout>
  )
}

TagTemplate.propTypes = {
  data: shape({
    strapi: shape({
      tag: shape({
        name: string.isRequired,
        articles: arrayOf(shape({})),
      }).isRequired,
    }),
  }).isRequired,
}

export default TagTemplate

export const query = graphql`
  query TagTemplate($id: ID!) {
    strapi {
      tag(id: $id) {
        name
        articles {
          title
          content
        }
      }
    }
  }
`
