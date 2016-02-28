
import markdown from 'megamark'
import unescape from 'unescape'
import latex from 'katex'

const opts = {
	tokenizers: [{
		/** @user tokenizer */
		token: /(^|\s|\()@([A-z]+)/g,
		transform: function (all, separator, username) {
			return `${separator}<a href="/users/${username.toLowerCase()}">@${username.toLowerCase()}</a>`;
		}
	}, {
		/** #N comment tokenizer */
		token: /(^|\s|\()#(\d+)/g,
		transform: function (all, separator, index) {
			return `${separator}<a href="#comment-${index}">#${index.toLowerCase()}</a>`;
		}
	}],
	sanitize: false
}

export default function (input) {
	return math(markdown(input, opts))
}

/**
 * Render LaTeX strings to HTML
 */
function math (str) {
	return str.replace(/(^|\s|\>)%([^%]+)%/g, (match, separator, expression) => {
		let exp
		try {
			exp = latex.renderToString(unescape(expression), { throwOnError: false })
		} catch (err) { /** swallow errors */ }
		return `${separator}${exp}`
	})
}
