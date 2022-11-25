import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

let publicFilePath = require.resolve("../../public/example.json");
const allDB: any = {}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { paths } = req.query as { paths: string[] }
  const [ns, ...resPaths] = paths
  const relPath = resPaths.join("/")

  let db = allDB[ns]
  const filename = path.resolve(publicFilePath, "../", `${ns}.json`).replace("(api)/", "")
  if (!db) {
    if (fs.existsSync(filename)) {
      try {
        allDB[ns] = JSON.parse(fs.readFileSync(filename).toString())
      } catch (e) {
        console.error(e)
        allDB[ns] = {}
      }
    } else allDB[ns] = {}
    db = allDB[ns]
  }

  //保存 mock 数据
  if (relPath == "mock-data") {
    if (req.method?.toLowerCase() != "post") return res.status(404)
    const { method, path, data } = req.body
    const targetPath = path.replace(/​/g, "")
    if (method == "post") {
      db[targetPath] = data
      fs.writeFileSync(filename, JSON.stringify(db))
    }
    return res.status(200).json({ data: db[targetPath] })
  }

  let requestPath = `${req.method?.toLowerCase()} ${relPath}`
  console.log("requestPath", requestPath, relPath)
  res.status(200).json(db[requestPath])
}


/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */
/**
 * @swagger
 * /api/hello:
 *   post:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */
