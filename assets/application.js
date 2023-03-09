const elements = {
  body: document.body,
  panel: document.querySelector('.offset-nav-panel'),
}

/* ************************************************ */
/* Store States                                     */
/* ************************************************ */
const store = Vue.reactive({
  state: {
    cartState: [],
    panelState: [['', '', '', '']],
    storePriceState: [],
    storeModalPos: 0,
    storeModalView: false,
    storeVariantId: '',
    storeVariantStyle: '',
    storeVariantLoading: false,
    storeButtonLoader: false,
  },
  addOverflow() {
    elements.body.style.overflowY = 'hidden'
    document.addEventListener('keydown', store.handleStoreKeyDown, false)
  },
  removeOverflow() {
    elements.body.style.overflowY = ''
    document.removeEventListener('keydown', store.handleStoreKeyDown, false)
  },
  handleStoreKeyDown({ keyCode }) {
    if (keyCode === 27) {
      store.state.storeModalPos = 0
      store.state.storeModalView = false
      store.removeOverflow()
    }
  },
  async getCart(saveToBag) {
    let url = '/cart.js'
    try {
      const response = await axios.get(url)
      const data = await response.data
      this.state.cartState.unshift(data)
      if (saveToBag) toggleOffsetRightState.openCart()
    } catch (error) {
      console.log(error)
    }
  },
  async getRecommendation() {
    let url = '/recommendations/products.json?product_id=6932613365900&limit=8'
    try {
      const response = await axios.get(url)
      const data = await response.data
    } catch (error) {
      console.log(error)
    }
  },
})

/* ************************************************ */
/* Header Menu States                               */
/* ************************************************ */

const dimension = Vue.reactive({
  scrollY: 0,
  windowWidth: null,
  headerStickyState: false,
  headerHiddenState: false,
})

const handleScroll = () => {
  dimension.scrollY =
    window.scrollY || window.pageYOffset || document.documentElement.scrollTop
}

const handleResize = () => {
  dimension.windowWidth = window.innerWidth
}

const toggleHeaderModalState = {
  addOverflow() {
    elements.body.style.overflowY = 'hidden'
  },
  removeOverflow() {
    elements.body.style.overflowY = ''
  },
}

window.addEventListener('scroll', handleScroll)
window.addEventListener('resize', handleResize)
handleScroll()
handleResize()

/* ************************************************ */
/* Toggle Search App State                       */
/* ************************************************ */

const searchAppState = Vue.reactive({
  modal: '',
})

const toggleSearchAppState = {
  showSearch() {
    elements.body.style.overflowY = 'hidden'
    searchAppState.modal = 'modal-on'
  },
  hideSearch() {
    elements.body.style.overflowY = ''
    searchAppState.modal = 'modal-off'
  },
  addKeyDown() {
    document.addEventListener('keydown', handleSearchAppKeyDown, false)
  },
  removeKeyDown() {
    document.removeEventListener('keydown', handleSearchAppKeyDown, false)
  },
}

const handleSearchAppKeyDown = ({ keyCode }) => {
  if (keyCode === 27) {
    toggleSearchAppState.hideSearch()
    toggleSearchAppState.removeKeyDown()
  }
}

/* ************************************************ */
/* Toggle Device Filter State                       */
/* ************************************************ */

const deviceModalState = Vue.reactive({
  hidden: true,
})

const toggleDeviceFilterState = {
  showFilter() {
    elements.body.style.overflowY = 'hidden'
    deviceModalState.hidden = false
  },
  hideFilter() {
    elements.body.style.overflowY = ''
    deviceModalState.hidden = true
  },
}

/* ************************************************ */
/* Toggle Left & Right Offset Menu States           */
/* ************************************************ */

const offsetLeftState = Vue.reactive({
  hidden: true,
})

const offsetRightState = Vue.reactive({
  hidden: true,
})

const offsetModalState = Vue.reactive({
  hidden: true,
})

const toggleOffsetLeftState = {
  openMenu() {
    elements.body.style.overflowY = 'hidden'
    offsetLeftState.hidden = false
    offsetRightState.hidden = true
    offsetModalState.hidden = false
  },
  addKeyDown() {
    document.addEventListener('keydown', handleOffsetKeyDown, false)
  },
}

const toggleOffsetRightState = {
  openCart() {
    elements.body.style.overflowY = 'hidden'
    offsetLeftState.hidden = true
    offsetRightState.hidden = false
    offsetModalState.hidden = false
  },
  addKeyDown() {
    document.addEventListener('keydown', handleOffsetKeyDown, false)
  },
}

const toggleOffsetStates = {
  closeAll() {
    elements.body.style.overflowY = ''
    offsetLeftState.hidden = true
    offsetRightState.hidden = true
    offsetModalState.hidden = true
  },
  removeKeyDown() {
    document.removeEventListener('keydown', handleOffsetKeyDown, false)
  },
  clearPanelState() {
    setTimeout(() => {
      store.state.panelState = [['', '', '', '']]
    }, 300)
  },
}

const handleOffsetKeyDown = ({ keyCode }) => {
  if (keyCode === 27) {
    toggleOffsetStates.closeAll()
  }
}

/* ************************************************ */
/* SmoothScrollTo for all browsers                  */
/* ************************************************ */

const smoothScrollTo = (endX, endY, duration) => {
  const startX = window.scrollX || window.pageXOffset
  const startY = window.scrollY || window.pageYOffset
  const distanceX = endX - startX
  const distanceY = endY - startY
  const startTime = new Date().getTime()
  duration = typeof duration !== 'undefined' ? duration : 400
  // easing
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from
  }
  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime
    const newX = easeInOutQuart(time, startX, distanceX, duration)
    const newY = easeInOutQuart(time, startY, distanceY, duration)
    if (time >= duration) {
      clearInterval(timer)
    }
    window.scroll(newX, newY)
  }, 1000 / 60) // 60 fps
}
