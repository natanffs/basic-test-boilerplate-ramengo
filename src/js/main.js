const MOBILE_BREAKPOINT = 846
const selection = {
  broth: '',
  meat: '',
}

document.getElementById('btn-order').onclick = scrollToSession
document.getElementById('cards-1').onscroll = () => handlePosition('cards-1')
document.getElementById('cards-2').onscroll = () => handlePosition('cards-2')

function submitOrder() {
  window.location.href = `success.html?broth=${selection.broth.toLowerCase().replace(' ', '_')}&meat=${selection.meat.toLowerCase().replace(' ', '_')}`
  return false
}

function scrollToSession() {
  document.getElementById(`${selection.broth !== '' ? 'meat' : 'broth'}-session-title`).scrollIntoView({ behavior: 'smooth' })
}

function checkSelection() {
  scrollToSession()

  if (selection.broth !== '' && selection.meat !== '') {
    const btn = document.getElementById('btn-place-order')

    btn.disabled = false
    btn.onclick = submitOrder
  }
}

function setUpItemsCards({ id, type }) {
  const cards = document.querySelectorAll(`.cards-${id}`)

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => {
      for (let j = 0; j < cards.length; j++) {
        if (j !== i) {
          cards[j].classList.remove('selected')
        } else {
          cards[j].classList.add('selected')
          selection[type] = cards[j].querySelector('.item-name').textContent
        }
      }

      if (screen.width < MOBILE_BREAKPOINT) {
        const element = document.getElementById(`cards-${id}`)
        const width = element.scrollWidth - document.documentElement.clientWidth
  
        const sliderBreakpoint = Math.round(width / (element.childElementCount - 1))
  
        let breakpoints = [0]
        for (let j = sliderBreakpoint; j <= width; j += sliderBreakpoint) {
          breakpoints.push(j)
        }
        breakpoints.push(width)
        
        element.scroll({ left: breakpoints[i], behavior: 'smooth' })
      }

      checkSelection()
    })
  }
}

setUpItemsCards({ id: 1, type: 'broth' })
setUpItemsCards({ id: 2, type: 'meat' })

function setIndicators({ id }) {
  const cardsElement = document.getElementById(`cards-${id}`)
  const indicator = document.getElementById(`indicator-${id}`)

  for (let i = 1; i <= cardsElement.childElementCount; i++) {
    const slider = document.createElement('span')
    slider.setAttribute('id', `cards-${id}-indicator-${i}`)
    slider.setAttribute('class', 'item-indicator')
    i === 1 && slider.classList.add('selected')

    indicator.appendChild(slider)
  }
}

setIndicators({ id: 1 })
setIndicators({ id: 2 })

function handlePosition(id) {
  const cardsElement = document.getElementById(id)
  const winScroll = cardsElement.scrollLeft
  const width = cardsElement.scrollWidth - document.documentElement.clientWidth

  const cardsQty = cardsElement.childElementCount
  const sliderBreakpoint = ((width / cardsQty) * 100) / width

  const breakpoints = Array.from(Array(cardsQty), (_, index) => index * sliderBreakpoint)
  const scrolled = Math.round((winScroll / width) * 100)

  breakpoints.forEach((item, index) => {
    if (scrolled >= item && scrolled <= (item + sliderBreakpoint)) {
      document.getElementById(`${id}-indicator-${index + 1}`).classList.add('selected')

      for (let indicator = 0; indicator < breakpoints.length; indicator++) {

        if (indicator !== index) {
          document.getElementById(`${id}-indicator-${indicator + 1}`).classList.remove('selected')
        }
      }
    }
  })
}