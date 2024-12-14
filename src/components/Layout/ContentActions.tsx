import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions } from '@mui/material';
import { FolderPlus, Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ContentActionsProps {
  onCreateFolder: (folderData: { name: string; title: string; description: string }) => void;
  onUpload: () => void;
}

export const ContentActions: React.FC<ContentActionsProps> = ({
  onCreateFolder,
  onUpload,
}) => {
  const { t } = useTranslation();
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [folderData, setFolderData] = React.useState({
    name: '',
    title: '',
    description: ''
  });

  const handleSubmit = () => {
    onCreateFolder(folderData);
    setDialogOpen(false);
    setFolderData({ name: '', title: '', description: '' });
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <Button
        variant="contained"
        startIcon={<Upload size={18} />}
        onClick={onUpload}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {t('uploadFiles')}
      </Button>
      <Button
        variant="outlined"
        startIcon={<FolderPlus size={18} />}
        onClick={() => setDialogOpen(true)}
        className="border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        {t('newFolder')}
      </Button>

      <Dialog 
        open={isDialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('createFolder')}</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 pt-2">
            <TextField
              label={t('name')}
              value={folderData.name}
              onChange={(e) => setFolderData({ ...folderData, name: e.target.value })}
              fullWidth
            />
            <TextField
              label={t('title')}
              value={folderData.title}
              onChange={(e) => setFolderData({ ...folderData, title: e.target.value })}
              fullWidth
            />
            <TextField
              label={t('description')}
              value={folderData.description}
              onChange={(e) => setFolderData({ ...folderData, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>{t('cancel')}</Button>
          <Button onClick={handleSubmit} variant="contained">{t('create')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};