const UserService = require("../services/user-service");
const UserAuth = require("./middlewares/auth");
const { validate } = require("express-validation");
const { signup, login } = require("./validations/auth");

module.exports = (app) => {
  const service = new UserService();

  app.post("/signup", validate(signup), async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const { data } = await service.SignUp({ email, password, name });
      return res.json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

  app.post("/login", validate(login), async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { data } = await service.SignIn({ email, password });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/profile", UserAuth, async (req, res, next) => {
    try {
      const { email } = req.user;
      const { data } = await service.GetProfile({ email });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
};
