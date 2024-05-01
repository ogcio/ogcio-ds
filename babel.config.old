module.exports = function (api) {
  const babelEnv = api.env()
  const browserslistEnv = !api.env('test') ? 'production' : 'node'

  const presets = [
    [
      '@babel/preset-env',
      {
        browserslistEnv
      }
    ],
    [
      '@babel/preset-react',
      {
        development: babelEnv === 'development'
      }
    ]
  ]

  return {
    presets
  }
}
