module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'extends': 'google',
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
      'ident': ['warn', 2]
  },
};


//module.exports = {
  //'env': {
    //'node': true,
    //'es2021': true,
  //},
  //'extends': 'google',
  //'overrides': [
    //{
      //'env': {
        //'node': true,
      //},
      //'files': [
        //'.eslintrc.{js,cjs}',
      //],
      //'parserOptions': {
        //'sourceType': 'script',
      //},
    //},
  //],
  //'parserOptions': {
    //'ecmaVersion': 'latest',
    //'sourceType': 'module',
  //},
  //'rules': {
  //},
//};
