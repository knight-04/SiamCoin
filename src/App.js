import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './app/page/main_page';
import StepForm from './app/page/form';
import Product from './app/page/product';
import { ConfigProvider } from 'antd';
import thTH from 'antd/locale/th_TH';
import './App.css';

function App() {
  const theme = {
    token: {
      fontFamily: '"Prompt"',  
      colorPrimary: '#1890ff',
      borderRadius: 8,
    },
    components: {
      Typography: {
        fontFamily: '"Prompt"',
      },
      Button: {
        fontFamily: '"Prompt"',
      },
      Input: {
        fontFamily: '"Prompt"',
      },
      Select: {
        fontFamily: '"Prompt"',
      }
    }
  };

  return (
    <ConfigProvider locale={thTH} theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/form" element={<StepForm />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;