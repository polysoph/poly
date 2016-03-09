
export default function (key, descending) {
	return function (a, b) {
		const dateA = new Date(a[key])
		const dateB = new Date(b[key])
		return dateB - dateA
	}
}
