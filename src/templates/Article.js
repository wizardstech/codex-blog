import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Markdown from '../components/Markdown';

const ArticleTemplate = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.strapiArticle.title} />
      <h1>{data.strapiArticle.title}</h1>
      <p>by <Link to={`/authors/${data.strapiArticle.author.id}`}>{data.strapiArticle.author.username}</Link></p>
      <Markdown source={data.strapiArticle.content} />
    </Layout>
  );
}

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: {eq: $id}) {
      title
      content
      author {
        id
        username
      }
    }
  }
`
