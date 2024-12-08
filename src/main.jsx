import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import './index.css';
import Auth from './pages/Auth.jsx';
import BlogList from './pages/BlogList.jsx';
import BlogDetails from './pages/BlogDetails.jsx';
import AddBlog from './pages/AddBlog.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/blog" element={<App />}>
            <Route path="blogList" element={<BlogList />} />
            <Route path="blogs/:id" element={<BlogDetails />} />
            <Route path="addPost" element={<AddBlog />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  </Provider>
);
