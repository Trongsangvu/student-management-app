# student-management-server

Class
→ Student(User role STUDENT)
→ Subject
→ Enrollment
→ Score
→ GPA

## Permission
ADMIN

- create class
- create user/student/teacher
- create subject
- update/delete/toggle user

TEACHER

- view students
- create enrollment
- input score

STUDENT

- view own profile
- view own scores/GPA

## Relationship
User(STUDENT) belongs to Class

Enrollment:

- student: User
- subject: Subject
- semester

Score:

- enrollment
- assignment_score
- midterm_score
- final_score
- total_score
- letter_grade
