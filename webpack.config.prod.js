const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const common = require('./webpack.common');
const path = require('path');

// Lista dodatkowych plików HTML (oprócz index.html)
const htmlFiles = [
  '404.html',
  'contact-options.html',
  'kosmetologia.html',
  'fryzjerstwo.html',
  'newsletter.html',
  'newsletter-success-page.html',
  'privacy-policy.html',
];

// Tworzenie instancji HtmlWebpackPlugin dla każdego dodatkowego pliku HTML
const htmlPlugins = htmlFiles.map((file) => {
  return new HtmlWebpackPlugin({
    filename: file, // Wyjściowy plik w katalogu 'dist'
    template: `./${file}`, // Ścieżka do pliku źródłowego
    inject: 'body', // Wstawianie zasobów (CSS/JS) w <body>
    minify: {
      removeComments: true,
      collapseWhitespace: true,
    },
  });
});

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js', // Wersjonowanie JS
    clean: true, // Usunięcie starych plików przy każdym buildzie
  },
  plugins: [
    // Tworzenie index.html
    new HtmlWebpackPlugin({
      filename: 'index.html', // Główny plik index.html
      template: './index.html', // Ścieżka do oryginalnego index.html
      inject: 'body', // Wstawianie zasobów (CSS/JS) w <body>
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    ...htmlPlugins, // Dynamiczne generowanie innych plików HTML
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css', // Wersjonowanie CSS
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'assets', to: 'assets' }, // Kopiowanie folderów
        { from: 'js/vendor', to: 'js/vendor' },
        { from: 'icon.svg', to: 'icon.svg' },
        { from: 'favicon.ico', to: 'favicon.ico' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'icon.png', to: 'icon.png' },
        { from: 'site.webmanifest', to: 'site.webmanifest' },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Produkcyjne CSS
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // Produkcyjne SCSS
      },
    ],
  },
});
