import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */

// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
// https://kit.svelte.dev/docs/configuration
// https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html

const config = {
	kit: {
		csp: {
			directives: {
				'script-src': ['self', 'data:', 'https://cdn.jsdelivr.net'],
				'img-src': ['self', 'data:'],
				'style-src': ['self', 'https://cdn.jsdelivr.net']
			}
		},
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()

	}
};

export default config;
