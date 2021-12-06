// add customize cursorDiv
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
const allElements = document.querySelectorAll('*')
const cursorDiv = document.querySelector('#cursor')
const body = document.body
document.addEventListener('mouseenter', () => { show(cursorDiv) })
document.addEventListener('mouseleave', () => { hide(cursorDiv) })
document.addEventListener('mousemove', e => {
    for (let cnt in allElements) {
        if (!isNaN(Number(cnt)) && window.getComputedStyle(allElements[cnt]).cursor != 'none') {
            // hide custom cursorDiv if there is another cursorDiv defined
            hide(cursorDiv)
            return
        }
    }
    show(cursorDiv)
    move(cursorDiv, e)
})
// add dark-mode
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
    for (let cnt in allElements) {
        if (!isNaN(Number(cnt))) {
            allElements[cnt].style.color = convertColor(window.getComputedStyle(allElements[cnt]).color)
            allElements[cnt].style.backgroundColor = convertColor(window.getComputedStyle(allElements[cnt]).backgroundColor)
        }
    }
}
darkMode.addEventListener('click', activeDarkMode)
darkMode.classList.t
// add modal close
const modal = document.querySelector('#modal')
const modalClose = document.querySelector('#modfooter>div')
modalClose.addEventListener('click', () => { hide(modal) })

// add image search
const textInput = document.querySelector('#header>input')
function search(e) {
    if (e.key == 'Enter') {
        window.open(`https://pixabay.com/ko/images/search/${textInput.value}`)
        textInput.value = ''
    }
}
textInput.addEventListener('keyup', search)
// loading
const images = document.querySelectorAll('#container>ul>li img')
console.log(images)
const loadingDiv = document.createElement('div')
function startLoading(image) {
    hide(image)
}
const loadingBarWidth = images[0].previousElementSibling.querySelector("div>div").style.width
function progressLoading(image) {
    let time = Math.random() * 7
    console.log(image)
    let loadingBar = image.previousElementSibling.querySelector("div>div")
    let loadingInterval = setInterval(() => { loadingBar.style.width += loadingBarWidth / 100 }, time / 100)
    setTimeout(() => {
        clearInterval(loadingInterval)
        hide(image.previousElementSibling)
        show(image)
    }, time);
}
for (cnt in images) {
    if (!isNaN(Number(cnt))) {
        {
            startLoading(images[cnt])
            progressLoading(images[cnt])
        }
    }
}