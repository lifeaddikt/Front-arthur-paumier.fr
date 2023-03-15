import { getPlaiceholder } from 'plaiceholder'

export default async (req, res) => {
  const { body } = req
  const { url } = body

  const { base64 } = getPlaiceholder(url)

  res.status(200).send(base64)
}
