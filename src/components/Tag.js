import React from 'react'
import { string } from 'prop-types'
import Chip from '@material-ui/core/Chip'

import Link from './Link'
import slugify from '../helpers/slugify'

const Tag = ({ name }) => (
  <Link to={`/tags/${slugify(name)}`}>
    <Chip label={name} clickable />
  </Link>
)

Tag.propTypes = {
  name: string.isRequired,
}

export default Tag
