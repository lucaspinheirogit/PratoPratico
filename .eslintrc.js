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
    'semi': 0,
    'jsx-quotes': ['error', 'prefer-double'],
    "import/prefer-default-export": 'off',
    "space-before-function-paren": 0,
    "no-shadow": 0,
    "react/destructuring-assignment": 0,
    "max-len": 0,
    "react/no-access-state-in-setstate": 0,
    "no-unused-expressions": 0,
    "no-param-reassign": 0,
    "react/jsx-one-expression-per-line": 0,
    "global-require": 0,
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
