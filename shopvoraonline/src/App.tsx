import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Guide from './pages/Guide';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:title" element={<BlogPost />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Admin Route */}
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
