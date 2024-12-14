import { useEffect, useState } from 'react';
import { AlfrescoService } from '../../services/AlfrescoService';
import { FileSystemNode } from '../../types/FileSystem';
import { FileTreeView } from '../FileTreeView';

interface AlfrescoFileTreeProps {
  siteId: string;
  onNodeSelect?: (node: FileSystemNode) => void;
  alfrescoService: AlfrescoService;
}

export const AlfrescoFileTree: React.FC<AlfrescoFileTreeProps> = ({ 
  siteId, 
  onNodeSelect,
  alfrescoService 
}) => {
  const [treeData, setTreeData] = useState<FileSystemNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTreeData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await alfrescoService.getSiteTreeData(siteId);
        setTreeData(data);
      } catch (error) {
        console.error('Error loading tree data:', error);
        setError('Failed to load folder structure');
      } finally {
        setLoading(false);
      }
    };

    loadTreeData();
  }, [siteId, alfrescoService]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return <FileTreeView data={treeData} onNodeSelect={onNodeSelect} />;
};