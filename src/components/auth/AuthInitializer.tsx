'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

const AuthInitializer = (): null => {
  const { initialize, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized]);

  return null;
};

export default AuthInitializer;

