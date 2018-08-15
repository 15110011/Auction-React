const GUEST_STATUS = 1001
const LOADING_LOGIN_STATUS = 1002
const LOADED_LOGIN_STATUS = 1003
const CREATED_MODE = 2001
const UPDATED_MODE = 2002
const DELETED_MODE = 2003

const API_URL = window.location.host.includes('localhost')
	? 'http://localhost:3000'
	: `${window.location.protocol}//${window.location.host}`

const WS_URL = window.location.host.includes('localhost')
	? 'http://localhost:1337'
	: `${window.location.protocol}//${window.location.host}`

function fromMillisecondsToFormattedString(ms) {
	let h = Math.floor(ms / (3600 * 1000))
	let m = Math.floor((ms - (3600 * 1000 * h)) / (60 * 1000))
	let s = Math.floor((ms - (3600 * 1000 * h) - (60 * 1000 * m)) / (1000))
	return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
}
export {
	GUEST_STATUS, LOADED_LOGIN_STATUS, LOADING_LOGIN_STATUS, CREATED_MODE, UPDATED_MODE, DELETED_MODE,
	API_URL, WS_URL, fromMillisecondsToFormattedString
}

