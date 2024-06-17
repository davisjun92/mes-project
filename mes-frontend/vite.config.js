import { defineConfig } from 'vite';
import { createServer } from 'vite';

import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()]
});
