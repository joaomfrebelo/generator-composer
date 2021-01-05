'use strict';

const generators = require('yeoman-generator');
const figlet = require('figlet');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const mkdirp = require('mkdirp');

module.exports = class extends generators {
	constructor(args, opts) {
		
		figlet('yo composer', (err, data) => {
			if (err) {
				done(err);
			} else {
				console.log(data);
				done();
			}
		});
				
		super(args, opts);
		this.res = {};
		const done = this.async();
		const notifier = updateNotifier({
			pkg
		});
		if (notifier.update) {
			notifier.notify();
		}
	}

	prompting() {
		const prompts = [{
			type: 'input',
			name: 'githubAccount',
			message: 'What is your github account?'
		}, {
			type: 'input',
			name: 'projectName',
			message: 'Name of the project Github repository (e.g. php-my-super-package)?'
		}, {
			type: 'input',
			name: 'authorName',
			message: 'The author name?'
		}, {
			type: 'input',
			name: 'namespace',
			message: 'The library namespace (e.g. Rebelo\\Name\\OtherName)?'
		}, {
			type: 'input',
			name: 'className',
			message: 'The class name (e.g. MyClass)?'
		}, {
			type: 'input',
			name: 'gulpSupport',
			message: 'Do you wich Gulp files (y/N)?'
		}];
		
		return this.prompt(prompts).then(answers => { // eslint-disable-line promise/prefer-await-to-then
			this.log('github account', answers.githubAccount);
			this.log('project name', answers.projectName);
			this.log('author name', answers.authorName);
			this.log('namespace name', answers.namespace);
			this.log('class name', answers.className);
			this.log('phploc phar file path', answers.phplocPharPath);
			this.log('phpdox phar file path', answers.phpdoxPharPath);
			this.res.githubAccount = answers.githubAccount;			
			this.res.projectName = answers.projectName;
			this.res.authorName = answers.authorName;
			this.res.namespace = answers.namespace;
			this.res.className = answers.className;
			this.res.year = new Date().getUTCFullYear();
			this.res.topNamespace = answers.namespace.split("\\")[0];
            this.res.gulpSupport = answers.gulpSupport.toLowerCase() === "y"
		});
	}

	writing() {
		const self = this;
		const tpl = function (input, output) {
			self.fs.copyTpl(
				self.templatePath(input),
				self.destinationPath(output),
				self.res
			);
		};

		const cp = function (input, output) {
			self.fs.copy(
				self.templatePath(input),
				self.destinationPath(output)
			);
		};

		tpl(
			'src/_script.php.tpl',
			'src/' + this.res.namespace + '/' + this.res.className + '.php'
		);
		tpl(
			'test/_scriptTest.php.tpl', 
			'test/' + this.res.namespace + '/' + this.res.className + 'Test.php'
		);
        
		tpl('test/_Base.php', 'test/Base.php');
		tpl('test/_bootstrap.php', 'test/bootstrap.php');
		tpl('_composer.json', 'composer.json');
		tpl('_phpcs.xml', 'phpcs.xml');
		tpl('_phpdox.xml', 'phpdox.xml');
		tpl('_makefile', 'makefile');
		tpl('docs/index.html', 'docs/index.html');
		tpl('_README.md', 'README.md');
		cp('gitignore', '.gitignore');
		cp('_phpunit.xml', 'phpunit.xml');
		cp('_phpstan.neon', 'phpstan.neon');
		cp('editorconfig', '.editorconfig');
		cp('LICENSE', 'LICENSE');
		cp('_gitchangelog.rc', '.gitchangelog.rc');	
		cp('License.txt', 'License.txt');	
		
		mkdirp.sync('logs');
                
                if(this.res.gulpSupport){                    
                    tpl('_package.json', 'package.json');
                    tpl('_gulp.js', 'gulp.js');
                }
                
	}

	install() {
		//this.installDependencies({skipInstall: this.option('skip-install')});
	}
};


