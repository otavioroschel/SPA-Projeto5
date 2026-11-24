import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ScrollToTop } from './components/ScrollToTop/ScrollToTop'
import { CartProvider } from './contexts/CartProvider'
import { ThemeProvider } from './contexts/ThemeProvider'
import { Checkout } from './pages/Checkout'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Success } from './pages/Success'

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
