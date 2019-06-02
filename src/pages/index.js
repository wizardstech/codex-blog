import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Markdown from '../components/Markdown';

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <ul>
      {data.allStrapiArticle.edges.map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/articles/${document.node.strapiId}`}>{document.node.title}</Link>
          </h2>
          <Markdown source={document.node.content} excerpt />
        </li>
      ))}
    </ul>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    allStrapiArticle {
      edges {
        node {
          id
          title
          content
          strapiId
        }
      }
    }
  }
`
