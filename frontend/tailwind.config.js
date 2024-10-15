/** @type {import('tailwindcss').Config} */
export default {
  content: [
	   "./index.html",
    	"./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
		animation: {
			'fade-in': 'fadeIn 1s ease-out forwards',
		},
		colors: {
			"navbar": "#111111",
			"airbnb": "#ff385c"
		},
		keyframes: {
			fadeIn: {
				'0%': { opacity: 0 },
				'100%': { opacity: 1 },
			},
		},
	 },
  },
  variants: {
		extend: {
			animation: ['responsive', 'motion-safe', 'motion-reduce'],
		}
  },
  plugins: [
		function({ addUtilities, theme }) {
			const animationDelays = {
				'.animation-delay-500': { 'animation-delay': '500ms' },
				'.animation-delay-1000': { 'animation-delay': '1000ms' },
			}
			addUtilities(animationDelays, ['responsive', 'hover'])
		}
  ],
}

