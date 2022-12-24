const removeViews = () => {
  const viewSelectors = ['div > a[href$="analytics"][role="link"]']
  viewSelectors.forEach((selector) =>
    document.querySelectorAll(selector).forEach((view) => {
      const parent = view.parentElement
      if (parent.parentElement.children.length === 1)
        parent.parentElement.remove()
      else parent.remove()
    })
  )
}

const target = document.querySelector('html')
const config = { attributes: true, childList: true, subtree: true }
const callback = (mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList' || mutation.type === 'attributes') {
      removeViews()
    }
  }
}

const observer = new MutationObserver(callback)
observer.observe(target, config)
