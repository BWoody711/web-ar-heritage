import adapter from '@sveltejs/adapter-static';

const config = {
    kit: {
        adapter: adapter({ fallback: '404.html' }),
		paths: {
            base: process.env.NODE_ENV === 'production' ? '/sveltekit-github-pages' : '',
        }
    },
};

export default config;
