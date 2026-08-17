
const students = [
  {
    id: 1,
    name: "Ada",
    score: 76,
    course: "JavaScript"
  },
  {
    id: 2,
    name: "Bola",
    score: 85,
    course: "Python"
  },
  {
    id: 3,
    name: "Chidi",
    score: 92,
    course: "Java"  
  },
  {
    id: 4,
    name: "Dayo",
    score: 68,
    course: "C++"
  },
  {
    id: 5,
    name: "Efe",
    score: 74,
    course: "Ruby"
  },
  {
    id: 6,
    name: "Femi",
    score: 81,
    course: "JavaScript"
  }

];

function addStudent(students, student) {
  students.push(student);
}
function findStudentById(students, studentId) {
  return students.find(function (student) {
    return student.id === studentId;
  });
}
function updateStudentScore(students, studentId, score) {
  const student = findStudentById(students, studentId);
  if (student) {
    student.score = score;
  }
}
function removeStudent(students, id){
  const index = students.findIndex(student => student.id === id);
  if (index !== -1) {
    students.splice(index, 1);
  }
}
function getPassingStudents(students) {
  return students.filter(student => student.score >= 50);
}
function calculateClassAverage(students) {
  const totalScore = students.reduce((sum, student) => sum + student.score, 0);
  return totalScore / students.length;
}
function sortStudentsByScore(students) {
  return students.slice().sort((a, b) => a.score - b.score);
}

console.table(students);
console.table(getPassingStudents(students));
console.log(`Class Average: ${calculateClassAverage(students)}`);
console.table(sortStudentsByScore(students));