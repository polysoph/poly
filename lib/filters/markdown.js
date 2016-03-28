
import markdown from 'megamark'
import unescape from 'unescape'
import latex from 'katex'


const opts = {
	tokenizers: [{
		/** @user tokenizer */
		token: /(^|\s|\()@([A-z]+)/g,
		transform: function (all, separator, username) {
			return `${separator}<a href="/users/${username.toLowerCase()}" class="user-link">@${username.toLowerCase()}</a>`
		}
	}, {
		/** #N comment tokenizer */
		token: /(^|\s|\()#(\d+)/g,
		transform: function (all, separator, index) {
			return `${separator}<a href="#comment-${index}">#${index.toLowerCase()}</a>`
		}
	}],
	sanitizer: {
		allowedAttributes: {
			a: ['href', 'name', 'target', 'class'],
			iframe: ['allowfullscreen', 'frameborder', 'src'],
			img: ['src'],
			h1: ['class'],
			p: ['class'],
			div: ['class'],
			aside: ['class'],
			span: ['tooltip', 'title']
		},
		allowedClasses: {
			span: ['highlight', 'term']
		},
		allowedSchemes: ['http', 'https', 'mailto'],
		allowedTags: [
			'a', 'aside', 'article', 'b', 'blockquote', 'br', 'caption', 'code', 'del', 'details', 'div', 'em',
			'figure', 'figcaption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img', 'ins', 'kbd', 'li', 'main', 'ol',
			'p', 'pre', 'section', 'span', 'strike', 'strong', 'sub', 'summary', 'sup', 'table',
			'tbody', 'td', 'th', 'thead', 'tr', 'ul'
		]
	}
}

export default function (input) {
	return math(markdown(input, opts))
}

/**
 * Render LaTeX strings to HTML
 */
function math (str) {
	// Block
	const blockPass = str.replace(/(^|\s|\>)%%([^%]+)%%/g, (match, separator, expression) => {
		let exp
		try {
			exp = latex.renderToString(unescape(expression), { displayMode: true, throwOnError: false })
		} catch (err) { /** SWALLOW ERRORS */ }
		return `${separator}${exp}`
	})

	// Inline
	const inlinePass = blockPass.replace(/(^|\s|\>)%([^%]+)%/g, (match, separator, expression) => {
		let exp
		try {
			exp = latex.renderToString(unescape(expression), { throwOnError: false })
		} catch (err) { /** swallow errors */ }
		return `${separator}${exp}`
	})

	return inlinePass
}
