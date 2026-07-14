const PACKAGE_MANIFEST = `[package]
name = "playground"
type = "bin"
authors = []
`;

function asStream(contents) {
  return new Blob([contents], { type: 'text/plain' }).stream();
}

export async function compileSource(source) {
  if (!source.trim()) {
    throw new Error('Circuit source must not be empty.');
  }

  const { compile, createFileManager } = await import('@noir-lang/noir_wasm');
  const fileManager = createFileManager('/');
  await fileManager.writeFile('Nargo.toml', asStream(PACKAGE_MANIFEST));
  await fileManager.writeFile('src/main.nr', asStream(source));

  const artifact = await compile(fileManager, undefined, () => {}, () => {});
  return {
    bytecodeSize: artifact.program.bytecode.length,
    warningCount: artifact.warnings.length,
  };
}
