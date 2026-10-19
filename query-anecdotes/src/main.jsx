import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotiContextProvider } from './provider/NotiProvider'

const query = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={query}>
    <NotiContextProvider>
      <App />
    </NotiContextProvider>
  </QueryClientProvider>
)