const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {
  students: `${API_BASE_URL}/students`,
  subjects: `${API_BASE_URL}/subjects`,
  scores: `${API_BASE_URL}/scores`,
  classes: `${API_BASE_URL}/classes`,
};