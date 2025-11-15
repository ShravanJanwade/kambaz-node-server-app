import UsersDao from "./dao.js";
export default function UserRoutes(app, db) {
  const dao = UsersDao(db);
  const createUser = (req, res) => {
    const payload = req.body || {};
    const created = dao.createUser(payload);
    res.status(201).json(created);
  };

  const findAllUsers = (req, res) => {
    res.json(dao.findAllUsers());
  };

  const findUserById = (req, res) => {
    const { userId } = req.params;
    const user = dao.findUserById(userId);
    if (!user) return res.sendStatus(404);
    res.json(user);
  };

  const deleteUser = (req, res) => {
    const { userId } = req.params;
    const ok = dao.deleteUser(userId);
    if (!ok) return res.sendStatus(404);
    res.json({ success: true });
  };
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    const updated = dao.updateUser(userId, userUpdates);
    if (!updated) return res.sendStatus(404);
    if (
      req.session?.currentUser &&
      String(req.session.currentUser._id) === String(userId)
    ) {
      req.session.currentUser = updated;
    }
    res.json(updated);
  };

  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    res.json(currentUser);
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
