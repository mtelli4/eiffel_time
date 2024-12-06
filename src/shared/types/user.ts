export interface User {
  id: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
}