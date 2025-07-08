import AppRoutes from './app/routes';
import { AuthProvider } from './providers/AuthProvider';

function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}

export default App;
