function getGrade(score) {
  if (score < 0 || score > 100) {
    return "Invalid score";
  }
  if (score >= 80) {
    return "You got a Distinction";
  }
  if (score >= 70) {
    return "A";
  }
  else if (score >= 60) {
    return "B";
  }
  else if (score >= 50) {
    return "C";
  }
  else if (score >= 45) {
    return "D";
  }
    else {
    return "F";
    }
}

const score = 43;
console.log(`Your grade is: ${getGrade(score)}`);