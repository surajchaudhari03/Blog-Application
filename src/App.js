import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AdminLayout from './pages/Admin/AdminLayout';
import UserLayout from './pages/User/UserLayout';
import AdminDashboard from './pages/Admin/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute';
import BlogListPage from './pages/Admin/BlogListPage';
import BlogCreatePage from './pages/Admin/BlogCreatePage';
import BlogEditPage from './pages/Admin/BlogEditPage';
import CategoriesPage from './pages/Admin/CategoriesPage';
import QueriesListPage from './pages/Admin/QueriesListPage';
import ProfilePage from './pages/Admin/ProfilePage';
import CategoryBlogsPage from './pages/User/CategoryBlogsPage';
import BlogDetailsPage from './pages/User/BlogDetailsPage';
import ContactPage from './pages/User/ContactPage';
import AboutUsPage from './pages/User/AboutUsPage';
import HomePage from './pages/User/HomePage';
import RegisterPage from './pages/Auth/RegisterPage';
import LoginPage from './pages/Auth/LoginPage';


function App() {

  const { isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;  // Show loading while checking auth
  } 
  
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path='/' element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories/:categoryName/blogs" element={<CategoryBlogsPage />} />
          <Route path="/blogs/:blogId" element={<BlogDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Route>

        {/* Admin Routes (Protected) */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/blogs" element={<BlogListPage />} />
          <Route path="/admin/blogs/create" element={<BlogCreatePage />} />
          <Route path="/admin/blogs/:blogId/edit" element={<BlogEditPage />} />
          <Route path="/admin/categories" element={<CategoriesPage />} />
          <Route path="/admin/queries" element={<QueriesListPage />} />
          <Route path="/admin/profile" element={<ProfilePage />} />
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

      </Routes>
    </Router>
  );
}

export default App;
