import assert from 'node:assert/strict';
import test from 'node:test';

test('normalizes NEXT_BASE_PATH values without a leading slash', async () => {
  const originalBasePath = process.env.NEXT_BASE_PATH;
  process.env.NEXT_BASE_PATH = 'prod';

  try {
    const { default: config } = await import(`./next.config.ts?basePath=${Date.now()}`);

    assert.equal(config.basePath, '/prod');
    assert.equal(config.env?.NEXT_PUBLIC_BASE_PATH, '/prod');
  } finally {
    if (originalBasePath === undefined) {
      delete process.env.NEXT_BASE_PATH;
    } else {
      process.env.NEXT_BASE_PATH = originalBasePath;
    }
  }
});
