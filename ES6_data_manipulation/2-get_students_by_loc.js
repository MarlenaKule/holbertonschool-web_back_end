export default function getStudentsByLocation(getListStudents, city) {
  return getListStudents.filter((cities) => cities.location === city);
}
