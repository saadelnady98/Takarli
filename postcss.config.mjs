const config = {
  plugins: ["@tailwindcss/postcss"],
  autoprefixer: {},
  cssnano: {
    preset: "default",
  },
  tailwindcss: {
    config: "./tailwind.config.ts",
  },
};

export default config;
