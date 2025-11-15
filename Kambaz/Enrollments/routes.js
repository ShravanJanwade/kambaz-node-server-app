import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const enrollCurrentUser = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);
    const { courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(currentUser._id, courseId);
    if (!enrollment) {
      return res.status(409).json({ message: "Already enrolled" });
    }
    return res.status(201).json(enrollment);
  };

  const unenrollCurrentUser = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);
    const { courseId } = req.params;
    const removed = dao.unenrollUserFromCourse(currentUser._id, courseId);
    if (!removed)
      return res.status(404).json({ message: "Enrollment not found" });
    return res.json({ success: true });
  };

  const findEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    const list = dao.findCoursesForUser(
      userId === "current" ? req.session?.currentUser?._id : userId
    );
    res.json(list);
  };

  const findPeopleForCourse = (req, res) => {
    const { courseId } = req.params;
    const people = dao.findUsersForCourse(courseId);
    return res.json(people);
  };

  app.get("/api/courses/:courseId/people", findPeopleForCourse);
  app.post("/api/users/current/courses/:courseId", enrollCurrentUser);
  app.delete("/api/users/current/courses/:courseId", unenrollCurrentUser);
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
}
