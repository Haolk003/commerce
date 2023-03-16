/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-light": "#fff",
        "color-primary": "#0e9f6e",
        "color-notifi-primary": "#f05252",
        "color-dark": "#121212",
        "color-info": "#3498db",
        "color-success": "#07bc0c",
        "color-warning": "#f1c40f",
        "color-error": "#e74c3c",
        "color-transparent": "hsla(0,0%,100%,0.7)",
        "text-color-light": "#757575",
        "spinner-color": "#616161",
        "spinner-color-empty-area": "#e0e0e0",
        "color-process-light":
          "linear-gradient(90deg,#4cd964,#5ac8fa,#007aff,#34aadc,#5856d6,#ff2d55);",
        "color-process-dark": "#bb86fc",
      },
      width: {
        "toast-width": "320px",
      },
      height: {
        "toast-min-height": "64px",
        "toast-max-height": "800px",
      },
    },
  },
  plugins: [],
};
