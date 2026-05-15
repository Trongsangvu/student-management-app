export const routes = {
  home: '/',
  students: '/students',
  addStudent: '/students/add',
  studentDetail: (id: string) => `/students/${id}`,

  subjects: '/subjects',
  addSubject: '/subjects/add',
  subjectDetail: (id: string) => `/subjects/${id}`,

  classes: '/classes',
  addClass: '/classes/add',
  classDetail: (id: string) => `/classes/${id}`,

  scores: '/scores',
  addScore: '/scores/add',
  scoreDetail: (id: string) => `/scores/${id}`,
};