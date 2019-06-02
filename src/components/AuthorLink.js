import React from 'react'
import { number, string, shape } from 'prop-types'

import Link from './Link'
import slugify from '../helpers/slugify'

const AuthorLink = ({ author }) =>
  author ? (
    <>
      by <Link to={`/authors/${slugify(author.username)}`}>{author.username}</Link>
    </>
  ) : null

AuthorLink.propTypes = {
  author: shape({
    id: number.isRequired,
    username: string.isRequired,
  }),
}

AuthorLink.defaultProps = {
  author: null,
}

export default AuthorLink
