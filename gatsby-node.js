/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')

const slugify = value => {
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;'
  const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------'
  const p = new RegExp(a.split('').join('|'), 'g')
  return value
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for article nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        return result
      })
    )
  })

class CollectionFactory {
  constructor({ graphql, createPage }) {
    this.graphql = graphql
    this.createPage = createPage
  }

  async fetch({ request, pathPrefix, slugProperty, entity }) {
    const { data } = await makeRequest(
      this.graphql,
      `
    {
      allStrapi${entity} {
        edges {
          node ${request}
        }
      }
    }
    `
    )
    data[`allStrapi${entity}`].edges.forEach(({ node }) => {
      this.createPage({
        path: `/${pathPrefix}/${slugify(node[slugProperty])}`,
        component: path.resolve(`src/templates/${entity}.js`),
        context: {
          id: node.id,
        },
      })
    })
  }
}

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  const collectionFactory = new CollectionFactory({ graphql, createPage })

  const getArticles = collectionFactory.fetch({
    entity: 'Article',
    pathPrefix: 'articles',
    slugProperty: 'title',
    request: `{
      id
      title
    }`,
  })

  const getAuthors = collectionFactory.fetch({
    entity: 'User',
    pathPrefix: 'authors',
    slugProperty: 'username',
    request: `{
      id
      username
    }`,
  })

  const getTags = collectionFactory.fetch({
    entity: 'Tag',
    pathPrefix: 'tags',
    slugProperty: 'name',
    request: `{
      id
      name
    }`,
  })

  getCategories = collectionFactory.fetch({
    entity: 'Category',
    pathPrefix: 'categories',
    slugProperty: 'name',
    request: `{
      id
      name
    }`,
  })

  // Queries for articles and authors nodes to use in creating pages.
  return Promise.all([getArticles, getAuthors, getTags])
}
