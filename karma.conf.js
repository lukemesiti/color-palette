module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      '../src/**/*.js',
      'spec/*.js'
    ]
  });
};
