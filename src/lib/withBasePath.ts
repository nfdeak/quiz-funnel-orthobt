const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function withBasePath(path: string): string {
  if (!path.startsWith('/')) {
    console.log(`${path}`)
    return path;

  }
  console.log(`${basePath}${path}`)

  return `${basePath}${path}`;
}
