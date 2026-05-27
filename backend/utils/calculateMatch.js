const calculateMatchPercentage = (
  studentSkills,
  requiredSkills
) => {
  if (!requiredSkills.length) {
    return 0;
  }

  const matchedSkills = requiredSkills.filter((skill) =>
    studentSkills.some(
      (studentSkill) =>
        studentSkill.toString() === skill.toString()
    )
  );

  return Math.round(
    (matchedSkills.length / requiredSkills.length) * 100
  );
};

module.exports = calculateMatchPercentage;