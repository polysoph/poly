
import moment from 'moment'

export default function (input, format) {
	return moment(input).format(format)
}
