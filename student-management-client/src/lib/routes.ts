export const routes = {
  home: '/',

  students: '/students',
  studentDetail: (id: string) => `/students/${id}`,

  subjects: '/subjects',
  subjectDetail: (id: string) => `/subjects/${id}`,

  classes: '/classes',
  classDetail: (id: string) => `/classes/${id}`,

  scores: '/scores',
  scoreDetail: (id: string) => `/scores/${id}`,
};