const assert = require('assert');

for (let index = 0; index < 15; index++) {
  it('should work ' + index, function () {
    assert.ok(true);
  });
}
it('should not 1st', function () {
  assert.ok(false);
});
it('should not 2nd', function () {
  assert.ok(false);
});
