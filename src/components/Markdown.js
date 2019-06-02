import React from 'react';
import { bool } from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Markdown = props => {
  const { excerpt, source } = props;
  return (
    <ReactMarkdown
    {...props}
      source={excerpt ? source.substring(0, 200).concat('...') : source}
      escapeHTML={false}
    />
  );
}

Markdown.propTypes = {
  ...ReactMarkdown.propTypes,
  excerpt: bool
};

Markdown.defaultProps = {
  excerpt: false
};

export default Markdown;
