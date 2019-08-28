module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'semi': 'off',
    "react/destructuring-assignment": 'off',
    "no-param-reassign": 'off',
    "react/jsx-one-expression-per-line": 'off',
    "global-require": 'off',
    "arrow-parens": 'off',
    "no-shadow": 'off',
    "space-before-function-paren": 'off',
    "space-before-blocks": 'off',
    "object-curly-newline": 'off',
    "no-unused-expressions": 'off',
    // 'jsx-quotes': ['error', 'prefer-double'],
    // "import/prefer-default-export": 'off',
    // "max-len": 0,
    // "react/no-access-state-in-setstate": 0,
  },
  'globals': {
    "fetch": false
  },
  "settings": {
    "import/resolver": {
      "babel-plugin-root-import": {}
    }
  }
}
