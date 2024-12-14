import { FileSystemNode } from '../types/FileSystem';

export const sampleFileSystem: FileSystemNode[] = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    children: [
      {
        id: '2',
        name: 'Work',
        type: 'folder',
        children: [
          {
            id: '3',
            name: 'annual_report.pdf',
            type: 'file'
          },
          {
            id: '4',
            name: 'quarterly_presentation.pptx',
            type: 'file'
          },
          {
            id: '5',
            name: 'budget.xlsx',
            type: 'file'
          }
        ]
      },
      {
        id: '6',
        name: 'Personal',
        type: 'folder',
        children: [
          {
            id: '7',
            name: 'Media',
            type: 'folder',
            children: [
              {
                id: '8',
                name: 'vacation.jpg',
                type: 'file'
              },
              {
                id: '9',
                name: 'family_video.mp4',
                type: 'file'
              },
              {
                id: '10',
                name: 'music.mp3',
                type: 'file'
              }
            ]
          },
          {
            id: '11',
            name: 'resume.docx',
            type: 'file'
          }
        ]
      }
    ]
  },
  {
    id: '12',
    name: 'Downloads',
    type: 'folder',
    children: [
      {
        id: '13',
        name: 'software_installer.exe',
        type: 'file'
      },
      {
        id: '14',
        name: 'archive.zip',
        type: 'file'
      }
    ]
  }
];