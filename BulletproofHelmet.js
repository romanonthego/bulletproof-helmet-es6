import React, {PureComponent, PropTypes} from 'react'
import Helmet from 'react-helmet'

export default class BulletproofHelmet extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: React.PropTypes.string,
    url: React.PropTypes.string,
  }

  render() {
    const {
      title,
    } = this.props

    const composedProps = {
      title,
    }

    return (
      <Helmet {...composedProps} />
    )
  }
}
