import { v4 as uuidv4 } from "uuid";

export default function UsersDao(db) {
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    db.users = [...(db.users || []), newUser];
    return newUser;
  };

  const findAllUsers = () => db.users || [];

  const findUserById = (userId) =>
    (db.users || []).find((u) => String(u._id) === String(userId));

  const findUserByUsername = (username) =>
    (db.users || []).find((u) => u.username === username);

  const findUserByCredentials = (username, password) =>
    (db.users || []).find(
      (u) => u.username === username && u.password === password
    );

  const updateUser = (userId, user) => {
    db.users = (db.users || []).map((u) =>
      String(u._id) === String(userId) ? user : u
    );
    return findUserById(userId);
  };

  const deleteUser = (userId) => {
    const before = (db.users || []).length;
    db.users = (db.users || []).filter((u) => String(u._id) !== String(userId));
    return db.users.length < before;
  };

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
  };
}
