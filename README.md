# Bulletproof React Helmet
Bulletproof version of [react-helmet](https://github.com/nfl/react-helmet).
Provides tools to cover yours `<head />` 99% usecases and probles.

## Wait, it's es6! How shoud i use it?!
This package in written in es6 and cannot be used directly without transformation in most cases.
This is intentional to avoid building step and support build tools, babel preset etc.
It's expected to be bundle as any other es6 code you've use in your project despite being placed into `node_modules` directory.

For example, in most our project we use `webpack` like this:
```js
  {
    test: /\.js|jsx$/,
    loader: 'babel',
    exclude: /node_modules/,
  },
```

What you don't want to do is to exclude es6 modules:

```js
  {
    test: /\.js|jsx$/,
    loader: 'babel',
    exclude: /node_modules(?!.+-es6)/,
  },
```

Done! Now any package that ends with `-es6` will be build and bundle with your project babel-loader (and any other loader for that matter - source of this package will be treated as any other project js code). And it also can be hot-reloaded, linked for development etc.

Users of other build systems should adjust on their own, but you get the idea.

## Usage
Since we are using [`react-helmet`](https://github.com/nfl/react-helmet) under the hood you could use pass any valid props to bulletproof version and expect it to work as it should.

```js
import Helmet from 'bulletproof-helmet-es6'

// ...

  <Helmet title="..." meta={[...]} />
```

You should also use `react-helmet` to rewind sideEffects on server side, not the bulletproof version, since all props will end up there. That basicly means that you would not need to rewrite any code to handle it on server.

```js
import Helmet from 'react-helmet'

// ...

const head = Helmet.rewind()
const headStrings = {
  title: head.title.toString(),
  meta: head.meta.toString(),
  link: head.link.toString(),
  script: head.script.toString(),
}
```

## Well then, what does it do?
Bulletproof version provides number of utils to handle your everyday need as web developer.
Let's start with basics:

### Providing `title`, `description` and `image` props

```js
  <BulletproofHelmet title="..." description="..." image="image.png" />
```

will yield:

  * document title, as one can expect
  * document description
  * valid twitter `summary_large_image` card with image, description and title
  * valid opengraph (facebook, pinterest, vk etc) article entry to share on social networks

```html
<title>...</title>

<meta name="description" content="..." data-react-helmet="true">

<meta name="og:title" content="..." data-react-helmet="true">
<meta name="og:description" content="..." data-react-helmet="true">
<meta name="og:image" content="image.png" data-react-helmet="true">
<meta name="og:image:width" content="1200" data-react-helmet="true">
<meta name="og:image:height" content="630" data-react-helmet="true">
<meta name="og:type" content="article" data-react-helmet="true">

<meta name="twitter:title" content="..." data-react-helmet="true">
<meta name="twitter:card" content="summary_large_image" data-react-helmet="true">
<meta name="twitter:description" content="..." data-react-helmet="true">
<meta name="twitter:image" content="image.png" data-react-helmet="true">
```

It is expected you have provided 1200x630px image for facebook and for twitter (twitter will resize it for you). You could provide size for openGraph image, but it's both default and highly recomended.

### Schema.org schemas
[Schema.org](https://schema.org/) may not be most popular way to provide metadata, bug Google use it to show rich snipets for you, so where is no harm to use it:

*react-helmet*
```js
<Helmet
  script={[
    {
      name: 'company',
      type: 'application/ld+json',
      innerHTML: `
        {
          "@context": "http://schema.org",
          "@type": "Organization",
          "name": "${name}",
          "url": "${url}",
          "logo": "${logo}",
          "sameAs" : [
            "https://twitter.com/...",
            "https://vk.com/...",
            "https://www.facebook.com/...",
            "https://instagram.com/..."
          ]
        }
      `
    }
  ]}
/>
```

We make it a bit cleaner:

*bulletproof-react-helmet*
```js
import BulletproofHelmet, {composeSchema} from 'bulletproof-react-helmet-es6'

// ....

<BulletproofHelmet
  schemas={[
    composeSchema('Organization', {
      name: name,
      url: url,
      logo: logo,
      sameAs: [
        'https://twitter.com/...',
        // ...
      ]
    })
  ]}
/>
```

Both this ways are yeilds same result:

```html
<script name="WebSite" type="application/ld+json" data-react-helmet="true">
{
  "@context": "http://schema.org",
  "@type": "Organization",
  "name": "...",
  "url": "...",
  "logo": "...",
  "sameAs" : [
    "https://twitter.com/...",
    "https://vk.com/...",
    "https://www.facebook.com/...",
    "https://instagram.com/..."
  ]
}
</script>
```

In addition `Organization` and `WebSite` schemas as most popular (can be used on any single website) provided with shortcuts:

```js
<BulletproofHelmet
  company={{
    name: ...,
  }}
  website={{
    name: ...,
    url: ...,
  }}
/>
```




You could also specify image size:
```js
<BulletproofHelmet openGraph={{imageWidth: ..., imageHeight: ...}} />
```
But we recomed just use 1200x630 for gorgeous retina-ready images in all social networks and devices


