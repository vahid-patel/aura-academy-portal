import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Suspense, lazy } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy loaded components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Students = lazy(() => import('./pages/Students'));
const Teachers = lazy(() => import('./pages/Teachers'));
const AdminControlPanel = lazy(() => import('./pages/AdminControlPanel'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Auth modals (non-lazy since they're small)
import { AuthModal } from '@/components/auth/AuthModal';

const queryClient = new QueryClient();

// Loading component with full screen skeleton
const PageSkeleton = () => (
  <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-primary mx-auto"></div>
      <Skeleton className="h-4 w-32 mx-auto" />
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/students"
                element={
                  <ProtectedRoute>
                    <Students />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/teachers"
                element={
                  <ProtectedRoute requireRole="ADMIN">
                    <Teachers />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/control-panel"
                element={
                  <ProtectedRoute >
                    <AdminControlPanel />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute requireRole="ADMIN">
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Redirects */}
              <Route path="/index" element={<Navigate to="/" replace />} />

              {/* Catch All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
