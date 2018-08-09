const GUEST_STATUS = 1001
const LOADING_LOGIN_STATUS = 1002
const LOADED_LOGIN_STATUS = 1003
const CREATED_MODE = 2001
const UPDATED_MODE = 2002
const DELETED_MODE = 2003

const API_URL = window.location.host.includes('localhost') 
	? 'http://localhost:3000'
	: window.location.toString().slice(0, -1)

const WS_URL = window.location.host.includes('localhost') 
	? 'http://localhost:1337' 
	: window.location.toString().slice(0, -1)

export {
  GUEST_STATUS, LOADED_LOGIN_STATUS, LOADING_LOGIN_STATUS, CREATED_MODE, UPDATED_MODE, DELETED_MODE,
  API_URL, WS_URL
}
