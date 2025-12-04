import Users from "./UserModel.js";

async function createUser(username, password) {
  const [user] = await Users.findOrCreate({
    where: { username },
    defaults: { password },
  });

  return user.get({ plain: true });
}

async function getUser(username) {
  const user = await Users.findByPk(username);
  return user ? user.get({ plain: true }) : undefined;
}

export const userService = {
  createUser,
  getUser,
};
