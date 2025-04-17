import cors from "cors";
import { onRequest as handleRequest } from "firebase-functions/v2/https";

export function onRequest(handler) {
  return handleRequest(withCors(withError(handler)));
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
