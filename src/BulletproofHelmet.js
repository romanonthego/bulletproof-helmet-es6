import React, {PureComponent, PropTypes} from 'react'
import Helmet from 'react-helmet'
import metaOrNull from './utils/metaOrNull'
import companySchema from './utils/schemas/company'
import websiteSchema from './utils/schemas/website'

export default class BulletproofHelmet extends PureComponent {
  static propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: React.PropTypes.string,
    url: React.PropTypes.string,

    // schema.org schemas.
    schemas: PropTypes.arrayOf(PropTypes.string),
    website: PropTypes.shape({
      name: PropTypes.string.isRequired,
      alternateName: PropTypes.string,
      url: PropTypes.string.isRequired,
      searchUrl: PropTypes.string,
    }),
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      sameAs: PropTypes.arrayOf(PropTypes.string),
    }),

    // favicons etc
    appleTouchIconsRoot: PropTypes.string,
    chromeIconsRoot: PropTypes.string,
    msTileIconsRoot: PropTypes.string,
    faviconsManifestUrl: PropTypes.string,

    // rest - ms tile colors, verifications etc
    tileColor: PropTypes.string,
    tileImage: PropTypes.string,
    themeColor: PropTypes.string,
    googleSiteVerification: PropTypes.string,
    yandexVerification: PropTypes.string,
    facebookAdmins: PropTypes.string,
    facebookAppId: PropTypes.string,

    // support native helmet attributes
    link: PropTypes.array,
    script: PropTypes.array,
    meta: PropTypes.array,

    // socials
    openGraph: PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      imageWidth: PropTypes.number,
      imageHeight: PropTypes.number,
      type: PropTypes.string,
      // url: PropTypes.string,
      siteName: PropTypes.string,
    }),

    twitterCard: PropTypes.shape({
      cardType: PropTypes.string, // 'summary_large_image',
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.image,
      siteHandler: PropTypes.string,
      creatorHandler: PropTypes.string,
    }),

    // default Helmet props
    meta: PropTypes.array,
    script: PropTypes.array,
    link: PropTypes.array,
  }

  // default arrays of props.
  // needed for destructuring into props that passed down
  static defaultProps = {
    meta: [],
    script: [],
    link: [],
    schemas: [],
  }

  buildMeta() {
    const {
      description,
      tileColor,
      tileImage,
      themeColor,
      googleSiteVerification,
      yandexVerification,
    } = this.props

    return [
      metaOrNull('description', description),
      metaOrNull('msapplication-TileImage', tileImage),
      metaOrNull('msapplication-TileColor', tileColor),
      metaOrNull('themeColor', themeColor),
      metaOrNull('google-site-verification', googleSiteVerification),
      metaOrNull('yandex-verification', yandexVerification),
      ...this.buildOpenGraph(),
      ...this.buildTwitterCard(),
    ].filter(meta => meta !== null)
  }

  buildTwitterCard() {
    const {
      twitterCard: {
        cardType = 'summary_large_image',
        title,
        description,
        image,
        siteHandler,
        creatorHandler,
      } = {},
    } = this.props

    return [
      metaOrNull('twitter:title', title || this.props.title),
      metaOrNull('twitter:description', description || this.props.description),
      metaOrNull('twitter:image', image || this.props.image),
      metaOrNull('twitter:card', cardType, image || this.props.image),
      metaOrNull('twitter:site', siteHandler),
      metaOrNull('twitter:creator', creatorHandler),
    ]
  }

  buildOpenGraph() {
    const {
      openGraph: {
        title,
        description,
        image,
        imageWidth = 1200,
        imageHeight = 630,
        type = 'article',
        siteName,
      } = {},
    } = this.props

    return [
      metaOrNull('og:title', title || this.props.title),
      metaOrNull('og:description', description || this.props.description),
      metaOrNull('og:image', image || this.props.image),
      metaOrNull('og:image:width', imageWidth, image || this.props.image),
      metaOrNull('og:image:height', imageHeight, image || this.props.image),
      metaOrNull('og:type', type),
      metaOrNull('og:site', siteName),
    ]
  }

  buildLink() {
    const {
      appleTouchIconsRoot,
      chromeIconsRoot,
      // msTileIconsRoot,
      faviconsManifestUrl,
    } = this.props

    return [
      ...(appleTouchIconsRoot ? this.buildAppleTouchIcons() : []),
      ...(chromeIconsRoot ? this.buildChromeIcons() : []),
      // ...(msTileIconsRoot ? this.buildMsTileIcons() : []),
      (faviconsManifestUrl ? {rel: 'manifest', href: `${faviconsManifestUrl}`} : null),
    ].filter(l => l !== null)
  }

  buildAppleTouchIcons() {
    const {
      appleTouchIconsRoot,
    } = this.props

    const sizesList = [
      57,
      60,
      72,
      76,
      114,
      120,
      144,
      152,
      180,
    ]

    return sizesList.map(s => ({
      rel: 'apple-touch-icon',
      sizes: `${s}x${s}`,
      href: `${appleTouchIconsRoot}apple-touch-icon-${s}x${s}.png`,
    }))
  }

  buildChromeIcons() {
    const {
      chromeIconsRoot,
    } = this.props

    const sizesList = [
      144,
      192,
      36,
      48,
      72,
      96,
    ]

    return sizesList.map(s => ({
      rel: 'icon',
      type: 'image/png',
      sizes: `${s}x${s}`,
      href: `${chromeIconsRoot}android-chrome-${s}x${s}.png`,
    }))
  }

  // buildMsTileIcons() {
  //   const {
  //     msTileIconsRoot,
  //   } = this.props


  // }

  buildScript() {
    const {
      schemas,
      website,
      company,
    } = this.props

    return [
      (company ? companySchema(company) : null),
      (website ? websiteSchema(website) : null),
      ...schemas,
    ].filter(schema => schema !== null)
  }

  render() {
    // prevent this props going into native Helmet
    const {
      title,
      meta,
      script,
      link,
      /* eslint-disable no-unused-vars */
      description,
      image,
      url,
      schemas,
      website,
      company,
      appleTouchIconsRoot,
      chromeIconsRoot,
      faviconsManifestUrl,
      tileColor,
      tileImage,
      themeColor,
      googleSiteVerification,
      yandexVerification,
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props

    const composedProps = {
      title,
      meta: [
        ...this.buildMeta(),
        ...meta,
      ],
      script: [
        ...this.buildScript(),
        ...script,
      ],
      link: [
        ...this.buildLink(),
        ...link,
      ],
    }

    return (
      <Helmet {...composedProps} {...otherProps} />
    )
  }
}
