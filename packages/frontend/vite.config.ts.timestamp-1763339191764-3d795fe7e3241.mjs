// vite.config.ts
import { defineConfig, loadEnv } from "file:///mnt/c/my_project_1/brace__1/packages/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///mnt/c/my_project_1/brace__1/packages/frontend/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
var __vite_injected_original_dirname = "/mnt/c/my_project_1/brace__1/packages/frontend";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__vite_injected_original_dirname, "../../"));
  return {
    plugins: [react()],
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvbXlfcHJvamVjdF8xL2JyYWNlX18xL3BhY2thZ2VzL2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2MvbXlfcHJvamVjdF8xL2JyYWNlX18xL3BhY2thZ2VzL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9tbnQvYy9teV9wcm9qZWN0XzEvYnJhY2VfXzEvcGFja2FnZXMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3Yyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLycpKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICBfX0JBQ0tFTkRfVVJMX186IEpTT04uc3RyaW5naWZ5KGVudi5WSVRFX0JBQ0tFTkRfVVJMIHx8ICdodHRwOi8vbG9jYWxob3N0OjgwMDAnKSxcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgcG9ydDogNDE3MyxcclxuICAgICAgaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgfSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcclxuICAgICAgb3V0RGlyOiAnZGlzdCcsXHJcbiAgICB9LCAvL1x1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHRlc3Q6IHtcclxuICAgICAgZ2xvYmFsczogdHJ1ZSxcclxuICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXHJcbiAgICAgIHNldHVwRmlsZXM6IFsnLi9zcmMvc2V0dXBUZXN0cy50cyddLFxyXG4gICAgfSxcclxuICAgIGVudkRpcjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLycpLFxyXG4gIH07XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRULFNBQVMsY0FBYyxlQUFlO0FBQ2xXLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFGakIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxLQUFLLFFBQVEsa0NBQVcsUUFBUSxDQUFDO0FBRTNELFNBQU87QUFBQSxJQUNMLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxJQUNqQixRQUFRO0FBQUEsTUFDTixpQkFBaUIsS0FBSyxVQUFVLElBQUksb0JBQW9CLHVCQUF1QjtBQUFBLElBQ2pGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLElBQ1Y7QUFBQTtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ3BDO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBLE1BQ0osU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsWUFBWSxDQUFDLHFCQUFxQjtBQUFBLElBQ3BDO0FBQUEsSUFDQSxRQUFRLEtBQUssUUFBUSxrQ0FBVyxRQUFRO0FBQUEsRUFDMUM7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
