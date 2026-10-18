import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const query=new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={query}>
    <App />
  </QueryClientProvider>
)