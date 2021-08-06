// Image sources
const IMAGE_URLS = [
  'https://picsum.photos/200/300',
  'https://picsum.photos/200',
  'https://picsum.photos/id/237/200/300',
  'https://picsum.photos/seed/picsum/200/300',
  'https://picsum.photos/200/300?grayscale',
  'https://picsum.photos/200/300/?blur'
]
const getRandomImageUrl = () => {
  const random_idx = Math.floor(Math.random() * (5 - 0 + 1) + 0)
  // console.log(`random_idx`, random_idx)
  // console.log(`IMAGE_URLS[random_idx]`, IMAGE_URLS[random_idx])
  return IMAGE_URLS[random_idx]
}

// Append items
const ITEM_COUNT = 30

const stack = document.querySelector('.stack')

for (let idx = 0 ; idx < ITEM_COUNT ; idx++) { 
  const itemElement = document.createElement('li')
  itemElement.className = 'item'
  const textElement = document.createElement('span')
  textElement.innerHTML = `Item ${idx+1}`

  itemElement.append(textElement)

  stack.append(itemElement)
}

const options = {
  root: stack,
  rootMargin: '6px',
  threshold: 0.5,
}

const observer_callBack = (entries, observer) => {
  entries.forEach( entry => {
    const { target, isIntersecting } = entry
    
    if (!target.classList.contains('init')) {
      console.log('Intersecting check for >>', entry)
      if (isIntersecting) { // Show item
        const { background } = target?.style
        if (!background) {
          target.style.background = `url(${getRandomImageUrl()})`
        }
        target.classList.remove('hide')
        target.classList.add('init') // Add initialized flag for no hiding
      } else { // Hide item
        target.classList.add('hide')
      }
    }
  })
}

const observer = new IntersectionObserver(observer_callBack, options)

// observer.observe(stack)

const observing_targets = document.querySelectorAll('.stack li')

observing_targets.forEach( observing_target => {
  observer.observe(observing_target)
})