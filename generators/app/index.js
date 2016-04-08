var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
    this.argument('componentName', {
      desc: 'Tag name of the component and directory to generate.',
      required: true
    });
    this.sourceRoot('generators/app/template/outnet-vanilla-component');
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('/.*/g'),
      this.destinationPath(this.componentName),
      { title: 'Templating with Yeoman' }
    );
  }
});
