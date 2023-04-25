import './assets/styles/App.scss';
import { AuthProvider } from './context/AuthContext';
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
          <Root />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </ToastNotificationProvider>
    </QueryClientProvider>
  );
};

export default App;
