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

    // support native helmet attributes
    link: PropTypes.array,
    script: PropTypes.array,
    meta: PropTypes.array,
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

    return {
      {name: 'description', content: description},
      ...(tileColor ? {name: 'msapplication-TileColor', content: tileColor} : {}),
      ...(tileImage ? {name: 'msapplication-TileImage', content: tileImage} : {}),
      ...(themeColor ? {name: 'theme-color', content: themeColor} : {}),
      ...(googleSiteVerification ? {name: 'google-site-verification', content: `${googleSiteVerification}`} : {}),
      ...(yandexVerification ? {name: 'yandex-verification', content: `${yandexVerification}`} : {}),
    }
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
      {rel: 'icon', type: 'image/png', href: `${chromeIconsRoot}/favicons/favicon-32x32.png`, sizes: '32x32'},
      {rel: 'icon', type: 'image/png', href: `${chromeIconsRoot}/favicons/android-chrome-192x192.png`, sizes: '192x192'},
      {rel: 'icon', type: 'image/png', href: `${chromeIconsRoot}/favicons/favicon-96x96.png`, sizes: '96x96'},
      {rel: 'icon', type: 'image/png', href: `${chromeIconsRoot}/favicons/favicon-16x16.png`, sizes: '16x16'},
    ]
  }


  buildScript() {
    const {
      schemas,
      website,
      company,
    } = this.props

    return [
      ...(company ? this.composeSchema('company', this.companySchema()) : []),
      ...(website ? this.composeSchema('website', this.websiteSchema()) : []),
      ...schemas,
    ]
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
