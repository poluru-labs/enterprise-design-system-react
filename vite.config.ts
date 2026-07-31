import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const rootDir = dirname(fileURLToPath(import.meta.url));
const isStorybook = process.argv.some(
  (arg) => arg.includes('storybook') || arg.includes('storybook/'),
);

export default defineConfig({
  plugins: isStorybook
    ? [react()]
    : [
        react(),
        dts({
          include: ['src'],
          exclude: [
            'src/**/*.stories.tsx',
            'src/**/*.test.tsx',
            'src/**/*.test.ts',
            'src/**/*.mdx',
            'src/docs/**',
          ],
          rollupTypes: true,
          tsconfigPath: './tsconfig.build.json',
        }),
      ],
  build: isStorybook
    ? {}
    : {
        lib: {
          entry: resolve(rootDir, 'src/index.ts'),
          name: 'EnterpriseDesignSystemReact',
          formats: ['es'],
          fileName: 'index',
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime'],
          output: {
            assetFileNames: (assetInfo) =>
              assetInfo.name?.endsWith('.css') ? 'styles.css' : 'assets/[name][extname]',
          },
        },
        cssCodeSplit: false,
        sourcemap: true,
        target: 'es2022',
      },
});
