import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from './routes/Layout'
import DetailView from './routes/DetailView'
import NotFound from "./routes/NotFound"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
        </Route>
        <Route path="/coinDetails/:symbol" element={<DetailView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
