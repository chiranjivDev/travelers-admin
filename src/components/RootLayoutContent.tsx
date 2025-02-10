// 'use client';

// import { usePathname } from 'next/navigation';
// import { ReactNode } from 'react';
// import Navigation from './Navigation';
// import Footer from './Footer';
// import { AuthProvider } from '@/contexts/AuthContext';
// import { SavedPackagesProvider } from '@/contexts/SavedPackagesContext';
// import { SavedTripsProvider } from '@/contexts/SavedTripsContext';
// import { NotificationProvider } from '@/contexts/NotificationContext';
// import { Provider } from 'react-redux';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import store from '../store/store';

// export default function RootLayoutContent({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const isAdminRoute = pathname.startsWith('/admin');

//   return (
//     <Provider store={store}>
//       <AuthProvider>
//         <NotificationProvider>
//           <SavedPackagesProvider>
//             <SavedTripsProvider>
//               <div className="flex flex-col min-h-screen">
//                 {!isAdminRoute && <Navigation />}
//                 <main className="flex-grow">{children}</main>
//                 {!isAdminRoute && <Footer />}
//               </div>
//               <ToastContainer />
//             </SavedTripsProvider>
//           </SavedPackagesProvider>
//         </NotificationProvider>
//       </AuthProvider>
//     </Provider>
//   );
// }

'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { SavedPackagesProvider } from '@/contexts/SavedPackagesContext';
import { SavedTripsProvider } from '@/contexts/SavedTripsContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store, { persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function RootLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  // hide footer for chat page
  const isChatPage = pathname.startsWith('/chat');

  // Manage loading state for persisted store
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    persistor.subscribe(() => {
      if (persistor.getState().bootstrapped) {
        setIsHydrated(true);
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <NotificationProvider>
            <SavedPackagesProvider>
              <SavedTripsProvider>
                <div className="flex flex-col min-h-screen">
                  {!isAdminRoute && <Navigation />}
                  <main className="flex-grow">{children}</main>
                  {!isAdminRoute && !isChatPage && <Footer />}
                </div>
                <ToastContainer />
              </SavedTripsProvider>
            </SavedPackagesProvider>
          </NotificationProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}
