
import moment from 'moment'

export default function (input, excludeSuffix) {
	const suffix = excludeSuffix === true
	return moment(input).fromNow(suffix)
}
