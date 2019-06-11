import React from 'react'
import { graphql } from 'gatsby'
import { shape, arrayOf, string } from 'prop-types'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ArticleList from '../components/ArticleList'

const CategoryTemplate = ({ data }) => {
  const { name, articles } = data.strapi.category
  return (
    <Layout>
      <SEO title={`Category | ${name}`} />
      <h1>{name}</h1>
      <ArticleList articles={articles} />
    </Layout>
  )
}

CategoryTemplate.propTypes = {
  data: shape({
    strapi: shape({
      tag: shape({
        name: string.isRequired,
        articles: arrayOf(shape({})),
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default CategoryTemplate

export const query = graphql`
  query CategoryTemplate($id: ID!) {
    strapi {
      category(id: $id) {
        name
        articles {
          title
          content
        }
      }
    }
  }
`
