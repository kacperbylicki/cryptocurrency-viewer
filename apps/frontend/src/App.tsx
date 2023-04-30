import './assets/styles/App.scss';
import { AuthProvider } from './context/AuthContext';
import { LoaderProvider } from './context/LoaderContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Root } from './Root';
import { ToastNotificationProvider } from './context/ToastNotificationContext';

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastNotificationProvider>
        <AuthProvider>
          <LoaderProvider>
            <Root />
            <ReactQueryDevtools initialIsOpen={false} />
          </LoaderProvider>
        </AuthProvider>
      </ToastNotificationProvider>
    </QueryClientProvider>
  );
};

export default App;
