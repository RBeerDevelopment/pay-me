const path = require('path');

module.exports = {
    stories: ['../components/**/*.stories.js'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        // '@storybook/addon-postcss',
    ],
    webpackFinal: async (baseConfig) => {
        const nextConfig = require('../next.config.js');
        // Resolve aliases used in project
        baseConfig.resolve = {
            alias: {
                components: path.resolve(__dirname, '../components'),
                shapes: path.resolve(__dirname, '../shapes'),
                lib: path.resolve(__dirname, '../lib'),
                styles: path.resolve(__dirname, '../styles'),
                public: path.resolve(__dirname, '../public'),
            },
        };
        // Needed for SVG importing using svgr
        const indexOfRuleToRemove = baseConfig.module.rules.findIndex((rule) =>
            rule.test.toString().includes('svg')
        );
        baseConfig.module.rules.splice(indexOfRuleToRemove, 1, {
            test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
            loader: require.resolve('file-loader'),
            options: {
                name: 'static/media/[name].[hash:8].[ext]',
                esModule: false,
            },
        });
        baseConfig.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        svgo: false,
                    },
                },
            ],
        });
        // Merge your next webpack config with this base
        return { ...nextConfig.webpack, ...baseConfig };
    },
};
