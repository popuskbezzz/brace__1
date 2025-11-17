// vite.config.ts
import { defineConfig, loadEnv } from "file:///mnt/c/my_project_1/brace__1/packages/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///mnt/c/my_project_1/brace__1/packages/frontend/node_modules/@vitejs/plugin-react/dist/index.js";
import reactSwc from "file:///mnt/c/my_project_1/brace__1/packages/frontend/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
var __vite_injected_original_dirname = "/mnt/c/my_project_1/brace__1/packages/frontend";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__vite_injected_original_dirname, "../../"));
  const isVitest = mode === "test" || process.env.VITEST;
  return {
    plugins: [isVitest ? react() : reactSwc()],
    define: {
      __BACKEND_URL__: JSON.stringify(env.VITE_BACKEND_URL || "http://localhost:8000")
    },
    server: {
      port: 4173,
      host: "0.0.0.0"
    },
    build: {
      sourcemap: true,
      outDir: "dist"
    },
    //проверка
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "src")
      }
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/setupTests.ts"]
    },
    envDir: path.resolve(__vite_injected_original_dirname, "../../")
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvbXlfcHJvamVjdF8xL2JyYWNlX18xL3BhY2thZ2VzL2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2MvbXlfcHJvamVjdF8xL2JyYWNlX18xL3BhY2thZ2VzL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9tbnQvYy9teV9wcm9qZWN0XzEvYnJhY2VfXzEvcGFja2FnZXMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgcmVhY3RTd2MgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi8nKSk7XG4gIGNvbnN0IGlzVml0ZXN0ID0gbW9kZSA9PT0gJ3Rlc3QnIHx8IHByb2Nlc3MuZW52LlZJVEVTVDtcblxyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBbaXNWaXRlc3QgPyByZWFjdCgpIDogcmVhY3RTd2MoKV0sXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgIF9fQkFDS0VORF9VUkxfXzogSlNPTi5zdHJpbmdpZnkoZW52LlZJVEVfQkFDS0VORF9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMCcpLFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwb3J0OiA0MTczLFxyXG4gICAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgc291cmNlbWFwOiB0cnVlLFxyXG4gICAgICBvdXREaXI6ICdkaXN0JyxcclxuICAgIH0sIC8vXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDMwXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgdGVzdDoge1xyXG4gICAgICBnbG9iYWxzOiB0cnVlLFxyXG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcclxuICAgICAgc2V0dXBGaWxlczogWycuL3NyYy9zZXR1cFRlc3RzLnRzJ10sXHJcbiAgICB9LFxyXG4gICAgZW52RGlyOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vJyksXHJcbiAgfTtcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFQsU0FBUyxjQUFjLGVBQWU7QUFDbFcsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sY0FBYztBQUNyQixPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxLQUFLLFFBQVEsa0NBQVcsUUFBUSxDQUFDO0FBQzNELFFBQU0sV0FBVyxTQUFTLFVBQVUsUUFBUSxJQUFJO0FBRWhELFNBQU87QUFBQSxJQUNMLFNBQVMsQ0FBQyxXQUFXLE1BQU0sSUFBSSxTQUFTLENBQUM7QUFBQSxJQUN6QyxRQUFRO0FBQUEsTUFDTixpQkFBaUIsS0FBSyxVQUFVLElBQUksb0JBQW9CLHVCQUF1QjtBQUFBLElBQ2pGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLElBQ1Y7QUFBQTtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ3BDO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBLE1BQ0osU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsWUFBWSxDQUFDLHFCQUFxQjtBQUFBLElBQ3BDO0FBQUEsSUFDQSxRQUFRLEtBQUssUUFBUSxrQ0FBVyxRQUFRO0FBQUEsRUFDMUM7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
