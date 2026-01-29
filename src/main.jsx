import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./store/Auth.jsx";
// IMPORT BOTH ToastContainer AND Slide
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget the CSS import if you haven't added it elsewhere

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <App />
            <ToastContainer 
                position="top-right"
                autoClose={1300}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide} 
            />
        </AuthProvider>
    </StrictMode>
)