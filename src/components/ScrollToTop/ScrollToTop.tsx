import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export const ScrollToTop = () => {
  const { pathname } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const main = document.getElementById('conteudo')
    main?.focus()
  }, [pathname])

  return null
}
