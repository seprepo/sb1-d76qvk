import { AlfrescoApi, NodesApi, Node } from '@alfresco/js-api';
import { FileSystemNode } from '../types/FileSystem';

export class AlfrescoService {
  private api: AlfrescoApi;
  private nodesApi: NodesApi;

  constructor(config: {
    hostEcm: string;
    contextRoot?: string;
    provider?: string;
  }) {
    this.api = new AlfrescoApi({
      hostEcm: config.hostEcm,
      contextRoot: config.contextRoot || '/alfresco',
      provider: config.provider || 'ECM'
    });
    this.nodesApi = new NodesApi(this.api);
  }

  async login(username: string, password: string): Promise<string> {
    try {
      const response = await this.api.login(username, password);
      return response.ticket;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  setTicket(ticket: string): void {
    this.api.setTicket(ticket);
  }

  async logout(): Promise<void> {
    try {
      await this.api.logout();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  async getNode(nodeId: string = '-my-'): Promise<FileSystemNode> {
    try {
      const response = await this.nodesApi.getNode(nodeId, {
        include: ['properties', 'path', 'permissions']
      });
      return this.mapNodeToFileSystem(response);
    } catch (error) {
      console.error('Error fetching node:', error);
      throw error;
    }
  }

  async getChildren(nodeId: string = '-my-'): Promise<FileSystemNode[]> {
    try {
      const response = await this.nodesApi.listNodeChildren(nodeId, {
        include: ['properties', 'path', 'permissions']
      });
      return response.list.entries.map(entry => this.mapNodeToFileSystem(entry.entry));
    } catch (error) {
      console.error('Error fetching children:', error);
      throw error;
    }
  }

  async createFolder(parentId: string, name: string, properties?: any): Promise<FileSystemNode> {
    try {
      const nodeBody = {
        name,
        nodeType: 'cm:folder',
        properties
      };
      parentId='70db23f3-008d-45de-8b5c-f40e2bfc167d';
      const response = await this.nodesApi.createNode(parentId, nodeBody);
      return this.mapNodeToFileSystem(response);
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  }

  async uploadFile(parentId: string, file: File): Promise<FileSystemNode> {
    try {
      const response = await this.nodesApi.uploadNode(parentId, file);
      return this.mapNodeToFileSystem(response);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  private mapNodeToFileSystem(node: Node): FileSystemNode {
    return {
      id: node.id,
      name: node.name,
      type: node.isFolder ? 'folder' : 'file',
      created: node.createdAt,
      createdBy: node.createdByUser.displayName,
      children: [], // Will be populated when needed
      path: node.path?.name || '',
      properties: node.properties
    };
  }

  // Méthodes additionnelles pour d'autres opérations
  async deleteNode(nodeId: string): Promise<void> {
    try {
      await this.nodesApi.deleteNode(nodeId);
    } catch (error) {
      console.error('Error deleting node:', error);
      throw error;
    }
  }

  async moveNode(nodeId: string, targetParentId: string): Promise<FileSystemNode> {
    try {
      const response = await this.nodesApi.moveNode(nodeId, { targetParentId });
      return this.mapNodeToFileSystem(response);
    } catch (error) {
      console.error('Error moving node:', error);
      throw error;
    }
  }

  async updateNode(nodeId: string, properties: any): Promise<FileSystemNode> {
    try {
      const response = await this.nodesApi.updateNode(nodeId, { properties });
      return this.mapNodeToFileSystem(response);
    } catch (error) {
      console.error('Error updating node:', error);
      throw error;
    }
  }

  async getSiteTreeData(siteId: string) {
    try {
      // Get the documentLibrary node for the specific site
      const docLibNode = await this.nodesApi.getNode('-root-', {
        relativePath: `/Sites/${siteId}/documentLibrary`
      });

      // Get all children recursively
      return this.getChildrenRecursively(docLibNode.entry.id);
    } catch (error) {
      console.error('Error fetching site tree data:', error);
      throw error;
    }
  }

  private async getChildrenRecursively(nodeId: string) {
    try {
      const response = await this.nodesApi.listNodeChildren(nodeId, {
        include: ['properties', 'path', 'permissions'],
        maxItems: 100,
        orderBy: ['isFolder DESC', 'name ASC']
      });

      const children = await Promise.all(
        response.list.entries.map(async (entry) => {
          const node = entry.entry;
          if (node.isFolder) {
            node.children = await this.getChildrenRecursively(node.id);
            node.fileCount = node.children.filter(child => child.type === 'file').length;
          }
          return node;
        })
      );

      return children;
    } catch (error) {
      console.error(`Error fetching children for node ${nodeId}:`, error);
      return [];
    }
  }
} 