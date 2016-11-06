import React, {PureComponent, PropTypes} from 'react'
import Helmet from 'react-helmet'
import companySchema from './utils/schemas/company'
import websiteSchema from './utils/schemas/website'

export default class BulletproofHelmet extends PureComponent {
  static propTypes = {
    // baseURL: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string.isRequired,
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
      {name: 'description', content: description},
      (tileColor ? {name: 'msapplication-TileColor', content: tileColor} : null),
      (tileImage ? {name: 'msapplication-TileImage', content: tileImage} : null),
      (themeColor ? {name: 'theme-color', content: themeColor} : null),
      (googleSiteVerification ? {name: 'google-site-verification', content: `${googleSiteVerification}`} : null),
      (yandexVerification ? {name: 'yandex-verification', content: `${yandexVerification}`} : null),
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
      (title || this.props.title ? {name: 'twitter:title', content: title || this.props.title} : null),
      {name: 'twitter:card', content: cardType},
      (description || this.props.description ?
        {name: 'twitter:description', content: description || this.props.description} : null),
      (image || this.props.image ? {name: 'twitter:image', content: image || this.props.image} : null),
      (siteHandler ? {name: 'twitter:site', content: siteHandler} : null),
      (creatorHandler ? {name: 'twitter:creator', content: creatorHandler}: null),
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
      (title || this.props.title ? {name: 'og:title', content: title || this.props.title} : null),
      (description || this.props.description ? {name: 'og:description', content: description || this.props.description} : null),
      (image || this.props.image ? {name: 'og:image', content: image || this.props.image} : null),
      (image || this.props.image ? {name: 'og:image:width', content: imageWidth} : null),
      (image || this.props.image ? {name: 'og:image:height', content: imageHeight} : null),
      {name: 'og:type', content: type},
      (siteName ? {name: 'og:site_name', content: siteName} : null),
    ]
  }

  buildLink() {
    const {
      appleTouchIconsRoot,
      chromeIconsRoot,
      faviconsManifestUrl,
    } = this.props

    return [
      ...(appleTouchIconsRoot ? this.buildAppleTouchIcons : []),
      ...(chromeIconsRoot ? this.buildChromeIcons : []),
      (faviconsManifestUrl ? {rel: 'manifest', href: `${faviconsManifestUrl}`} : null),
    ].filter(l => l !== null)
  }

  buildAppleTouchIcons() {
    const {
      appleTouchIconsRoot,
    } = this.props

    const sizesList = [
      '57x57',
      '60x60',
      '72x72',
      '76x76',
      '114x114',
      '120x120',
      '144x144',
      '152x152',
      '180x180',
    ]

    return sizesList.map(s => ({
      rel: 'apple-touch-icon',
      sizes: s,
      href: `${appleTouchIconsRoot}/apple-touch-icon-${s}.png`
    }))
  }

  buildChromeIcons() {
    const {
      chromeIconsRoot,
    } = this.props

    return [
      {rel: 'icon', type: 'image/png', sizes: '16x16', href: `${chromeIconsRoot}/favicon-16x16.png`},
      {rel: 'icon', type: 'image/png', sizes: '32x32', href: `${chromeIconsRoot}/favicon-32x32.png`},
      {rel: 'icon', type: 'image/png', sizes: '96x96', href: `${chromeIconsRoot}/favicon-96x96.png`},
      {rel: 'icon', type: 'image/png', sizes: '192x192', href: `${chromeIconsRoot}/android-chrome-192x192.png`},
    ]
  }

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
