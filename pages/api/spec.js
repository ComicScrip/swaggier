// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import base from "../../middlewares/common";

async function handleGet(req, res) {
  res.status(200).json({});
}

async function handlePut(req, res) {
  res.status(200).send("ok");
}

export default base().get(handleGet).put(handlePut);
