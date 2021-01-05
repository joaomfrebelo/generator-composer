/* global describe,it,before */
'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const phplint = require("phplint").lint;

const projectName = 'my-yeoman-generator';
const authorName = 'João Rebelo';
const githubAccount = 'joaomfrebelo';
const className = 'MyYeoman';
const namespace = 'Rebelo\\Yeoman';
const phplocPharPath = '../../tools/phploc-7.0.1.phar';
const phpdoxPharPath = '../../tools/phpdox-0.12.0.phar'
const gulpSupport = 'y';

describe('yo composer:app', () => {
    before(done => {
	helpers.run(path.join(__dirname, '../app'))
		.inDir(path.join(__dirname, '../../tmp'))
		.withOptions({
		    'skip-install': true
		})
		.withPrompts({
		    projectName: projectName,
		    authorName: authorName,
		    githubAccount: githubAccount,
		    className: className,
		    namespace: namespace,
                    phplocPharPath: phplocPharPath,
                    phpdoxPharPath: phpdoxPharPath,
                    gulpSupport: gulpSupport
		})
		.on('end', done);
    });

    it('creates files', () => {
	assert.file([
	    'composer.json',
	    'phpstan.neon',
	    'phpunit.xml',
	    'phpdox.xml',
	    'phpcs.xml',
	    'builddoc.sh',
	    '.editorconfig',
	    '.gitignore',
	    'README.md',
	    'LICENSE',
	    'docs/index.html',
	    'src/' + namespace + '/' + className + ".php",
	    'test/Base.php',
	    'test/bootstrap.php',
	    'test/' + namespace + '/' + className + "Test.php"
	]);

        if(gulpSupport.toLowerCase() === "y"){
            assert.file([                
                'gulp.js',
                'package.json'
            ]);
        }else{
            assert.noFile([                
                'gulp.js',
                'package.json'
            ]);
        }

	phplint(["src/**/*.php", "test/**/*.php"], function (err, stdout, stderr) {
	    if (err){
		console.log(err);
		assert(false);
	    }
	    assert(true);
	});

    });
});
