import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CableProvider } from './context/CableContext';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <CableProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </QueryClientProvider>
        </CableProvider>
    </BrowserRouter>
)