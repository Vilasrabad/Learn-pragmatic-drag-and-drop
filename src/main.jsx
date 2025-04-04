import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { TodoProvider } from './context/TodoData.jsx';
import { DataProvider } from './context/Peoples.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoProvider>
      <DataProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DataProvider>
    </TodoProvider>
  </StrictMode>,
)
