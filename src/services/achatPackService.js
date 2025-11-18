// services/achatPackService.js
import prisma from "@/lib/prisma";

/**
 * Service central pour gérer :
 * - Achat de packs
 * - Crédit / Débit de wallet
 * - Création automatique des transactions
 */

export const achatPackService = {
    /**
     * Acheter un pack
     */
    async acheterPack({ userId, packId }) {
        // 1️⃣ Récupérer le pack
        const pack = await prisma.pack.findUnique({ where: { id: packId } });
        if (!pack) throw new Error("Pack introuvable");

        // 2️⃣ Récupérer ou créer le wallet de l'utilisateur
        let wallet = await prisma.wallet.findUnique({ where: { userId } });
        if (!wallet) {
            //   wallet = await prisma.wallet.create({ data: { userId, credit: 0, point: 0 } });
            throw new Error("Wallet introuvable");
        }

        // 3️⃣ Calculer la date d'expiration (si pack.duree défini)
        const now = new Date();
        const expiryDate = pack.duree
            ? new Date(now.getTime() + pack.duree * 24 * 60 * 60 * 1000)
            : null;

        // 4️⃣ Créditer le wallet avec les crédits du pack
        const updatedWallet = await prisma.wallet.update({
            where: { id: wallet.id },
            data: {
                credit: wallet.credit + pack.credits,
                expiryDate
            }
        });

        // 5️⃣ Créer la transaction associée
        await prisma.transaction.create({
            data: {
                userId,
                walletId: updatedWallet.id,
                type: "ACHAT_PACK",
                montant: pack.credits,
                description: `Achat du pack ${pack.titre}`
            }
        });

        return updatedWallet;
    },

    /**
     * Créditer le wallet de l'utilisateur
     */
    async crediterWallet({ userId, montant, description = "Crédit ajouté par admin" }) {
        const wallet = await prisma.wallet.findUnique({ where: { userId } });
        if (!wallet) throw new Error("Wallet introuvable");

        const updatedWallet = await prisma.wallet.update({
            where: { id: wallet.id },
            data: { credit: wallet.credit + montant }
        });

        // Créer une transaction de crédit
        await prisma.transaction.create({
            data: {
                userId,
                walletId: updatedWallet.id,
                type: "credit",
                montant,
                description
            }
        });

        return updatedWallet;
    },

    /**
     * Débiter le wallet de l'utilisateur
     */
    async debiterWallet({ userId, montant, description = "Crédit retiré" }) {
        const wallet = await prisma.wallet.findUnique({ where: { userId } });
        if (!wallet) throw new Error("Wallet introuvable");
        if (wallet.credit < montant) throw new Error("Crédits insuffisants");

        const updatedWallet = await prisma.wallet.update({
            where: { id: wallet.id },
            data: { credit: wallet.credit - montant }
        });

        // Créer une transaction de débit
        await prisma.transaction.create({
            data: {
                userId,
                walletId: updatedWallet.id,
                type: "debit",
                montant,
                description
            }
        });

        return updatedWallet;
    },

    /**
     * Ajouter ou retirer des points dans le wallet
     */
    async modifierPoints({ userId, montant, type = "POINT_CREDIT", description = "Modification de points" }) {
        const wallet = await prisma.wallet.findUnique({ where: { userId } });
        if (!wallet) throw new Error("Wallet introuvable");

        let newPoint = wallet.point;
        if (type === "POINT_CREDIT") newPoint += montant;
        else if (type === "POINT_DEBIT") {
            if (wallet.point < montant) throw new Error("Points insuffisants");
            newPoint -= montant;
        } else {
            throw new Error("Type de transaction points invalide");
        }

        const updatedWallet = await prisma.wallet.update({
            where: { id: wallet.id },
            data: { point: newPoint }
        });

        // Créer la transaction
        // await prisma.transaction.create({
        //     data: {
        //         userId,
        //         walletId: updatedWallet.id,
        //         type,
        //         montant,
        //         description
        //     }
        // });

        return updatedWallet;
    }
};
