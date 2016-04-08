var generators = require('yeoman-generator');
var Github = require('github-api');
var config = require('../../config/config.json');

var github = new Github({
    token: config.githubOAuth,
    auth: "oauth"
});

var user = github.getUser();

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
    this.argument('componentName', {
      desc: 'Tag name of the component and directory to generate.',
      required: true
    });
    this.sourceRoot('/Users/h.brahmbhatt/dev/generator-outnet-component/generators/app/template/outnet-vanilla-component');
    this.repo = 'git@github.com:damnhipster/'+this.componentName
  },
  writing: {
    copyTemplate: function() {
      this.fs.copy(
        this.templatePath('**/*.*'),
        this.destinationPath(this.componentName),
        { sync: true }
      );
    }
  },
  install: {
    createRepository: function() {
      var options = {
        cwd: this.componentName
      };
      user.createRepo({"name": this.componentName}, (function(err, res) {
        if(err) {
          console.error(err);
          return;
        }
        this.spawnCommandSync('git', ['init'], options);
        this.spawnCommandSync('git', ['remote', 'add', 'origin', this.repo], options);
        this.spawnCommandSync('git', ['add', '--all'], options);
        this.spawnCommandSync('git', ['commit', '-m', '"initial commit from generator"'], options);
        this.spawnCommandSync('git', ['push', '-u', 'origin', 'master'], options);
        this.spawnCommandSync('git', ['branch', 'gh-pages'], options);
        this.spawnCommandSync('git', ['push', 'origin', 'gh-pages'], options);
      }).bind(this));
    }
  }
});
