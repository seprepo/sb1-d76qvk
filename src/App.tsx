   // src/App.tsx
   import React from 'react';
   import { I18nextProvider } from 'react-i18next';
   import i18n from './i18n/i18n';
   import { FileTreeView } from './components/FileTreeView';
   import { Breadcrumbs } from './components/Layout/Breadcrumbs';
   import { ContentView } from './components/Layout/ContentView';
   import { sampleFileSystem } from './data/sampleData';
   import { useFileNavigation } from './hooks/useFileNavigation';
   import { AlfrescoService } from './services/AlfrescoService';
   import { useState } from 'react';
   import { AlfrescoFileTree } from './components/Layout/AlfrescoFileTree';

   function App() {
     const [isLoggedIn, setIsLoggedIn] = useState(false);
     const [error, setError] = useState<string | null>(null);

     const alfrescoService = new AlfrescoService({
       hostEcm: 'http://localhost:8080',
       contextRoot: '/alfresco'
     });

     const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
       event.preventDefault();
       const formData = new FormData(event.currentTarget);
       const username = formData.get('username') as string;
       const password = formData.get('password') as string;

       try {
         await alfrescoService.login(username, password);
         setIsLoggedIn(true);
         setError(null);
       } catch (err) {
         setError('Login failed. Please check your credentials.');
       }
     };

     const {
       currentPath,
       currentNode,
       handleNodeSelect,
       handleBreadcrumbNavigate,
     } = useFileNavigation();

     if (!isLoggedIn) {
       return (
         <div className="min-h-screen bg-gray-100 flex items-center justify-center">
           <div className="bg-white p-8 rounded-lg shadow-md w-96">
             <h2 className="text-2xl font-bold mb-6 text-center">Login to Alfresco</h2>
             {error && (
               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                 {error}
               </div>
             )}
             <form onSubmit={handleLogin}>
               <div className="mb-4">
                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                   Username
                 </label>
                 <input
                   type="text"
                   name="username"
                   id="username"
                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                   required
                 />
               </div>
               <div className="mb-6">
                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                   Password
                 </label>
                 <input
                   type="password"
                   name="password"
                   id="password"
                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                   required
                 />
               </div>
               <button
                 type="submit"
                 className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                 Login
               </button>
             </form>
           </div>
         </div>
       );
     }

     return (
       <I18nextProvider i18n={i18n}>
         <div className="min-h-screen bg-gray-100">
           <Breadcrumbs path={currentPath} onNavigate={handleBreadcrumbNavigate} />
           <div className="flex gap-0 p-0">
             <div className="w-1/4 bg-white rounded-lg shadow-md p-4">
               <AlfrescoFileTree
                 siteId="test"
                 onNodeSelect={handleNodeSelect}
                 alfrescoService={alfrescoService}
               />
             </div>
             <div className="w-3/4">
               <ContentView 
                 currentNode={currentNode} 
                 alfrescoService={alfrescoService}
                 onNavigate={handleNodeSelect}
               />
             </div>
           </div>
         </div>
       </I18nextProvider>
     );
   }

   export default App;