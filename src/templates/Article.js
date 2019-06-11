import React from 'react'
import { graphql } from 'gatsby'
import { shape, string, arrayOf, number } from 'prop-types'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Markdown from '../components/Markdown'
import AuthorLink from '../components/AuthorLink'
import Tag from '../components/Tag'
import Link from '../components/Link'
import slugify from '../helpers/slugify'
import styles from './Article.module.scss'

const ArticleTemplate = ({ data }) => {
  const { title, author, content, tags = [], category } = data.strapi.article

  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
      <AuthorLink author={author} />
      <p>
        category:{' '}
        {category ? (
          <Link to={`/categories/${slugify(category.name)}`}>{category.name}</Link>
        ) : (
          'unclassified'
        )}
      </p>
      <Markdown source={content} />
      <div className={styles.tags}>
        {tags.map(({ id, name }) => (
          <span className={styles.tag} key={`tags-${id}`}>
            <Tag name={name} />
          </span>
        ))}
      </div>
    </Layout>
  )
}

ArticleTemplate.propTypes = {
  data: shape({
    strapi: shape({
      article: shape({
        title: string.isRequired,
        author: shape({}),
        content: string.isRequired,
        tags: arrayOf(shape({})),
        category: shape({
          id: number.isRequired,
          name: string.isRequired,
        }),
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: ID!) {
    strapi {
      article(id: $id) {
        title
        content
        author {
          id
          username
        }
        tags {
          id
          name
        }
        category {
          id
          name
        }
      }
    }
  }
`
