import { NextApiRequest, NextApiResponse } from "next";

const allDB: { [key: string]: any } = {};
type Data = {}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { namespace } = req.query;
  const db = allDB[namespace as string] || {}
  let result = null;
  if (req.method?.toLowerCase() == "get") {
    const { path } = req.query;
    result = db[path as string]
  } else if (req.method?.toLowerCase() == "post") {
    const { path, data } = req.body;
    db[path] = data;
    result = db[path]
  }
  allDB[namespace as string] = db

  res.status(200).json(result)
}
