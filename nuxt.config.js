export default {
	target: 'server',
	head: {
		title: 'thronesking',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Courier+Prime:wght@700&display=swap', text: '0123456789' },
		],
	},
	loading: {
		color: 'var(--text-color-primary)',
	},

	css: ['bulma/css/bulma.min.css', 'hint.css/hint.min.css', '~/assets/app.css'],
	plugins: ['~/plugins/chartjs', '~/plugins/select.ts', '~/plugins/filters'],
	components: false,
	telemetry: false,
	buildModules: ['@nuxt/typescript-build', '@nuxtjs/stylelint-module'],
	modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/strapi'],

	pwa: {
		manifest: {
			lang: 'en',
		},
	},
	strapi: {
		url: process.env.STRAPI_URL || 'http://localhost:1337',
	},
	build: {
		extend (config) {
			config.resolve.alias.vue = 'vue/dist/vue.esm.js'
		},
		transpile: ['lodash-es'],
		postcss: {
			parser: require('postcss-comment'),
			plugins: {
				'postcss-import': {},
				'postcss-nested': {},
				'postcss-custom-properties': {},
			},
		},
	},
}
