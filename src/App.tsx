import React from 'react';
import { CircularProgress } from '@mui/material';
import { FileTreeView } from './components/FileTreeView';
import { Breadcrumbs } from './components/Layout/Breadcrumbs';
import { ContentView } from './components/Layout/ContentView';
import { useFileNavigation } from './hooks/useFileNavigation';
import { useAlfrescoAuth } from './hooks/useAlfrescoAuth';

function App() {
  const { isAuthenticated, isLoading: authLoading, error } = useAlfrescoAuth();
  const {
    currentPath,
    currentNode,
    isLoading: navigationLoading,
    handleNodeSelect,
    handleBreadcrumbNavigate,
  } = useFileNavigation();

  if (authLoading || navigationLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (error || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error || 'Failed to authenticate with Alfresco'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Breadcrumbs path={currentPath} onNavigate={handleBreadcrumbNavigate} />
      <div className="flex gap-6 p-6">
        <div className="w-1/4 bg-white rounded-lg shadow-md p-4">
          <FileTreeView data={currentPath} onNodeSelect={handleNodeSelect} />
        </div>
        <div className="w-3/4">
          {currentNode && (
            <ContentView 
              currentNode={currentNode} 
              onNavigate={handleNodeSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;