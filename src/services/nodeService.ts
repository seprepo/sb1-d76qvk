import { alfrescoService } from './alfrescoConfig';
import { FileSystemNode } from '../types/FileSystem';
import { getFileType } from '../utils/fileTypeUtils';

const ensureInitialized = async () => {
  if (!alfrescoService.isInitialized()) {
    await alfrescoService.initialize();
  }
};

export const fetchChildren = async (nodeId: string = '-my-'): Promise<FileSystemNode[]> => {
  try {
    await ensureInitialized();
    const nodesApi = alfrescoService.getNodesApi();
    const { list } = await nodesApi.getNodeChildren(nodeId, {
      include: ['properties'],
      orderBy: ['isFolder desc', 'name asc'],
    });

    return list.entries.map((entry) => ({
      id: entry.entry.id,
      name: entry.entry.name,
      type: entry.entry.isFolder ? 'folder' : 'file',
      fileType: entry.entry.isFolder ? undefined : getFileType(entry.entry.name),
      children: entry.entry.isFolder ? [] : undefined,
    }));
  } catch (error) {
    console.error('Error fetching node children:', error);
    throw error;
  }
};

export const fetchNodePath = async (nodeId: string): Promise<FileSystemNode[]> => {
  try {
    await ensureInitialized();
    const nodesApi = alfrescoService.getNodesApi();
    const { entry } = await nodesApi.getNode(nodeId, { include: ['path'] });
    const pathElements = entry.path.elements || [];
    
    const nodes = await Promise.all(
      pathElements.map(async (element) => {
        const { entry: nodeEntry } = await nodesApi.getNode(element.id);
        return {
          id: nodeEntry.id,
          name: nodeEntry.name,
          type: nodeEntry.isFolder ? 'folder' : 'file',
          fileType: nodeEntry.isFolder ? undefined : getFileType(nodeEntry.name),
          children: nodeEntry.isFolder ? [] : undefined,
        };
      })
    );

    nodes.push({
      id: entry.id,
      name: entry.name,
      type: entry.isFolder ? 'folder' : 'file',
      fileType: entry.isFolder ? undefined : getFileType(entry.name),
      children: entry.isFolder ? [] : undefined,
    });

    return nodes;
  } catch (error) {
    console.error('Error fetching node path:', error);
    throw error;
  }
};