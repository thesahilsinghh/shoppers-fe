import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';
import { Signup } from './pages/authPages/Signup';
import { VerifyOTP } from './pages/authPages/verify-otp';
import { Login } from './pages/authPages/Login';
import { UserSettings } from './pages/UserSettingsPage';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen  flex flex-row items-center justify-center bg-base-200 relative ">
    <AuthProvider>
        <Routes>
          <Route path="/signup" element={
            <ProtectedRoute requireAuth={false} redirectTo="/login">
              <Signup />
            </ProtectedRoute>
          } />
          <Route path="/verify-otp" element={
              <VerifyOTP />

          } />
          <Route path="/login" element={
              <Login />
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute requireAuth={true} redirectTo="/login" role="admin">
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute requireAuth={true} redirectTo="/login" role="admin">
              <UserSettings />
            </ProtectedRoute>
          } />

        </Routes>
    </AuthProvider>
    </div>
  );
}

export default App;