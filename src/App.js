import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import "./App.css";
import { Suspense, lazy } from "react";

const LoginPage = lazy(() => import('./pages/login-page'));
const SignupPage = lazy(() => import('./pages/signup-page'));
const GenerateBrandContainer = lazy(() => import('./pages/generate-brand'));
const Header = lazy(() => import('./components/header'));
const EmailVerification = lazy(() => import('./pages/email-verification'));
const ResetPassword = lazy(() => import('./pages/reset-password'));
const DomainSocialHandleAvailabilityContainer = lazy(() => import('./pages/domain-social-availability'));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/generate-brand" element={<GenerateBrandContainer />} />
            <Route path="/domian-availability" element={<DomainSocialHandleAvailabilityContainer />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
