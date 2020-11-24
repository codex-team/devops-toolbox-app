module.exports = {
  plugins: {
    /**
     * Consumes files by @import rule
     * https://github.com/postcss/postcss-import
     */
    'postcss-import': {},

    /**
     * Enable custom property sets references (@apply rule and custom property sets)
     * https://www.npmjs.com/package/postcss-apply
     */
    'postcss-apply': {},

    /**
     * Convert modern CSS into something most browsers can understand
     * https://github.com/csstools/postcss-preset-env
     */
    'postcss-preset-env': {
      /**
       * Specifies sources where variables like Custom Media, Custom Properties,
       * Custom Selectors, and Environment Variables can be imported from
       *
       * https://github.com/csstools/postcss-preset-env#importfrom
       */
      importFrom: 'src/styles/variables.css',

      /**
       * Polyfill CSS features
       * https://github.com/csstools/postcss-preset-env#stage
       *
       * List of features with levels: https://cssdb.org/
       */
      stage: 0,
    },

    /**
     * Simple template defined directly in CSS to prevent repeating yourself.
     * https://github.com/postcss/postcss-mixins
     */
    'postcss-mixins': {},

    /**
     * PostCSS plugin for Sass-like variables.
     * You can use variables inside values, selectors and at-rule’s parameters.
     * https://github.com/postcss/postcss-simple-vars
     */
    'postcss-simple-vars': {},

    /**
     * PostCSS plugin to reference any parent/ancestor selector in nested CSS.
     * https://github.com/toomuchdesign/postcss-nested-ancestors
     */
    'postcss-nested-ancestors': {},

    /**
     * Nested rules unwrapper
     * https://github.com/postcss/postcss-nested
     * As you know 'postcss-preset-env' plugin has a 'postcss-nesting' feature
     * but it does not work with nested rules like BEM
     * Report: https://github.com/jonathantneal/postcss-nesting/issues/41
     */
    'postcss-nested': {},
  },
};
