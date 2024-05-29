/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['www.plantuml.com'],
	},
	reactStrictMode: true,
	webpack(config) {
		config.experiments = { ...config.experiments, topLevelAwait: true };
		config.module.rules.push({
			test: /\.md$/,
			use: 'raw-loader',
		});
		config.module.rules.push({
			test: /\.svg$/,
			// issuer: {
			//   test: /\.(js|ts)x?$/,
			//  // for webpack 5 use
			//  // { and: [/\.(js|ts)x?$/] }
			// },

			use: ['@svgr/webpack'],
		});
		return config;
	},
};

module.exports = nextConfig;
