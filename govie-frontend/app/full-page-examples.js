const { getFullPageExamples } = require('../lib/file-helper')

module.exports = (app) => {
  require('./views/full-page-examples/applicant-details')(app)
  require('./views/full-page-examples/cookie-banner-essential-cookies')(app)
  require('./views/full-page-examples/cookie-banner-server-side')(app)
  require('./views/full-page-examples/have-you-changed-your-name')(app)
  require('./views/full-page-examples/feedback')(app)
  require('./views/full-page-examples/how-do-you-want-to-sign-in')(app)
  require('./views/full-page-examples/search')(app)
  require('./views/full-page-examples/passport-details')(app)
  require('./views/full-page-examples/update-your-account-details')(app)
  require('./views/full-page-examples/upload-your-photo')(app)
  require('./views/full-page-examples/upload-your-photo-success')(app)
  require('./views/full-page-examples/what-is-your-address')(app)
  require('./views/full-page-examples/what-is-your-nationality')(app)
  require('./views/full-page-examples/what-is-your-postcode')(app)
  require('./views/full-page-examples/what-was-the-last-country-you-visited')(app)

  app.get('/full-page-examples', async (req, res, next) => {
    res.locals.fullPageExamples = await getFullPageExamples()

    res.render('full-page-examples/index', (error, html) => {
      if (error) {
        next(error)
      } else {
        res.send(html)
      }
    })
  })

  // Display full page examples index by default if not handled already
  app.get('/full-page-examples/:exampleName', function (req, res, next) {
    res.render(`full-page-examples/${req.params.exampleName}/index`, function (error, html) {
      if (error) {
        next(error)
      } else {
        res.send(html)
      }
    })
  })
}
