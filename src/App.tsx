import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { BlogArticlePage } from './pages/BlogArticlePage'
import { BlogIndexPage } from './pages/BlogIndexPage'
import { HomePage } from './pages/HomePage'
import { OfferPage } from './pages/OfferPage'
import { PaymentSuccessPage } from './pages/PaymentSuccessPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { RequisitesPage } from './pages/RequisitesPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogIndexPage />} />
          <Route path="blog/:slug" element={<BlogArticlePage />} />
          <Route path="offer" element={<OfferPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="requisites" element={<RequisitesPage />} />
          <Route path="payment/success" element={<PaymentSuccessPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
