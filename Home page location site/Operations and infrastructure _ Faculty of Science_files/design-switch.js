const STAFF_UI_ENVIRONMENT_COOKIE_NAME = 'staff-ui-environment'

let staffUiEnvironment

const cookies = document.cookie.split('; ')
for (let i = 0; i < cookies.length; i++) {
	const cookie = cookies[i].split('=')
	const name = decodeURIComponent(cookie[0])
	const value = decodeURIComponent(cookie[1])

	if (name === STAFF_UI_ENVIRONMENT_COOKIE_NAME) {
		staffUiEnvironment = value
	}
}

const windowWidth = document.createElement('span')
function displayWindowWidth() {
	windowWidth.textContent = window.innerWidth + 'px'
}

// Not prod
if (staffUiEnvironment != null) {
	const div = document.createElement('div')
	div.id = 'designSign'
	div.className = 'block-uom rounded-t-lg mr-4'

	div.appendChild(staffUiEnvironment != null ? document.createTextNode(staffUiEnvironment) : '')

	const breakpointIndicator = document.createElement('span')
	breakpointIndicator.innerHTML =
		' - ' +
		'<span class="inline sm:hidden">default (&lt; 640px)</span>' +
		'<span class="hidden sm:inline md:hidden">sm</span>' +
		'<span class="hidden md:inline lg:hidden">md</span>' +
		'<span class="hidden lg:inline xl:hidden">lg</span>' +
		'<span class="hidden xl:inline 2xl:hidden">xl</span>' +
		'<span class="hidden 2xl:inline 3xl:hidden">2xl</span>' +
		'<span class="hidden 3xl:inline">3xl</span>' +
		' - '
	div.appendChild(breakpointIndicator)
	div.appendChild(windowWidth)

	displayWindowWidth()
	window.addEventListener('resize', displayWindowWidth)

	const element = document.getElementsByClassName('page-inner') // Fetch the main-content element
	element[0].appendChild(div) // Append the div to the main-content element
}

// I'm not sure how many people still use this one, but I'm going to keep it here for now
function designSwitchSH() {
	// Is prod
	if (staffUiEnvironment == null) {
		setCookieAndReload(STAFF_UI_ENVIRONMENT_COOKIE_NAME, 'staging')
	} else {
		deleteCookieAndReload(STAFF_UI_ENVIRONMENT_COOKIE_NAME)
	}
}

function prod() {
	deleteCookieAndReload(STAFF_UI_ENVIRONMENT_COOKIE_NAME)
}

function staging() {
	setCookieAndReload(STAFF_UI_ENVIRONMENT_COOKIE_NAME, 'staging')
}

function dev() {
	setCookieAndReload(STAFF_UI_ENVIRONMENT_COOKIE_NAME, 'dev')
}

function local() {
	setCookieAndReload(STAFF_UI_ENVIRONMENT_COOKIE_NAME, 'local')
}

function getCookieValue(cookieName) {
	const cookieString = document.cookie
	const cookies = cookieString.split('; ')

	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].split('=')
		const name = decodeURIComponent(cookie[0])
		const value = decodeURIComponent(cookie[1])

		if (name === cookieName) {
			return value
		}
	}

	return null
}

function setCookieAndReload(name, value) {
	document.cookie = name + '=' + encodeURIComponent(value) + '; path=/; SameSite=None; secure'
	location.reload()
}

function deleteCookieAndReload(name) {
	document.cookie = name + '=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; secure'
	location.reload()
}
