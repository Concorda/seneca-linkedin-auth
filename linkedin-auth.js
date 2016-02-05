
var LinkedinStrategy = require('passport-linkedin').Strategy

module.exports = function (options) {
  var seneca = this

  var authPlugin = new LinkedinStrategy({
    consumerKey: options.consumerKey,
    consumerSecret: options.consumerSecret,
    callbackURL: options.urlhost + '/auth/linkedin/callback',
    profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
  },
    function (token, tokenSecret, profile, done) {
      var data = {
        nick: profile.displayName,
        name: profile.displayName,
        identifier: '' + profile.id,
        credentials: {
          token: token,
          secret: tokenSecret},
        userdata: profile,
        when: new Date().toISOString()
      }
      done(null, data)
    }
  )

  seneca.act({role: 'auth', cmd: 'register_service', service: 'linkedin', plugin: authPlugin, conf: options})

  return {
    name: 'linkedin-auth'
  }
}
