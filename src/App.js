import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import "./App.css";
import { Suspense, lazy } from "react";

const LoginPage = lazy(() => import('./pages/login-page'));
const SignupPage = lazy(() => import('./pages/signup-page'));
const Home = lazy(() => import('./pages/home'));
const Header = lazy(() => import('./components/header'));
const EmailVerification = lazy(() => import('./pages/email-verification'));
const ResetPassword = lazy(() => import('./pages/reset-password'));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
