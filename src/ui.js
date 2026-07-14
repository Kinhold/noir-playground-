export function createCompileHandler({
  compileSource,
  codeBox,
  output,
  compileButton,
}) {
  return async function handleCompile() {
    compileButton.disabled = true;
    output.className = '';
    output.textContent = 'Compiling...';

    try {
      const result = await compileSource(codeBox.value);
      output.className = 'success';
      output.textContent = [
        '✓ Circuit compiled successfully.',
        `Bytecode size: ${result.bytecodeSize}`,
        `Compiler warnings: ${result.warningCount}`,
        'No witness was executed and no proof was generated.',
      ].join('\n');
    } catch (error) {
      output.className = 'error';
      output.textContent = `✗ Compilation error:\n${error.message}`;
    } finally {
      compileButton.disabled = false;
    }
  };
}
