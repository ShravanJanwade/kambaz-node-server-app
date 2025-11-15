const assignment = {
  id: 1, title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10", completed: false, score: 0,
};
  const moduleObj = {
    id: "m101",
    name: "Intro to Node & Express",
    description: "Fundamentals of building servers using Node.js and Express.",
    course: "Web Development 101",
  };
export default function WorkingWithObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
   const setAssignmentTitle = (req, res) => {
   const { newTitle } = req.params;
   assignment.title = newTitle;
   res.json(assignment);
 };
   app.get("/lab5/module", (req, res) => {
    res.json(moduleObj);
  });

  app.get("/lab5/module/name", (req, res) => {
    res.send(moduleObj.name.toString());
  });

  app.get("/lab5/module/name/:newName", (req, res) => {
    const newName = decodeURIComponent(req.params.newName || "");
    if (!newName) {
      return res.status(400).send("Missing new name");
    }
    moduleObj.name = newName;
    res.send(moduleObj.name.toString());
  });
  app.get("/lab5/module/description/:newDescription", (req, res) => {
    const newDesc = decodeURIComponent(req.params.newDescription || "");
    if (!newDesc) {
      return res.status(400).send("Missing new description");
    }
    moduleObj.description = newDesc;
    res.send(moduleObj.description.toString());
  });
  app.get("/lab5/assignment/score/:newScore", (req, res) => {
    const raw = req.params.newScore;
    if (raw === undefined) return res.status(400).send("Missing score");
    const parsed = parseFloat(raw);
    if (Number.isNaN(parsed)) return res.status(400).send("Score must be a number");
    assignment.score = parsed;
    res.send(assignment.score.toString());
  });

  app.get("/lab5/assignment/completed/:value", (req, res) => {
    const raw = req.params.value;
    if (raw === undefined) return res.status(400).send("Missing completed value");
    const normalized = raw.toLowerCase();
    if (normalized !== "true" && normalized !== "false") {
      return res.status(400).send("Completed must be true or false");
    }
    assignment.completed = normalized === "true";
    res.send(assignment.completed.toString());
  });

 app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment", getAssignment);
}
