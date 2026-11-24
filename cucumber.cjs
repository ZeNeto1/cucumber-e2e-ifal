module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['features/support/hooks.js', 'features/step_definitions/*.js'],
    format: ['progress', 'html:relatorios/cucumber.html', 'json:relatorios/cucumber.json'],
    parallel: 0
  }
};
