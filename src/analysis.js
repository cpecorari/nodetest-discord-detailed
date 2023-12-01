const child_process = require('child-process-promise');
const fs = require('fs');

const filePath = __dirname + 'tests.txt';

module.exports.start = test;

function test(skip) {
  console.log("Running 'npm test'...");
  var args = ['test'];
  if (skip) {
    console.log('SKIPPED ? ', skip);
    args.push('--help');
  }

  var npm = child_process.spawn('npm', args, { shell: true });
  fs.writeFileSync(filePath, '');

  npm.childProcess.stdout.on('data', (data) => {
    fs.appendFileSync(filePath, data.toString('utf8'));
    process.stdout.write(data.toString('utf8'));
  });
  npm.childProcess.stderr.on('data', (data) => {
    fs.appendFileSync(filePath, data.toString('utf8'));
    process.stdout.write(data.toString('utf8'));
  });

  return npm.then(aggregate, aggregate);
}

function aggregate(err) {
  console.log('Aggregating test results...');
  const file = fs.readFileSync(filePath, 'utf-8');

  return {
    status: err.code > 0 ? 'FAILURE' : 'SUCCESS',
    tests: err,
    passed: Number(/(\d)\spassing/g.exec(file)?.[1] || 0),
    failed: Number(/(\d)\sfailing/g.exec(file)?.[1] || 0),
    coverage: NaN,
  };
}
