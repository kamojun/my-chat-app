// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'chat-container': 'clamp(20rem, 80vw, 48rem)',
      },
    },
  },
  plugins: [],
};
