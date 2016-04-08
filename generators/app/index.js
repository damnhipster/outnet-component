var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
    this.argument('componentName', {
      desc: 'Tag name of the component and directory to generate.',
      required: true
    });
    this.sourceRoot('generators/app/template/outnet-vanilla-component');
    this.repo = 'git@github.com:damnhipster/'+this.componentName
  },
  writing: function () {
    this.fs.copy(
      this.templatePath('**/*.*'),
      this.destinationPath(this.componentName)
    );
  },
  git: function() {
    this.spawnCommandSync('git', ['init']);
    this.spawnCommandSync('git', ['remote', 'add', 'origin', this.repo]);
    this.spawnCommandSync('git', ['add', '--all']);
    this.spawnCommandSync('git', ['commit', '-m', '"initial commit from generator"']);
    this.spawnCommandSync('git', ['push', '-u', 'origin', 'master']);
  }
});
