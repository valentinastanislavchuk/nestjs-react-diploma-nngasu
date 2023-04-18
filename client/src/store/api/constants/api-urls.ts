export const applicantApiUrls = {
  getApplicant: `applicants/${import.meta.env.VITE_USER_ID}`,
  getFaculties: `applicants/${import.meta.env.VITE_USER_ID}/faculties`,
  addSubjects: `applicants/${import.meta.env.VITE_USER_ID}/exam-results`,
};

export const subjectApiUrls = {
  getSubjects: `subjects`,
};
