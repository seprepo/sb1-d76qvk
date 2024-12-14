import React, { useState } from 'react';
import { Paper, Dialog, DialogContent } from '@mui/material';
import { FileSystemNode } from '../../types/FileSystem';
import { FileIcon } from '../FileIcon';
import { getFileType } from '../../utils/fileTypeUtils';
import { ContentListItem } from './ContentListItem';
import { ContentActions } from './ContentActions';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { AlfrescoService } from '../../services/AlfrescoService';

interface ContentViewProps {
  currentNode: FileSystemNode;
  alfrescoService: AlfrescoService;
  onNavigate?: (node: FileSystemNode) => void;
}

export const ContentView: React.FC<ContentViewProps> = ({ 
  currentNode, 
  alfrescoService,
  onNavigate 
}) => {
  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
  const { t } = useTranslation();

  const handleItemSelect = async (node: FileSystemNode) => {
    if (node.type === 'folder') {
      // If it's a folder and we have an onNavigate handler, use it
      if (onNavigate) {
        onNavigate(node);
      }
    } else {
      // Handle file selection
      console.log('Selected file:', node.name);
    }
  };

 /* const handleCreateFolder = (folderData: { name: string; title: string; description: string }) => {
    console.log('Create folder with data:', folderData);
    // Add your folder creation logic here
  };*/
  const handleCreateFolder = async (folderData: { name: string; title: string; description: string }) => {
    try {
      const properties = {
        'cm:title': folderData.title,
        'cm:description': folderData.description
      };
      await alfrescoService.createFolder(currentNode.id, folderData.name, properties);
      // Rafraîchir la vue après création
    } catch (error) {
      console.error('Error creating folder:', error);
      // Gérer l'erreur (afficher une notification, etc.)
    }
  };

  const handleUpload = () => {
    setUploadDialogOpen(true);
  };

  const handleCloseUploadDialog = () => {
    setUploadDialogOpen(false);
  };

  const onDrop = async (acceptedFiles: File[]) => {
    try {
      for (const file of acceptedFiles) {
        await alfrescoService.uploadFile(currentNode.id, file);
      }
      // Rafraîchir la vue après upload
      handleCloseUploadDialog();
    } catch (error) {
      console.error('Error uploading files:', error);
      // Gérer l'erreur
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  if (currentNode.type === 'file') {
    const fileType = getFileType(currentNode.name);
    return (
      <Paper className="p-6 h-full">
        <div className="flex items-center gap-3 mb-4">
          <FileIcon type="file" fileType={fileType} />
          <h2 className="text-xl font-semibold">{currentNode.name}</h2>
        </div>
        <p className="text-gray-600">File preview not available</p>
      </Paper>
    );
  }

  return (
    <Paper className="p-3 md:p-6 h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-3">
        <div className="flex items-center gap-3">
          <FileIcon type="folder" />
          <h2 className="text-lg md:text-xl font-semibold">{currentNode.name}</h2>
        </div>
        <ContentActions
          onCreateFolder={handleCreateFolder}
          onUpload={handleUpload}
        />
      </div>
      <div className="flex flex-col gap-2">
        {/* Display children if they exist, otherwise show empty message */}
        {currentNode.children && currentNode.children.length > 0 ? (
          currentNode.children.map((item) => (
            <ContentListItem
              key={item.id}
              item={item}
              onSelect={handleItemSelect}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            {t('noItemsFound')}
          </div>
        )}
      </div>
      <Dialog open={isUploadDialogOpen} onClose={handleCloseUploadDialog}>
        <DialogContent>
          <div {...getRootProps()} className="border-dashed border-2 p-6 text-center">
            <input {...getInputProps()} />
            <p>{t('dropzoneText')}</p>
          </div>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};