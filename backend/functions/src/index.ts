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

app.use(cors()).use(router);

export const brutubeApi = functions.https.onRequest(app);
