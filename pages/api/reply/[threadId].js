import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const { threadId } = req.query

  if (req.method === 'POST') {
    try {
      const { from, to, subject, body } = req.body

      // Here you would typically send the reply to your email service or API
      // For this example, we'll just return a success message
      const reply = {
        threadId,
        from,
        to,
        subject,
        body,
        sentAt: new Date().toISOString(),
      }

      res.status(200).json({ message: "Reply sent successfully", reply })
    } catch (error) {
      res.status(500).json({ error: "Failed to send reply" })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}