
import truncate from 'truncate-html'

const opts = {
	ellipsis: '…'
}

export default function (input, length) {
	return truncate(input, length, opts)
}
