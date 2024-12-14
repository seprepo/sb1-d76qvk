import { AlfrescoApi, NodesApi } from '@alfresco/js-api';
import { environment } from '../config/environment';

const config = {
  hostEcm: environment.alfresco.host,
  provider: 'ECM',
  contextRoot: 'alfresco',
};

class AlfrescoService {
  private static instance: AlfrescoService;
  private api: AlfrescoApi;
  private nodesApi: NodesApi | null = null;
  private initialized = false;
  private initializationPromise: Promise<void> | null = null;

  private constructor() {
    this.api = new AlfrescoApi();
    this.api.setConfig(config);
  }

  public static getInstance(): AlfrescoService {
    if (!AlfrescoService.instance) {
      AlfrescoService.instance = new AlfrescoService();
    }
    return AlfrescoService.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this.initializeInternal();
    return this.initializationPromise;
  }

  private async initializeInternal(): Promise<void> {
    try {
      const { username, password } = environment.alfresco;
      const success = await this.login(username, password);
      
      if (!success) {
        throw new Error('Failed to login to Alfresco');
      }
      
      this.initialized = true;
    } catch (error) {
      this.initialized = false;
      this.initializationPromise = null;
      throw error;
    }
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      await this.api.login(username, password);
      this.nodesApi = new NodesApi(this.api);
      return true;
    } catch (error) {
      console.error('Error logging into Alfresco:', error);
      return false;
    }
  }

  getNodesApi(): NodesApi {
    if (!this.nodesApi || !this.initialized) {
      throw new Error('Nodes API not initialized. Please ensure login is called first.');
    }
    return this.nodesApi;
  }

  isLoggedIn(): boolean {
    return this.api.isLoggedIn();
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

export const alfrescoService = AlfrescoService.getInstance();