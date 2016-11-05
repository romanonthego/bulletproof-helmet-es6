import React, {PureComponent, PropTypes} from 'react'
import Helmet from 'react-helmet'

export default class BulletproofHelmet extends PureComponent {
  static propTypes = {
    // baseURL: PropTypes.string.isRequired,
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
    })
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
      cardType: PropTypes.string, //'summary_large_image',
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.image,
      siteHandler: PropTypes.string,
      creatorHandler: PropTypes.string,
    }),
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
        cardType = 'summary_large_image'
        title
        description
        image
        siteHandler
        creatorHandler
      }
    } = this.props

    if (!this.props.title || !this.props.description) {
      return []
    }

    return [
      {name: 'twitter:title', content: title || this.props.title},
      {name: 'twitter:card', content: cardType},
      {name: 'twitter:description': content: description || this.props.description},
      {name: 'twitter:image', content: image || this.props.image},
      (siteHandler ? {name: 'twitter:site', content: siteHandler} : null),
      {creatorHandler ? {name: 'twitter:creator', content: creatorHandler}: null},
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
      }
    } = this.props

    if (!this.props.title || !this.props.description) {
      return []
    }

    return [
      {name: 'og:title', content: title || this.props.title},
      {name: 'og:description', content: description || this.props.description},
      {name: 'og:image', content: image || this.props.image},
      {name: 'og:image:width', content: imageWidth},
      {name: 'og:image:height', content: imageHeight},
      {name: 'og:type', content: type},
      (siteName ? {name: 'og:site_name', content: siteName} : null),
    ]
  }

  buildLink() {
    const {
      appleTouchIconsRoot,
      chromeIconsRoot,
    } = this.props

    return [
      ...(appleTouchIconsRoot ? this.buildAppleTouchIcons : []),
      ...(chromeIconsRoot ? this.buildChromeIcons : []),
      ...(faviconsManifestUrl ? [{rel: 'manifest', href: `${faviconsManifestUrl}`}] : []),
    ]
  }

  buildAppleTouchIcons() {
    const {appleTouchIconsRoot} = this.props

    return [
      {rel: 'apple-touch-icon', sizes: '57x57', href: `${appleTouchIconRoot}/favicons/apple-touch-icon-57x57.png`},
      {rel: 'apple-touch-icon', sizes: '60x60', href: `${appleTouchIconRoot}/favicons/apple-touch-icon-60x60.png`},
      {rel: 'apple-touch-icon', sizes: '72x72', href: `${appleTouchIconRoot}/favicons/apple-touch-icon-72x72.png`},
      {rel: 'apple-touch-icon', sizes: '76x76', href: `${appleTouchIconRoot}/favicons/apple-touch-icon-76x76.png`},
      {rel: 'apple-touch-icon', sizes: '114x114', href: `${appleTouchIconRoot}/favicons/apple-touch-icon-114x114.png`},
      {rel: 'apple-touch-icon', sizes: '120x120', href: `${appleTouchIconRoot}/favicons/apple-touch-icon-120x120.png`},
      {rel: 'apple-touch-icon', sizes: '144x144', href: `${appleTouchIconRoot}/favicons/apple-touch-icon-144x144.png`},
      {rel: 'apple-touch-icon', sizes: '152x152', href: `${appleTouchIconRoot}/favicons/apple-touch-icon-152x152.png`},
      {rel: 'apple-touch-icon', sizes: '180x180', href: `${appleTouchIconRoot}/favicons/apple-touch-icon-180x180.png`},
    ]
  },

  buildChromeIcons() {
    const {chromeIconsRoot} = this.props

    return [
      {rel: 'icon', type: 'image/png', sizes: '32x32',   href: `${chromeIconsRoot}/favicons/favicon-32x32.png`},
      {rel: 'icon', type: 'image/png', sizes: '192x192', href: `${chromeIconsRoot}/favicons/android-chrome-192x192.png`},
      {rel: 'icon', type: 'image/png', sizes: '96x96', href: `${chromeIconsRoot}/favicons/favicon-96x96.png`},
      {rel: 'icon', type: 'image/png', sizes: '16x16', href: `${chromeIconsRoot}/favicons/favicon-16x16.png`},
    ]
  }


  buildScript() {
    const {
      schemas,
      website,
      company,
    } = this.props

    return [
      (company ? this.composeSchema('company', this.companySchema()) : null),
      (website ? this.composeSchema('website', this.websiteSchema()) : null),
      ...schemas,
    ].filter(schema => schema !== null)
  }

  composeSchema(name, content) {
    return {
      name,
      type: 'application/ld+json',
      innerHTML: content,
    }
  }

  companySchema() {
    const {
      company: {
        name,
        url,
        logo,
        sameAs = [],
      }
    }
    return `
      {
        "@context": "http://schema.org",
        "@type": "Organization",
        "name": "${name}",
        "url": "${url}",
        "logo": "${logo}",
        "sameAs" : [${sameAs.map(s => `"${s}"`).join(', ')}]
      }
    `
  }

  websiteSchema() {
    const {
      website: {
        name,
        alternateName,
        url,
      },
    } = this.props

    return `
      {
        "@context" : "http://schema.org",
        "@type" : "WebSite",
        "name" : "${name}",
        "alternateName" : "${alternateName}",
        "url" : "${url}"
      }
    `
  }

  render() {
    // prevent this props going into native Helmet
    const {
      title,
      meta,
      script,
      link,
      title,
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
      ...otherProps,
    } = this.props

    const composedProps = {
      title,
      meta: [
        this.buildMeta(),
        ...meta,
      ],
      script: [
        this.buildScript()
        ...script,
      ],
      link: [
        this.buildLink()
        ...link,
      ],
    }

    return (
      <Helmet {...composedProps} {...otherProps} />
    )
  }
}
