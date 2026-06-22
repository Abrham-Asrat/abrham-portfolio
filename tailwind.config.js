/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backdropBlur: {
				sm: '4px',
			},
			animation: {
				'float': 'float 3s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'slide-in-left': 'slide-in-left 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.6s ease-out',
				'slide-in-up': 'slide-in-up 0.6s ease-out',
				'slide-in-down': 'slide-in-down 0.6s ease-out',
				'scale-pop': 'scale-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'rotate-slow': 'rotate-slow 20s linear infinite',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
				'blink': 'blink 1s ease-in-out infinite',
				'fade-in': 'fade-in 0.6s ease-out',
				'gradient-shift': 'gradient-shift 3s ease infinite',
				'flip': 'flip 0.6s ease-out',
				'pulse-glow': 'pulse-glow 2s infinite',
				'shimmer': 'shimmer 2s infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
				glow: {
					'0%, 100%': { textShadow: '0 0 20px rgba(99, 102, 241, 0.5)' },
					'50%': { textShadow: '0 0 30px rgba(168, 85, 247, 0.8)' },
				},
				'slide-in-left': {
					'from': { opacity: '0', transform: 'translateX(-100px)' },
					'to': { opacity: '1', transform: 'translateX(0)' },
				},
				'slide-in-right': {
					'from': { opacity: '0', transform: 'translateX(100px)' },
					'to': { opacity: '1', transform: 'translateX(0)' },
				},
				'slide-in-up': {
					'from': { opacity: '0', transform: 'translateY(50px)' },
					'to': { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-in-down': {
					'from': { opacity: '0', transform: 'translateY(-50px)' },
					'to': { opacity: '1', transform: 'translateY(0)' },
				},
				'scale-pop': {
					'0%': { opacity: '0', transform: 'scale(0.9)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				'rotate-slow': {
					'from': { transform: 'rotate(0deg)' },
					'to': { transform: 'rotate(360deg)' },
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				blink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' },
				},
				'fade-in': {
					'from': { opacity: '0' },
					'to': { opacity: '1' },
				},
				'gradient-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				},
				flip: {
					'0%': { transform: 'rotateY(0deg)' },
					'100%': { transform: 'rotateY(360deg)' },
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.7)' },
					'50%': { boxShadow: '0 0 0 10px rgba(99, 102, 241, 0)' },
				},
				shimmer: {
					'0%': { backgroundPosition: '-1000px 0' },
					'100%': { backgroundPosition: '1000px 0' },
				},
			},
		},
	},
	plugins: [],
}
