/* *********************************************************************** */
/* Initiate JavaScript                                                     */
/* *********************************************************************** */
const elementts = {
  revealBtn: document.querySelector('.reveal-btn'),
  customerPassword: document.getElementById('CustomerPassword'),
  registerPassword: document.getElementById('RegisterForm-password'),
  shareDetails: document.querySelector('.share-details'),
  shareCloseButton: document.querySelector('.share-button__close'),
  shareCopyButton: document.querySelector('.share-button__copy'),
  shareButtonMessage: document.querySelector('.share-button__message'),
  shareInputField: document.querySelector('.share-details .field__input'),
  shareInputLabel: document.querySelector('.share-details .field__label'),
  shareUrlInput: document.querySelector('.field__input'),
  urlToShare: '',
}

const REVEAL_ACTIVE_CLASS = 'active'
const FOOTER_DEVICE_MENU_ON_CLASS = 'active'
const SHARE_OPEN_CLASS = 'open'

document.addEventListener('click', (event) => {
  // Handle 'password' reveal button
  if (
    event.target.matches('.customer-form .field .reveal-btn') ||
    event.target.matches('.eye-open-svg') ||
    event.target.matches('.eye-closed-svg')
  ) {
    event.preventDefault()
    handlePasswordField()
  }
  // Handle 'open' share details
  else if (
    event.target.matches('.share-summary') ||
    event.target.matches('.icon.icon-share')
  ) {
    handleOpenShareDetails()
  }
  // Handle 'close' share details
  else if (
    event.target.matches('.share-button__close') ||
    event.target.matches('.close-svg')
  ) {
    handleOpenShareDetails()
  }
  // Handle 'share' copy url value
  else if (
    event.target.matches('.share-button__copy') ||
    event.target.matches('.icon.icon-clipboard')
  ) {
    handleShareCopyUrl()
  }
})

/* ***************************************************************************** */
/* JavaScript for 'password reveal' button                                       */
/* ***************************************************************************** */

const handlePasswordField = () => {
  const { revealBtn, customerPassword, registerPassword } = elementts
  // login password field
  if (customerPassword && customerPassword.type === 'password') {
    customerPassword.type = 'text'
    if (customerPassword != document.activeElement) customerPassword.focus()
  } else if (customerPassword && customerPassword.type === 'text') {
    customerPassword.type = 'password'
    if (customerPassword != document.activeElement) customerPassword.focus()
  }
  // register password field
  if (registerPassword && registerPassword.type === 'password') {
    registerPassword.type = 'text'
    if (registerPassword != document.activeElement) registerPassword.focus()
  } else if (registerPassword && registerPassword.type === 'text') {
    registerPassword.type = 'password'
    if (registerPassword != document.activeElement) registerPassword.focus()
  }
  revealBtn.classList.toggle(REVEAL_ACTIVE_CLASS)
}

/* ***************************************************************************** */
/* JavaScript for 'share' button'                                                */
/* ***************************************************************************** */

const handleOpenShareDetails = () => {
  const {
    shareDetails,
    shareCloseButton,
    shareCopyButton,
    shareButtonMessage,
    shareInputField,
    shareInputLabel,
  } = elementts

  shareCopyButton.classList.remove('hidden')
  shareCloseButton.classList.add('hidden')
  shareInputField.classList.remove('hidden')
  shareInputLabel.classList.remove('hidden')
  shareButtonMessage.classList.add('hidden')

  if (shareDetails.classList.contains(SHARE_OPEN_CLASS)) {
    shareDetails.classList.remove(SHARE_OPEN_CLASS)
  } else {
    shareDetails.classList.add(SHARE_OPEN_CLASS)
  }
}

const handleShareCopyUrl = () => {
  const {
    shareCloseButton,
    shareCopyButton,
    shareUrlInput,
    shareButtonMessage,
    shareInputField,
    shareInputLabel,
  } = elementts

  this.urlToShare = shareUrlInput.value
    ? shareUrlInput.value
    : document.location.href

  navigator.clipboard.writeText(urlToShare).then(() => {
    shareCopyButton.classList.add('hidden')
    shareCloseButton.classList.remove('hidden')
    shareInputField.classList.add('hidden')
    shareInputLabel.classList.add('hidden')
    shareButtonMessage.classList.remove('hidden')
  })
}
