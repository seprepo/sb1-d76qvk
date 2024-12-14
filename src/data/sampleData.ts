import { FileSystemNode } from '../types/FileSystem';

export const sampleFileSystem: FileSystemNode[] = [
  {
    "id": "1",
    "name": "Documents",
    "type": "folder",
    "created": "2023-10-01T10:00:00Z",
    "createdBy": "Alice",
    "children": [
      {
        "id": "2",
        "name": "0-MODELES",
        "type": "folder",
        "created": "2023-10-01T10:05:00Z",
        "createdBy": "Bob",
        "children": [
          {
            "id": "3",
            "name": "Conseils et bureau",
            "type": "folder",
            "created": "2023-10-01T10:10:00Z",
            "createdBy": "Charlie",
            "children": [
              {
                "id": "4",
                "name": "CR",
                "type": "folder",
                "created": "2023-10-01T10:15:00Z",
                "createdBy": "David",
                "children": [
                  { "id": "5", "name": "CC", "type": "folder", "created": "2023-10-01T10:20:00Z", "createdBy": "Eve", "children": [
                    {
                      "id": "21",
                      "name": "rapport_cc.pdf",
                      "type": "file",
                      "created": "2023-10-01T10:25:00Z",
                      "createdBy": "Frank"
                    },
                    {
                      "id": "22",
                      "name": "presentation_q3.pptx",
                      "type": "file",
                      "created": "2023-11-15T08:30:00Z",
                      "createdBy": "Alice"
                    },
                    {
                      "id": "23",
                      "name": "financial_data.xlsx",
                      "type": "file",
                      "created": "2023-09-10T14:45:00Z",
                      "createdBy": "Bob"
                    },
                    {
                      "id": "24",
                      "name": "project_plan.docx",
                      "type": "file",
                      "created": "2023-07-22T16:15:00Z",
                      "createdBy": "Eve"
                    },
                    {
                      "id": "25",
                      "name": "team_photo.png",
                      "type": "image",
                      "created": "2023-06-05T09:00:00Z",
                      "createdBy": "Charlie"
                    },
                    {
                      "id": "26",
                      "name": "monthly_report.csv",
                      "type": "file",
                      "created": "2023-12-01T13:20:00Z",
                      "createdBy": "Diana"
                    }
                      
                  ] },
                  { "id": "6", "name": "CM", "type": "folder", "created": "2023-10-01T10:30:00Z", "createdBy": "Grace", "children": [
                      { "id": "22", "name": "compte_rendu_cm.docx", "type": "file", "created": "2023-10-01T10:35:00Z", "createdBy": "Heidi" }
                  ] }
                ]
              },
              {
                "id": "7",
                "name": "Notices",
                "type": "folder",
                "created": "2023-10-01T10:40:00Z",
                "createdBy": "Alice",
                "children": [
                  { "id": "1008", "name": "CC", "type": "folder", "created": "2023-10-01T10:45:00Z", "createdBy": "Bob", "children": [
                      { "id": "23", "name": "notice_cc.txt", "type": "file", "created": "2023-10-01T10:50:00Z", "createdBy": "Charlie" }
                  ] },
                  { "id": "1009", "name": "CM", "type": "folder", "created": "2023-10-01T10:55:00Z", "createdBy": "David", "children": [
                      { "id": "24", "name": "notice_cm.pdf", "type": "file", "created": "2023-10-01T11:00:00Z", "createdBy": "Eve" }
                  ] }
                ]
              },
              {
                "id": "1010",
                "name": "ODJ",
                "type": "folder",
                "created": "2023-10-01T11:05:00Z",
                "createdBy": "Alice",
                "children": [
                  { "id": "11", "name": "CC", "type": "folder", "created": "2023-10-01T11:10:00Z", "createdBy": "Bob", "children": [
                      { "id": "25", "name": "ordre_jour_cc.docx", "type": "file", "created": "2023-10-01T11:15:00Z", "createdBy": "Charlie" }
                  ] },
                  { "id": "12", "name": "CM", "type": "folder", "created": "2023-10-01T11:20:00Z", "createdBy": "David", "children": [
                      { "id": "26", "name": "ordre_jour_cm.xlsx", "type": "file", "created": "2023-10-01T11:25:00Z", "createdBy": "Eve" }
                  ] }
                ]
              },
              {
                "id": "10131",
                "name": "PV",
                "type": "folder",
                "created": "2023-10-01T11:30:00Z",
                "createdBy": "Alice",
                "children": [
                  { "id": "14", "name": "CM", "type": "folder", "created": "2023-10-01T11:35:00Z", "createdBy": "Bob", "children": [
                      { "id": "27", "name": "pv_cm.pdf", "type": "file", "created": "2023-10-01T11:40:00Z", "createdBy": "Charlie" }
                  ] }
                ]
              }
            ]
          },
          { "id": "15", "name": "Décision du Maire", "type": "folder", "created": "2023-10-01T11:45:00Z", "createdBy": "Alice", "children": [
              { "id": "28", "name": "decision_maire.docx", "type": "file", "created": "2023-10-01T11:50:00Z", "createdBy": "Bob" }
          ] },
          { "id": "16", "name": "Délibération", "type": "folder", "created": "2023-10-01T11:55:00Z", "createdBy": "Alice", "children": [
              { "id": "29", "name": "deliberation.pdf", "type": "file", "created": "2023-10-01T12:00:00Z", "createdBy": "Bob" }
          ] },
          { "id": "17", "name": "Projet de délibération", "type": "folder", "created": "2023-10-01T12:05:00Z", "createdBy": "Alice", "children": [
              { "id": "30", "name": "projet_deliberation.pptx", "type": "file", "created": "2023-10-01T12:10:00Z", "createdBy": "Bob" }
          ] }
        ]
      },
      { "id": "18", "name": "1-ACTES CREATION", "type": "folder", "created": "2023-10-01T12:15:00Z", "createdBy": "Alice", "children": [
        {
          "id": "10081",
          "name": "vacation.jpg",
          "type": "file",
          "created": "2023-10-01T12:20:00Z",
          "createdBy": "Bob"
        },
        {
          "id": "10091",
          "name": "family_video.mp4",
          "type": "file",
          "created": "2023-10-01T12:25:00Z",
          "createdBy": "Charlie"
        },
        {
          "id": "10101",
          "name": "music.mp3",
          "type": "file",
          "created": "2023-10-01T12:30:00Z",
          "createdBy": "David"
        }
      ] },
      { "id": "19", "name": "2-ACTES REDACTION", "type": "folder", "created": "2023-10-01T12:35:00Z", "createdBy": "Alice", "children": [
          { "id": "31", "name": "acte_redaction.docx", "type": "file", "created": "2023-10-01T12:40:00Z", "createdBy": "Bob" }
      ] },
      { "id": "20", "name": "3-ACTES PUBLIÉS", "type": "folder", "created": "2023-10-01T12:45:00Z", "createdBy": "Alice", "children": [
        {
          "id": "1013",
          "name": "software_installer.exe",
          "type": "file",
          "created": "2023-10-01T12:50:00Z",
          "createdBy": "Bob"
        },
        {
          "id": "1014",
          "name": "archive.zip",
          "type": "file",
          "created": "2023-10-01T12:55:00Z",
          "createdBy": "Charlie"
        }
      ] }
    ]
  }
];