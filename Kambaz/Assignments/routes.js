import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const findAllAssignments = (req, res) => {
    const assignments = dao.findAllAssignments();
    res.json(assignments);
  };

  const findAssignmentById = (req, res) => {
    const { assignmentId } = req.params;
    const assignment = dao.findAssignmentById(assignmentId);
    if (!assignment) return res.sendStatus(404);
    res.json(assignment);
  };

  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const createAssignmentForCourse = (req, res) => {
    const { courseId } = req.params;
    const payload = req.body || {};
    const currentUser = req.session["currentUser"];
    const created = dao.createAssignmentForCourse(courseId, payload);
    res.status(201).json(created);
  };

  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const updates = req.body || {};
    const updated = dao.updateAssignment(assignmentId, updates);
    if (!updated) return res.sendStatus(404);
    res.json(updated);
  };

  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const status = dao.deleteAssignment(assignmentId);
    res.json(status);
  };

  app.get("/api/assignments", findAllAssignments);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
