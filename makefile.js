var npm_dir = './node_modules/.bin/';

jsmake.desc('Generated project documentation.');
jsmake.task('docs', function () {
    jsmake.utils.rmdir('./public/docs');

    jsmake.utils.shell('"' + npm_dir + 'apidoc"', [ '-i src/', '-o public/docs/' ]);
});

jsmake.desc('Bumps the package version for next release.');
jsmake.task('bump', function (argv) {
    var version = jsmake.utils.packageJsonVersionBump('./package.json', argv.type || 'patch');

    console.log('Bumped to version ' + version + '.');
});

jsmake.tasks.bump.parameters.setRule(
    'type',
    {
        type: String,
        description: 'Increment type [major, minor, patch, premajor, preminor, prepatch or prerelease]'
    }
);

jsmake.desc('Publishes package to npm.');
jsmake.task('publish', function (argv) {
    jsmake.utils.npmPublish();
});

jsmake.desc('Reinstalls dependencies from npm.');
jsmake.task('deps', function (argv) {
    jsmake.utils.rmdir('node_modules');
    jsmake.utils.shell('npm install');
});

jsmake.desc('Builds the source code.');
jsmake.task('build', function () {
    jsmake.utils.shell('sey rebuild');
});
