import { StrictMode } from 'react'
import {Provider} from 'react-redux'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/features/counter/store.js'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,

  <Provider store={store}>
    <App />
  </Provider>
) ; 
