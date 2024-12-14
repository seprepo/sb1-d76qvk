import { useState, useEffect } from 'react';
import { alfrescoService } from '../services/alfrescoConfig';

export const useAlfrescoAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        await alfrescoService.initialize();
        
        if (mounted) {
          setIsAuthenticated(alfrescoService.isLoggedIn());
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          console.error('Error initializing Alfresco:', err);
          setError('Failed to connect to Alfresco. Please check your configuration.');
          setIsAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  return { isAuthenticated, isLoading, error };
};