import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { OfferPage } from './pages/OfferPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { RequisitesPage } from './pages/RequisitesPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="offer" element={<OfferPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="requisites" element={<RequisitesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
