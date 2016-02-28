
import scrollTo from 'scroll-to'

export default function (e) {
	if (e.preventDefault) {
		e.preventDefault()
	}
	const anchor = document.querySelector(e.target.hash)
	const offset = document.body.getBoundingClientRect().top
	const top = anchor.getBoundingClientRect().top
	const target = top - offset
	scrollTo(0, target, { ease: 'out-expo', duration: 500 })
	window.location.hash = e.target.hash
}
