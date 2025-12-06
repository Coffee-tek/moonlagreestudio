import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const { ref } = req.query;

  if (!ref) {
    return res.status(400).json({ error: "ref manquant" });
  }

  const payment = await prisma.payment.findUnique({
    where: { refCommand: ref },
  });

  if (!payment) {
    return res.status(404).json({ error: "Transaction introuvable" });
  }

  return res.status(200).json({
    status: payment.status,
    paymentMethod: payment.paymentMethod,
    amount: payment.amount,
  });
}
