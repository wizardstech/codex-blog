import React from 'react'
import { graphql } from 'gatsby'
import { string, shape, arrayOf } from 'prop-types'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ArticleList from '../components/ArticleList'

const UserTemplate = ({ data }) => {
  const { username, articles } = data.strapi.user

  return (
    <Layout>
      <SEO title={username} />
      <h1>{username}</h1>
      <ArticleList articles={articles} />
    </Layout>
  )
}

UserTemplate.propTypes = {
  data: shape({
    strapi: shape({
      user: shape({
        username: string.isRequired,
        articles: arrayOf(
          shape({
            title: string.isRequired,
            content: string.isRequired,
          })
        ),
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default UserTemplate

export const query = graphql`
  query UserTemplate($id: ID!) {
    strapi {
      user(id: $id) {
        username
        articles {
          title
          content
        }
      }
    }
  }
`
