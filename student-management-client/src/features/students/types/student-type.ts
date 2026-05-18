export type Student = {
  id: string;
  name: string;
  cls: string;
  math: number;
  literature: number;
  english: number;
  status: "active" | "at-risk";
};

export const STUDENTS: Student[] = [
  { id: "STU001", name: "Tran Bao Chau", cls: "12A", math: 95, literature: 88, english: 92, status: "active" },
  { id: "STU002", name: "Nguyen Thi Lan", cls: "11B", math: 90, literature: 92, english: 87, status: "active" },
  { id: "STU003", name: "Le Duc Minh", cls: "12A", math: 88, literature: 79, english: 91, status: "active" },
  { id: "STU004", name: "Pham Hong Anh", cls: "10C", math: 82, literature: 86, english: 89, status: "active" },
  { id: "STU005", name: "Vo Quoc Khanh", cls: "11A", math: 85, literature: 80, english: 84, status: "active" },
  { id: "STU006", name: "Dang Thi Mai", cls: "10A", math: 78, literature: 74, english: 80, status: "active" },
  { id: "STU007", name: "Hoang Van Long", cls: "12B", math: 72, literature: 68, english: 76, status: "active" },
  { id: "STU008", name: "Bui Minh Tuan", cls: "11C", math: 65, literature: 70, english: 62, status: "at-risk" },
  { id: "STU009", name: "Ly Thi Thu", cls: "10B", math: 91, literature: 85, english: 88, status: "active" },
  { id: "STU010", name: "Ngo Thanh Nam", cls: "12C", math: 60, literature: 58, english: 64, status: "at-risk" },
  { id: "STU011", name: "Truong Khanh Van", cls: "11A", math: 83, literature: 77, english: 86, status: "active" },
  { id: "STU012", name: "Dinh Thi Hoa", cls: "10C", math: 76, literature: 82, english: 79, status: "active" },
  { id: "STU013", name: "Cao Viet Hung", cls: "12A", math: 69, literature: 65, english: 72, status: "active" },
  { id: "STU014", name: "Mai Phuong Linh", cls: "11B", math: 93, literature: 89, english: 91, status: "active" },
  { id: "STU015", name: "Tran Minh Duc", cls: "10A", math: 74, literature: 71, english: 68, status: "active" },
];

export const CLASSES = ["10A", "10B", "10C", "11A", "11B", "11C", "12A", "12B", "12C"] as const;
export type Grade = "A" | "B" | "C" | "D";

export function avg(s: Student) {
  return (s.math + s.literature + s.english) / 3;
}

export function letterGrade(average: number): Grade {
  if (average >= 88) return "A";
  if (average >= 76) return "B";
  if (average >= 64) return "C";
  return "D";
}