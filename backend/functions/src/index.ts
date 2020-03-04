import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";


admin.initializeApp();
const app = express();
const router = express.Router();

router.get("/helloWorld", (req: express.Request, res: express.Response) => {
  res.send({
    message: "Hello from Firebase!"
  });
});

router.post("/signup", async (req: express.Request, res: express.Response) => {
  try {
      const createUser = new RegisterUserUC (
          new UserDatabase(),
          new BcryptService(),
          new V4IdGenerator(),
          new JwtAuthService()
      );

      const result = await createUser.execute({
          fullName: req.body.fullName,
          email: req.body.email,
          birthdate: req.body.birthdate,
          password: req.body.password
      });
      res.status(200).send(result)
      
  } catch (err) {
      res.status(400).send({
          erroMessage: err.message
      })
  }
});

router.post("/login", async (req: express.Request, res: express.Response) => {
  try {
      const loginUC = new LoginUC(
          new UserDatabase(),
          new BcryptService(),
          new JwtAuthService()
      )

      const result = await loginUC.execute({
          email: req.body.email,
          password: req.body.password
      })

      res.send(result)

  } catch(err) {
      res.status(400).send({
          erroMessage: err.message
      })
  }
});

router.get("/getAllUsers", async (req: express.Request, res: express.Response) => {
  try {
      const getAllUsersUC = new GetAllUsersUC(new UserDatabase());
      const result = await getAllUsersUC.execute();
      res.status(200).send(result);
  } catch (err) {
      res.status(400).send({
          errorMessage: err.message
      });
  }
});

function authenticate(req: express.Request) {
  const jwtAuthService = new JwtAuthService()
  return jwtAuthService.getUserIdFromToken(getTokenFromHeaders(req.headers))
}


app.use(cors()).use(router);

export const brutubeApi = functions.https.onRequest(app);
