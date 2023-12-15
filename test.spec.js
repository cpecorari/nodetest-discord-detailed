const assert = require('assert');
const { _aggregate } = require('./src/analysis');
const { fileTest2 } = require('./test2');

for (let index = 0; index < 15; index++) {
  it('should work ' + index, function () {
    assert.ok(true);
  });
}
it('should test real case ', function () {
  const resultAggregate = _aggregate('', fileTest2);
  assert.equal(resultAggregate.passed, 4);
  assert.equal(resultAggregate.failed, 2);
  assert.equal(resultAggregate.tests.length, 2);
});
