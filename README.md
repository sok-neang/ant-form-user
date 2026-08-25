// Infomation about all endpoint in user side 

1. post : {{baseURL}}/access/google
  - body : { "idToken": "<google-token>" }
  - data-response : 
    {
    "success": true,
    "message": "Google account verified successfully",
    "data": {
        "student": {
            "id": 1,
            "email": "laysokneang80@gmail.com",
            "googleId": "106694483479827859778",
            "khName": null,
            "enName": null,
            "gender": null,
            "telegramUsername": null,
            "dateOfBirth": null,
            "phone": null,
            "universityId": null,
            "universityOther": null,
            "address": null,
            "createdAt": "2026-08-24T08:01:47.881Z",
            "updatedAt": "2026-08-25T03:21:02.862Z"
        },
        "submission": {
            "id": 1,
            "studentId": 1,
            "ipAddress": "::ffff:127.0.0.1",
            "educationLevel": null,
            "yearOfStudy": null,
            "semester": null,
            "referralSource": null,
            "program": null,
            "shift": null,
            "status": "DRAFT",
            "blacklistReason": null,
            "blacklistNote": null,
            "agreedToProgramCommitment": false,
            "agreedToCodeOfConduct": false,
            "agreedToAttendancePolicy": false,
            "agreedToEligibilityPolicy": false,
            "submittedAt": null,
            "createdAt": "2026-08-24T08:01:47.904Z",
            "updatedAt": "2026-08-25T03:21:02.865Z",
            "narrative": null,
            "files": []
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50SWQiOjEsImVtYWlsIjoibGF5c29rbmVhbmc4MEBnbWFpbC5jb20iLCJyb2xlIjoiU1RVREVOVCIsImlhdCI6MTc4NzYyODA2MiwiZXhwIjoxNzg3NzE0NDYyfQ.-RPDHTzgAaAsCrpezx5eAxidJQDrfZaAqlWNv9h8Oek",
        "tokenExpiredAt": "2026-08-26T03:21:02.860Z"
    }
}
  
2. get : {{baseURL}}/access/form?token={{student_token}}
  - params : token
  - data-response : 
  {
    "success": true,
    "message": "Form data retrieved successfully",
    "data": {
        "email": "laysokneang80@gmail.com",
        "status": "DRAFT",
        "student": {
            "id": 1,
            "email": "laysokneang80@gmail.com",
            "googleId": "106694483479827859778",
            "khName": "ឡាយ​ សុខនាង",
            "enName": "Lay Sokneang",
            "gender": "FEMALE",
            "telegramUsername": "@sokneang",
            "dateOfBirth": "2004-05-15T00:00:00.000Z",
            "phone": "098812345",
            "universityId": null,
            "universityOther": "Institute of Technology of Cambodia",
            "address": "Phnom Penh, Cambodia",
            "createdAt": "2026-08-24T08:01:47.881Z",
            "updatedAt": "2026-08-25T03:26:45.828Z",
            "submission": {
                "id": 1,
                "studentId": 1,
                "ipAddress": "::ffff:127.0.0.1",
                "educationLevel": "BACHELOR",
                "yearOfStudy": "YEAR_3",
                "semester": "SEMESTER_1",
                "referralSource": [
                    "SOCIAL_MEDIA",
                    "FRIEND"
                ],
                "program": "WEB_DEVELOPMENT",
                "shift": "MORNING",
                "status": "DRAFT",
                "blacklistReason": null,
                "blacklistNote": null,
                "agreedToProgramCommitment": false,
                "agreedToCodeOfConduct": false,
                "agreedToAttendancePolicy": false,
                "agreedToEligibilityPolicy": false,
                "submittedAt": null,
                "createdAt": "2026-08-24T08:01:47.904Z",
                "updatedAt": "2026-08-25T03:26:45.839Z"
            }
        },
        "submission": {
            "id": 1,
            "studentId": 1,
            "ipAddress": "::ffff:127.0.0.1",
            "educationLevel": "BACHELOR",
            "yearOfStudy": "YEAR_3",
            "semester": "SEMESTER_1",
            "referralSource": [
                "SOCIAL_MEDIA",
                "FRIEND"
            ],
            "program": "WEB_DEVELOPMENT",
            "shift": "MORNING",
            "status": "DRAFT",
            "blacklistReason": null,
            "blacklistNote": null,
            "agreedToProgramCommitment": false,
            "agreedToCodeOfConduct": false,
            "agreedToAttendancePolicy": false,
            "agreedToEligibilityPolicy": false,
            "submittedAt": null,
            "createdAt": "2026-08-24T08:01:47.904Z",
            "updatedAt": "2026-08-25T03:26:45.839Z",
            "student": {
                "id": 1,
                "email": "laysokneang80@gmail.com",
                "googleId": "106694483479827859778",
                "khName": "ឡាយ​ សុខនាង",
                "enName": "Lay Sokneang",
                "gender": "FEMALE",
                "telegramUsername": "@sokneang",
                "dateOfBirth": "2004-05-15T00:00:00.000Z",
                "phone": "098812345",
                "universityId": null,
                "universityOther": "Institute of Technology of Cambodia",
                "address": "Phnom Penh, Cambodia",
                "createdAt": "2026-08-24T08:01:47.881Z",
                "updatedAt": "2026-08-25T03:26:45.828Z",
                "submission": {
                    "id": 1,
                    "studentId": 1,
                    "ipAddress": "::ffff:127.0.0.1",
                    "educationLevel": "BACHELOR",
                    "yearOfStudy": "YEAR_3",
                    "semester": "SEMESTER_1",
                    "referralSource": [
                        "SOCIAL_MEDIA",
                        "FRIEND"
                    ],
                    "program": "WEB_DEVELOPMENT",
                    "shift": "MORNING",
                    "status": "DRAFT",
                    "blacklistReason": null,
                    "blacklistNote": null,
                    "agreedToProgramCommitment": false,
                    "agreedToCodeOfConduct": false,
                    "agreedToAttendancePolicy": false,
                    "agreedToEligibilityPolicy": false,
                    "submittedAt": null,
                    "createdAt": "2026-08-24T08:01:47.904Z",
                    "updatedAt": "2026-08-25T03:26:45.839Z"
                }
            },
            "narrative": {
                "id": 1,
                "submissionId": 1,
                "strengths": "Fast learner, strong problem-solving skills",
                "weaknesses": "Public speaking",
                "goals": "Become a Full-Stack Software Engineer",
                "opportunities": "Access to intensive mentorship and real projects",
                "reason": "I want to improve my web development skills to build impactful apps",
                "familySituation": "Supporting family while studying",
                "preferredTimeReason": "Morning shift matches my university schedule",
                "webAppInterest": "Interested in React, Node.js, and Cloud APIs",
                "scholarshipVision": "Give back to the Cambodian developer community",
                "createdAt": "2026-08-25T03:26:45.845Z",
                "updatedAt": "2026-08-25T03:26:45.845Z"
            },
            "files": []
        },
        "narrative": {
            "id": 1,
            "submissionId": 1,
            "strengths": "Fast learner, strong problem-solving skills",
            "weaknesses": "Public speaking",
            "goals": "Become a Full-Stack Software Engineer",
            "opportunities": "Access to intensive mentorship and real projects",
            "reason": "I want to improve my web development skills to build impactful apps",
            "familySituation": "Supporting family while studying",
            "preferredTimeReason": "Morning shift matches my university schedule",
            "webAppInterest": "Interested in React, Node.js, and Cloud APIs",
            "scholarshipVision": "Give back to the Cambodian developer community",
            "createdAt": "2026-08-25T03:26:45.845Z",
            "updatedAt": "2026-08-25T03:26:45.845Z"
        },
        "files": []
    }
}

3. patch : {{baseURL}}/submissions/draft 
  - header : token
  - body :  
   {
  "khName": "ឡាយ​ សុខនាង",
  "enName": "Lay Sokneang",
  "gender": "FEMALE",
  "telegramUsername": "@sokneang",
  "dateOfBirth": "2004-05-15",
  "phone": "098812345",
  "university_id": 1,
  "universityOther": "Institute of Technology of Cambodia",
  "address": "Phnom Penh, Cambodia",
  "educationLevel": "BACHELOR",
  "yearOfStudy": "YEAR_3",
  "semester": "SEMESTER_1",
  "referralSource": [
    "SOCIAL_MEDIA",
    "FRIEND"
  ],
  "program": "WEB_DEVELOPMENT",
  "shift": "MORNING",
  "strengths": "Fast learner, strong problem-solving skills",
  "weaknesses": "Public speaking",
  "goals": "Become a Full-Stack Software Engineer",
  "opportunities": "Access to intensive mentorship and real projects",
  "reason": "I want to improve my web development skills to build impactful apps",
  "familySituation": "Supporting family while studying",
  "preferredTimeReason": "Morning shift matches my university schedule",
  "webAppInterest": "Interested in React, Node.js, and Cloud APIs",
  "scholarshipVision": "Give back to the Cambodian developer community"
} 
  - data-response : 
  {
    "success": true,
    "message": "Draft saved successfully",
    "data": {
        "message": "Draft saved successfully",
        "updatedAt": "2026-08-25T03:26:45.849Z",
        "submissionId": 1
    }
}
4. patch : {{baseURL}}/submissions/draft/files
  - header : token
  - body : file upload 
  - data-response :
  {
    "success": true,
    "message": "2 file(s) updated successfully",
    "data": [
        {
            "id": 1,
            "submissionId": 1,
            "fileType": "TRANSCRIPT",
            "originalFilename": "Screenshot 2025-02-22 220224.png",
            "filePath": "uploads\\submissions\\1787634010474-8cf9048738d49f66.png",
            "mimeType": "image/png",
            "sizeBytes": 228487,
            "uploadedAt": "2026-08-25T05:00:10.552Z",
            "fileUrl": "http://localhost:3000/uploads/submissions/1787634010474-8cf9048738d49f66.png"
        },
        {
            "id": 2,
            "submissionId": 1,
            "fileType": "PHOTO",
            "originalFilename": "Screenshot 2025-02-22 220224.png",
            "filePath": "uploads\\submissions\\1787634010479-ee4cd35b0fd432b5.png",
            "mimeType": "image/png",
            "sizeBytes": 228487,
            "uploadedAt": "2026-08-25T05:00:10.558Z",
            "fileUrl": "http://localhost:3000/uploads/submissions/1787634010479-ee4cd35b0fd432b5.png"
        }
    ]
}

5 post: {{baseURL}}/submissions 
  - header : token
  - body : {
  "agreedToProgramCommitment": true,
  "agreedToCodeOfConduct": true,
  "agreedToAttendancePolicy": true,
  "agreedToEligibilityPolicy": true
} 
  - data-response : 
  {
    "success": true,
    "message": "Application submitted successfully",
    "data": {
        "message": "Application submitted successfully",
        "submission": {
            "id": 2,
            "studentId": 2,
            "ipAddress": "::1",
            "educationLevel": null,
            "yearOfStudy": null,
            "semester": null,
            "referralSource": null,
            "program": null,
            "shift": null,
            "status": "SUBMIT",
            "blacklistReason": null,
            "blacklistNote": null,
            "agreedToProgramCommitment": true,
            "agreedToCodeOfConduct": true,
            "agreedToAttendancePolicy": true,
            "agreedToEligibilityPolicy": true,
            "submittedAt": "2026-08-25T03:05:37.639Z",
            "createdAt": "2026-08-25T02:10:37.165Z",
            "updatedAt": "2026-08-25T03:05:37.640Z",
            "student": {
                "id": 2,
                "email": "phoukukseng3@gmail.com",
                "googleId": "111143208317361217103",
                "khName": null,
                "enName": null,
                "gender": null,
                "telegramUsername": null,
                "dateOfBirth": null,
                "phone": null,
                "universityId": null,
                "universityOther": null,
                "address": null,
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50SWQiOjIsImVtYWlsIjoicGhvdWt1a3NlbmczQGdtYWlsLmNvbSIsInJvbGUiOiJTVFVERU5UIiwiaWF0IjoxNzg3NjI1OTkzLCJleHAiOjE3ODc3MTIzOTN9.vFe98pjvtNp3xd_Tm_bfGsMVdykGbygTTvQeHGv9Jn4",
                "tokenExpiredAt": "2026-08-26T02:46:33.816Z",
                "createdAt": "2026-08-25T02:10:37.158Z",
                "updatedAt": "2026-08-25T02:46:33.822Z"
            },
            "narrative": null,
            "files": []
        }
    }
}