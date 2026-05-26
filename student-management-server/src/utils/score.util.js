export const calculateTotalScore = (data) => {
  return (
    data.assignment_score * 0.2 +
    data.midterm_score * 0.3 +
    data.final_score * 0.5
  );
};

export const calculateLetterGrade = (score) => {
  if (score >= 8.5) return "A";
  if (score >= 7) return "B";
  if (score >= 5.5) return "C";
  if (score >= 4) return "D";

  return "F";
};
