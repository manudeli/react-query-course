import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { worker } from '@uidotdev/react-query-api'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useIsFetching } from '@tanstack/react-query'
import Loader from './components/Loader'
import FetchingIndicator from './components/FetchingIndicator'

const queryClient = new QueryClient()


new Promise((res) => setTimeout(res, 100))
  .then(() =>
    worker.start({
      quiet: true,
      onUnhandledRequest: 'bypass',
    })
  )
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <FetchingIndicator />
          <BrowserRouter>
            <div className="container">
              <App />
            </div>
          </BrowserRouter>
          <ReactQueryDevtools closeButtonProps={{ style: { width: 70 } }} />
        </QueryClientProvider>
      </React.StrictMode>,
      document.getElementById('root')
    )
  })
