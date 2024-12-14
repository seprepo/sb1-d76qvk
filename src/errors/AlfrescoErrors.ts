export class AlfrescoAuthError extends Error {
  status: number;
  
  constructor(message: string) {
    super(message);
    this.name = 'AlfrescoAuthError';
    this.status = 401;
  }
}

export class AlfrescoError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'AlfrescoError';
    this.status = status;
  }
} 