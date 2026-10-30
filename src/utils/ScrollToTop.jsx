import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scroll to the top on navigation, or to the #hash target when the link has one
// (e.g. /contact#appointment). Pages are lazy-loaded, so wait for the target.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return undefined
    }

    let attempts = 0
    const timer = setInterval(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target || ++attempts > 30) {
        clearInterval(timer)
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 50)
    return () => clearInterval(timer)
  }, [pathname, hash])

  return null
}

export default ScrollToTop
