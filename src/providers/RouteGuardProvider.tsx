'use client';

import Loader from '@/components/common/Loader';
import { PROTECTED_ROUTES } from '@/constants/protectedRoutes';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function RouteGuardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (isLoading) {
    return <Loader />;
  }
  if (isProtectedRoute && !user) {
    router.push('/login');
    return null;
  }

  return <>{children}</>;
}
