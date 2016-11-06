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
