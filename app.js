const cursor = document.querySelector('#cursor')
const body = document.body
function show(target) {
    target.classList.remove("hidden")
}
function hide(target) {
    target.classList.add("hidden")
}
function move(target, e) {
    target.style.left = e.clientX + 'px'
    target.style.top = e.clientY + 'px'
}
body.addEventListener('mouseenter', function () { show(cursor) })
body.addEventListener('mouseleave', function () { hide(cursor) })
body.addEventListener('mousemove', function (e) { move(cursor, e) })
function hoverOn(target) {
    target.classList.add("hover")
}
function hoverOff(target) {
    target.classList.remove("hover")
}
const li = document.querySelectorAll('#container>ul>li')
const modal = document.querySelector('#modal')
for (let i = 0; i < li.length; i++) {
    li[i].addEventListener('mouseenter', function () { hoverOn(li[i]) })
    li[i].addEventListener('mouseleave', function () { hoverOff(li[i]) })
}