import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import BookingsManagementPage from './pages/BookingsManagementPage';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/book',
  component: BookingPage,
});

const managementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/manage',
  component: BookingsManagementPage,
});

const routeTree = rootRoute.addChildren([indexRoute, bookingRoute, managementRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
