import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import RoleBasedRoute from './components/RoleBasedRoute'
import Layout from './components/Layout'
import settingsService from './services/settingsService'
import LoadingSpinner from './components/LoadingSpinner'

// Pages
import Login from './pages/Login'
const LoginHelp = lazy(() => import('./components/LoginHelp'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Stock = lazy(() => import('./pages/Stock'))
const Products = lazy(() => import('./pages/Products'))
const Bills = lazy(() => import('./pages/Bills'))
const CreateEditBill = lazy(() => import('./pages/CreateEditBill'))
const Customers = lazy(() => import('./pages/Customers'))
const Suppliers = lazy(() => import('./pages/Suppliers'))
const Insightful = lazy(() => import('./pages/Insightful'))
const Reports = lazy(() => import('./pages/Reports'))
const Contact = lazy(() => import('./pages/Contact'))
const Employees = lazy(() => import('./pages/Employees'))
const Income = lazy(() => import('./pages/Income'))
const Manage = lazy(() => import('./pages/Manage'))
const Settings = lazy(() => import('./pages/Settings'))

const RouteLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
)

function App() {
  // Initialize settings on app load
  useEffect(() => {
    settingsService.initializeSettings()
  }, [])

  // Test if basic React is working
  const isTestMode = window.location.pathname === '/test';
  
  if (isTestMode) {
    return <TestPage />;
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/help" element={<Suspense fallback={<RouteLoader />}><LoginHelp /></Suspense>} />
            
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Suspense fallback={<RouteLoader />}><Dashboard /></Suspense>} />
              <Route path="stock" element={<Suspense fallback={<RouteLoader />}><Stock /></Suspense>} />
              <Route path="products" element={<Suspense fallback={<RouteLoader />}><Products /></Suspense>} />
              <Route path="bills" element={<Suspense fallback={<RouteLoader />}><Bills /></Suspense>} />
              <Route path="bills/create" element={<Suspense fallback={<RouteLoader />}><CreateEditBill /></Suspense>} />
              <Route path="bills/:id/edit" element={<Suspense fallback={<RouteLoader />}><CreateEditBill /></Suspense>} />
              <Route path="customers" element={<Suspense fallback={<RouteLoader />}><Customers /></Suspense>} />
              <Route path="suppliers" element={<Suspense fallback={<RouteLoader />}><Suppliers /></Suspense>} />
              <Route path="insightful" element={<Suspense fallback={<RouteLoader />}><Insightful /></Suspense>} />
              <Route path="reports" element={<Suspense fallback={<RouteLoader />}><Reports /></Suspense>} />
              <Route path="contact" element={<Suspense fallback={<RouteLoader />}><Contact /></Suspense>} />
              <Route path="employees" element={
                <RoleBasedRoute allowedRoles={['admin', 'manager']}>
                  <Suspense fallback={<RouteLoader />}><Employees /></Suspense>
                </RoleBasedRoute>
              } />
              <Route path="income" element={<Suspense fallback={<RouteLoader />}><Income /></Suspense>} />
              <Route path="manage" element={<Suspense fallback={<RouteLoader />}><Manage /></Suspense>} />
              <Route path="profile" element={<Suspense fallback={<RouteLoader />}><Settings /></Suspense>} />
            </Route>
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        
          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#10B981',
                },
              },
              error: {
                style: {
                  background: '#EF4444',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App