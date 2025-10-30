import { Outlet } from 'react-router-dom';
import Header from '@/components/organisms/Header';

function Layout() {
  // App-level state and methods can be defined here and passed via outletContext
  // Example: const [appState, setAppState] = useState(null);
  // Then pass to Outlet: <Outlet context={{ appState, setAppState }} />
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;