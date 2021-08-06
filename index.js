// Image sources
const IMAGE_URLS = [
  'https://picsum.photos/200/300',
  'https://picsum.photos/200',
  'https://picsum.photos/id/237/200/300',
  'https://picsum.photos/seed/picsum/200/300',
  'https://picsum.photos/200/300?grayscale',
  'https://picsum.photos/200/300/?blur'
]
const IMAGE_URL_LENGTH = IMAGE_URLS.length

// Get random url of test image
const getRandomImageUrl = () => {
  const random_idx = Math.floor(Math.random() * ((IMAGE_URL_LENGTH-1) - 0 + 1) + 0)
  // console.log(`random_idx`, random_idx)
  // console.log(`IMAGE_URLS[random_idx]`, IMAGE_URLS[random_idx])
  return IMAGE_URLS[random_idx]
}

// Create item element
const createItem = (itemNum) => {
  const itemElement = document.createElement('li')
  itemElement.className = 'item'
  const textElement = document.createElement('span')
  textElement.innerHTML = `Item ${itemNum+1}`
  itemElement.dataset.id = itemNum

  itemElement.append(textElement)
  
  return itemElement
}

// Append items
let itemIndex = 0
let loading_count = 0
const LOADING_ITEMS_BY_TICK = 20

const stack = document.querySelector('.stack')

const options = {
  root: stack,
  rootMargin: '0px',
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

        isLastItem(target, observer)
      } else { // Hide item
        target.classList.add('hide')
      }
    }
  })
}

const observer = new IntersectionObserver(observer_callBack, options)

const observingItems = (list) => {

  const observing_targets = list.querySelectorAll('.item')

  observing_targets.forEach( observing_target => {
    observer.observe(observing_target)
  })
}
const observingItem = (item) => {
  observer.observe(item)
}

// Loading items
const loadingItems = () => {
  loading_count += 1

  const max_count = loading_count * LOADING_ITEMS_BY_TICK
  for ( ; itemIndex < max_count ; itemIndex++) {
    const created_item = createItem(itemIndex)
    observingItem(created_item) // Observing
    stack.append(created_item)
  }
}

loadingItems()

const beforeLastItemNum = 5
// Compare to last item 
const isLastItem = (item) => {
  const { id:itemId } = item.dataset
  const lastItem = document.querySelector('.stack .item:last-child')
  const { id:lastItemId } = lastItem.dataset
  
  if (
    lastItemId >= beforeLastItemNum &&
    lastItemId - beforeLastItemNum <= itemId
  ) {
    console.log('Last item checked ✅')
    loadingItems()
    return true
  }
  return false
}

observingItems(stack)