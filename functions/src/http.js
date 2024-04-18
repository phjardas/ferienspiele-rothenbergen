import cors from "cors";
import { region } from "firebase-functions";

export function onRequest(handler) {
  return region("europe-west3").https.onRequest(withCors(withError(handler)));
}

function withError(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({
        message: error.message,
        stack: error.stack,
      });
    }
  };
}

function withCors(handler) {
  const c = cors();
  return (req, res) => c(req, res, () => handler(req, res));
}
