module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'rocket-float': 'rocketFloat 4s ease-in-out infinite',
        smoke: 'smoke 4s ease-in-out infinite',
      },
      keyframes: {
        rocketFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        smoke: {
          '0%': { opacity: 1, transform: 'scale(0.8)' },
          '100%': { opacity: 0, transform: 'scale(1.5)' },
        },
      },
    },
  },
  plugins: [],
}
