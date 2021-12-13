//-- common
function show(element) {
    element.classList.remove("hidden")
}
function hide(element) {
    element.classList.add("hidden")
}
function move(element, e) {
    element.style.left = e.clientX + 'px'
    element.style.top = e.clientY + 'px'
}

//-- cursor customize
const cursorDiv = document.querySelector('#cursor')
document.addEventListener('mouseenter', () => { show(cursorDiv) })
document.addEventListener('mouseleave', () => { hide(cursorDiv) })
document.addEventListener('mousemove', e => {
    const allElements = document.querySelectorAll('*')
    for (let cnt in allElements) {
        if (!isNaN(Number(cnt)) && window.getComputedStyle(allElements[cnt]).cursor != 'none') {
            // hide custom cursorDiv if there is another cursorDiv defined
            console.log(window.getComputedStyle(allElements[cnt]).cursor)
            hide(cursorDiv)
            return
        }
    }
    show(cursorDiv)
    move(cursorDiv, e)
})

//-- dark-mode
function convertColor(color) {
    if (!color.includes('rgba')) {
        let rgb = color.substring(4, color.length - 1).split(',')
        return `rgb(${255 - rgb[0]},${255 - rgb[1]}, ${255 - rgb[2]})`
    }
    return color
}
const darkMode = document.querySelector('.innertog')
function activeDarkMode() {
    let parentWidth = window.getComputedStyle(darkMode.parentElement).width
    let childWidth = window.getComputedStyle(darkMode).width
    let childMargin = window.getComputedStyle(darkMode).marginLeft
    darkMode.style.marginLeft = `calc(${parentWidth} - ${childWidth} - ${childMargin})`
    const allElements = document.querySelectorAll('*')
    for (let cnt in allElements) {
        if (!isNaN(Number(cnt))) {
            allElements[cnt].style.color = convertColor(window.getComputedStyle(allElements[cnt]).color)
            allElements[cnt].style.backgroundColor = convertColor(window.getComputedStyle(allElements[cnt]).backgroundColor)
        }
    }
}
darkMode.addEventListener('click', activeDarkMode)

//-- modal open and close
const modal = document.querySelector('#modal')
const profile = document.querySelector('#profile')
profile.addEventListener('click', () => { show(modal) })
const modalClose = document.querySelector('#modfooter>div')
modalClose.addEventListener('click', () => { hide(modal) })

//-- image search with input
const textInput = document.querySelector('#header>input')
function search(e) {
    if (e.key == 'Enter') {
        window.open(`https://pixabay.com/ko/images/search/${textInput.value}`)
        textInput.value = ''
    }
}
textInput.addEventListener('keyup', search)

//-- reloading screen
const images = document.querySelectorAll('#container>ul>li>img')
const loadingScreens = document.createElement('div')
function progressLoading(image) {
    hide(image)
    const loadingScreen = document.createElement('div')
    loadingScreen.className = 'loadingScreen'
    loadingScreen.innerHTML = `
        <div>
            loading
            <div>
                <div>
                </div>
            </div>
        </div>`
    image.parentElement.insertBefore(loadingScreen, image.nextSibling)
    const loadingBar = image.parentElement.querySelector(':scope>div>div>div>div')
    const loadingBarWidth = parseInt(window.getComputedStyle(loadingBar).width)
    const loadingTime = (2 + Math.random() * 6) * 1000
    let cnt = 0
    const loadingInterval = setInterval(() => {
        if (cnt == 100) {
            clearInterval(loadingInterval)
            if (image.parentElement === loadingScreen.parentElement) {
                image.parentElement.removeChild(loadingScreen)
                show(image)
            }
            return
        }
        loadingBar.style.width = loadingBarWidth * cnt++ / 100 + 'px'
    }, loadingTime / 100)
}
function startLoading() {
    for (cnt in images)
        if (!isNaN(Number(cnt)))
            progressLoading(images[cnt])
}
startLoading()

//-- sidebar
const hamburger = document.querySelector('#hamburger')
const sidebar = document.querySelector('#sidebar')
hamburger.addEventListener('click', () => {
    if (hamburger.style.transform) {
        hide(sidebar)
        hamburger.style.transform = ''
    }
    else {
        show(sidebar)
        hamburger.style.transform = 'rotate(90deg)'
    }
})

//-- develop setting
//---- reloading
function interruptLoading() {
    for (cnt in images)
        if (!isNaN(Number(cnt))) {
            show(images[cnt])
            if (images[cnt].nextElementSibling.tagName != 'P')
                images[cnt].parentElement.removeChild(images[cnt].nextElementSibling)
        }
}
let reloading = false
const reload = document.querySelector("#reload")
function toggleView(e) {
    const target = e.target
    let parentWidth = window.getComputedStyle(target.parentElement).width
    let childWidth = window.getComputedStyle(target).width
    let childMargin = window.getComputedStyle(target).marginLeft
    target.style.marginLeft = `calc(${parentWidth} - ${childWidth} - ${childMargin})`
}
reload.firstElementChild.addEventListener('click', (e) => {
    toggleView(e)
    if (!reloading) {
        interruptLoading()
        startLoading()
        reloading = true
    }
    else {
        interruptLoading()
        reloading = false
    }
})