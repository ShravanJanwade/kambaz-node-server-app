import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  function findAllAssignments() {
    return db.assignments;
  }

  function findAssignmentById(assignmentId) {
    return db.assignments.find((a) => a._id === assignmentId);
  }

  function findAssignmentsForCourse(courseId) {
    const { assignments } = db;
    return assignments.filter((a) => a.course === courseId);
  }

  function createAssignmentForCourse(courseId, assignment) {
    const newAssignment = {
      ...assignment,
      _id: uuidv4(),
      course: courseId,
    };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }

  function updateAssignment(assignmentId, updates) {
    const { assignments } = db;
    const assignment = assignments.find((a) => a._id === assignmentId);
    if (!assignment) return null;
    Object.assign(assignment, updates);
    return assignment;
  }

  function deleteAssignment(assignmentId) {
    db.assignments = db.assignments.filter((a) => a._id !== assignmentId);
    return { success: true };
  }

  return {
    findAllAssignments,
    findAssignmentById,
    findAssignmentsForCourse,
    createAssignmentForCourse,
    updateAssignment,
    deleteAssignment,
  };
}
