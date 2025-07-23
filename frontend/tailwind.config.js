// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This ensures Tailwind scans all your project files
  ],
  theme: {
    extend: {
      // These are the custom colors and animations for the login page
      colors: {
        'calm-blue': '#a2d2ff', // A light, calming blue
        'deep-purple': '#3a0ca3', // A darker, rich purple
        'soft-white': '#f8f9fa', // A subtle off-white for backgrounds/cards

        // Add colors specifically for the signup form's needs, derived from your palette
        // or to provide necessary contrast/accents.
        // I'm deriving these from your existing palette where possible for consistency.
        primary: { // Re-using 'primary' concept for form elements
          light: '#e0e7ee', // Soft grey-blue for borders/muted text (can be soft-white too)
          DEFAULT: '#a2d2ff', // calm-blue for main accents/active states
          dark: '#3a0ca3', // deep-purple for strong accents/buttons
        },
        // Using 'soft-white' for background of the card
        card: '#f8f9fa', // soft-white for the form background
        // Text colors adapted from your palette or neutral tones
        text: {
          DEFAULT: '#334155', // Slate 800 - good dark text for readability
          muted: '#64748b', // Slate 500 - lighter text for labels/hints
          link: '#3a0ca3', // deep-purple for links
        },
        error: '#ef4444', // Standard red for errors
      },
      keyframes: {
        // Your existing keyframes
        'gradient-pan': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        // Keyframes for signup form entry and error messages
        'fadeInUp': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        // Your existing animations
        'gradient-pan': 'gradient-pan 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',

        // Animations for signup form entry and error messages
        'fadeInUp': 'fadeInUp 0.7s ease-out forwards',
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}