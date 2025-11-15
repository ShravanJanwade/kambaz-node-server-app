import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function findEnrollmentsForUser(userId) {
    return db.enrollments.filter((e) => e.user === userId);
  }

  function findCoursesForUser(userId) {
    return db.enrollments.filter((e) => e.user === userId).map((e) => e.course);
  }
  function findUsersForCourse(courseId) {
    return db.enrollments
      .filter((e) => e.course === courseId)
      .map((e) => db.users.find((u) => String(u._id) === String(e.user)))
      .filter(Boolean);
  }

  function enrollUserInCourse(userId, courseId) {
    const exists = db.enrollments.some(
      (e) => e.user === userId && e.course === courseId
    );
    if (exists) return null;
    const enrollment = { _id: uuidv4(), user: userId, course: courseId };
    db.enrollments = [...db.enrollments, enrollment];
    return enrollment;
  }

  function unenrollUserFromCourse(userId, courseId) {
    const before = db.enrollments.length;
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
    return db.enrollments.length < before;
  }

  return {
    findEnrollmentsForUser,
    findCoursesForUser,
    enrollUserInCourse,
    unenrollUserFromCourse,
    findUsersForCourse,
  };
}
