import PropTypes from 'prop-types'
import styled from 'styled-components'

const Link = styled.a`
  color: inherit;
  font-weight: ${props => (props.normal ? 'normal' : 'bold')};

  &:hover {
    color: inherit;
  }
`

Link.propTypes = {
  normal: PropTypes.bool,
}

Link.defaultProps = {
  rel: 'noopener noreferrer',
  target: 'blank',
}

export default Link
