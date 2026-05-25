import { Bell, MoreHorizontal, Plus } from "lucide-react";

export const AVATAR_COLORS = [
  { bg: "bg-blue-50", text: "text-blue-700" },
  { bg: "bg-green-100", text: "text-green-800" },
  { bg: "bg-purple-50", text: "text-purple-700" },
  { bg: "bg-amber-50", text: "text-amber-700" },
  { bg: "bg-teal-50", text: "text-teal-700" },
  { bg: "bg-pink-50", text: "text-pink-700" },
];

export const GRADES = ["A", "B", "C", "D"] as const;

export const CLASSES = [
  { id: "C001", name: "CNTT 1", year: "2024-2025" },
  { id: "C002", name: "CNTT 2", year: "2024-2025" },
];

export const SUBJECTS = [
  { subject: "Mathematics", score: 78, color: "bg-blue-500" },
  { subject: "Literature", score: 72, color: "bg-emerald-500" },
  { subject: "English", score: 81, color: "bg-violet-500" },
  { subject: "Physics", score: 68, color: "bg-orange-500" },
  { subject: "Chemistry", score: 65, color: "bg-red-500" },
  { subject: "History", score: 74, color: "bg-pink-500" },
];

export const ACTIVITY = [
  { dotColor: "bg-emerald-500", title: "Scores uploaded", detail: "Math, Class 10A", time: "10 minutes ago" },
  { dotColor: "bg-blue-500", title: "New student enrolled", detail: "Nguyen Minh Khoa, 11B", time: "2 hours ago" },
  { dotColor: "bg-amber-500", title: "Grade report generated", detail: "Semester 1 summary", time: "Yesterday, 4:30 PM" },
  { dotColor: "bg-red-500", title: "3 students flagged", detail: "scores below passing", time: "Yesterday, 2:10 PM" },
];

export const TOP_STUDENTS = [
  { rank: 1, name: "Tran Bao Chau", cls: "12A", math: 95, lit: 88, eng: 92, avg: 91.7, grade: "A" },
  { rank: 2, name: "Nguyen Thi Lan", cls: "11B", math: 90, lit: 92, eng: 87, avg: 89.7, grade: "B" },
  { rank: 3, name: "Le Duc Minh", cls: "12A", math: 88, lit: 79, eng: 91, avg: 86.0, grade: "B" },
  { rank: 4, name: "Pham Hong Anh", cls: "10C", math: 82, lit: 86, eng: 89, avg: 85.7, grade: "B" },
  { rank: 5, name: "Vo Quoc Khanh", cls: "11A", math: 85, lit: 80, eng: 84, avg: 83.0, grade: "B" },
];

export const GRADE_STYLE: Record<string, string> = {
  A: "bg-emerald-100 text-emerald-700",
  B: "bg-blue-100 text-blue-700",
  C: "bg-amber-100 text-amber-700",
};

export const TABLE_HEADERS = ["#", "Student", "Class", "Math", "Literature", "English", "Avg", "Grade"] as const;

export const ICON_BUTTONS = [
  { icon: Bell, label: "Notifications" },
  { icon: Plus, label: "Add" },
  { icon: MoreHorizontal, label: "More" },
];