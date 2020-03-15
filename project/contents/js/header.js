animateCSS = (element, animationName, callback) => {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

var title = { element: $('header>h1')[0], selector: 'header>h1', visible: true }
var articlesOffset = []
var lastScroll = 0
for(var i = 0; i < $('body>section')[0].children.length; i++) {
    console.log($('body>section')[0].children[i].offsetTop);
    $('body>section')[0].children[i].visibility = 'hidden'
    articlesOffset.push({ offset: $('body>section')[0].children[i].offsetTop, visible: false});
}

articleShowing = (tmpys, e) => {
    animateCSS(`body>section>article${tmpys > 0 ? `:nth-child(${tmpys+1})`:''}`, 'slideInUp', () => {
        $('body>section')[0].children[tmpys].style.visibility = 'visible'
        e.visible = true
    })
}

document.onscroll = () => {
    if(title.visible == true && window.scrollY > window.innerHeight*6/10) {
        animateCSS(title.selector, 'fadeOutUp', () => {title.visible = false; title.element.style.display = "none"})
    }
    else if(title.visible == false && window.scrollY < window.innerHeight*6/10) {
        title.element.style.display = "block"
        animateCSS(title.selector, 'fadeInDown', () => {title.visible = true})
    }
    ys = 0
    articlesOffset.forEach((e) => {
        if(ys < articlesOffset.length-1) {
            if(e.visible == false && lastScroll < window.scrollY && window.scrollY + window.innerHeight*9.5/10 > e.offset) {
                articleShowing(ys, e)
                
            } else if(e.visible == true && lastScroll > window.scrollY && window.scrollY + window.innerHeight*9.5/10 <= e.offset) {
                $('body>section')[0].children[ys].style.visibility = 'hidden'
                e.visible = false
            }
            ys++
        }
    })
    lastScroll = window.scrollY
}