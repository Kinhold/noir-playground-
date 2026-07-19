import assert from 'node:assert/strict';
import test from 'node:test';

import { createCompileHandler } from '../src/ui.js';

function fixture(compileSource) {
  const codeBox = { value: 'fn main(x: Field) { assert(x != 0); }' };
  const output = { className: '', textContent: '' };
  const compileButton = { disabled: false };
  const handleCompile = createCompileHandler({
    compileSource,
    codeBox,
    output,
    compileButton,
  });
  return { compileButton, handleCompile, output };
}

test('compile action renders a compile-only success', async () => {
  const { compileButton, handleCompile, output } = fixture(async () => ({
    bytecodeSize: 42,
    warningCount: 0,
  }));

  await handleCompile();

  assert.equal(compileButton.disabled, false);
  assert.equal(output.className, 'success');
  assert.match(output.textContent, /Circuit compiled successfully/);
  assert.match(output.textContent, /No witness was executed/);
});

test('compile action renders compiler errors without HTML injection', async () => {
  const { compileButton, handleCompile, output } = fixture(async () => {
    throw new Error('<unsafe compiler output>');
  });

  await handleCompile();

  assert.equal(compileButton.disabled, false);
  assert.equal(output.className, 'error');
  assert.match(output.textContent, /<unsafe compiler output>/);
});
