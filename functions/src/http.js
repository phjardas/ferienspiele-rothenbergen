import cors from 'cors';
import * as functions from 'firebase-functions';

export const onRequest = handler => functions.https.onRequest(withCors(withError(handler)));

const withError = handler => {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send({
        message: error.message,
        stack: error.stack,
      });
    }
  };
};

const withCors = handler => {
  const c = cors();
  return (req, res) => c(req, res, () => handler(req, res));
};
