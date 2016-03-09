
import moment from 'moment'

export default function (input, excludeSuffix) {
	const suffix = excludeSuffix === true ? true : false
	return moment(input).fromNow(suffix)
}
