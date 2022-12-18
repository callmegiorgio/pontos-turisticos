import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import serverUrl from './serverUrl'

if (serverUrl() === '') {
  console.warn(
    'Environment variable VITE_SERVER_URL is not defined. ' +
    'Requests to server API will error out.'
  );
}
else {
  console.info('Server API is at ' + serverUrl());
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
