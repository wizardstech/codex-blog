import React from 'react'
import { arrayOf, string, shape } from 'prop-types'
import { Link } from 'gatsby'

import Markdown from './Markdown'
import slugify from '../helpers/slugify'

const ArticleList = ({ articles }) => {
  console.log('articles', articles)
  return (
    <ul>
      {articles.map(article => (
        <li key={article.title}>
          <h2>
            <Link to={`/articles/${slugify(article.title)}`}>{article.title}</Link>
          </h2>
          <Markdown source={article.content} excerpt />
        </li>
      ))}
    </ul>
  )
}

ArticleList.propTypes = {
  articles: arrayOf(
    shape({
      title: string.isRequired,
      content: string.isRequired,
    })
  ),
}

ArticleList.defaultProps = {
  articles: [],
}

export default ArticleList
