// services/achatPackService.js
import prisma from "@/lib/prisma";

export const achatPackService = {

    /**
     * Vérifie si les crédits du wallet sont expirés.
     * Si la date est dépassée → remet credit à 0 et expiryDate à null
     */
    async verifierExpirationWallet(userId) {
        const wallet = await prisma.wallet.findUnique({
            where: { userId }
        });

        if (!wallet) throw new Error("Wallet introuvable");

        // Si pas d’expiration ou pas de crédits → rien à faire
        if (!wallet.expiryDate || wallet.credit === 0) {
            return wallet;
        }

        const now = new Date();

        // Expiré ?
        if (wallet.expiryDate < now) {
            const updatedWallet = await prisma.wallet.update({
                where: { id: wallet.id },
                data: {
                    credit: 0,
                    expiryDate: null
                }
            });

            // Transaction d’expiration
            await prisma.transaction.create({
                data: {
                    userId,
                    walletId: updatedWallet.id,
                    type: "debit",
                    montant: 0,
                    description: "Crédits expirés automatiquement",
                    category: "credits"
                }
            });

            return updatedWallet;
        }

        return wallet;
    },

    /**
     * Acheter un pack
     */
    async acheterPack({ userId, packId }) {

        const wallet = await this.verifierExpirationWallet(userId);

        const pack = await prisma.pack.findUnique({ where: { id: packId } });
        if (!pack) throw new Error("Pack introuvable");

        if (wallet.credit > 2) {
            throw new Error("Vous avez encore des crédits disponibles.");
        }

        let expiryDate = null;
        if (pack.duree) {
            expiryDate = new Date(Date.now() + pack.duree * 86400000);
        }

        const updatedWallet = await prisma.wallet.update({
            where: { id: wallet.id },
            data: {
                credit: wallet.credit + pack.credits,
                //raoute les points 1 credit pour 100 points
                expiryDate
            }
        });

        await prisma.transaction.create({
            data: {
                userId,
                walletId: updatedWallet.id,
                type: "credit",
                montant: pack.credits,
                description: `Achat du pack ${pack.titre}`,
                category: "credits"
            }
        });

        return updatedWallet;
    },



    /**
     * Créditer le wallet
     */
    async crediterWallet({ userId, montant, description = "Crédit ajouté" }) {
        const wallet = await this.verifierExpirationWallet(userId);

        const updatedWallet = await prisma.wallet.update({
            where: { id: wallet.id },
            data: { credit: wallet.credit + montant }
        });

        await prisma.transaction.create({
            data: {
                userId,
                walletId: updatedWallet.id,
                type: "credit",
                montant,
                description,
                category: "credits"
            }
        });

        return updatedWallet;
    },


    /**
     * Débiter le wallet
     */
    async debiterWallet({ userId, montant, description = "Débit effectué" }) {
        const wallet = await this.verifierExpirationWallet(userId);

        if (wallet.credit < montant) {
            throw new Error("Crédits insuffisants");
        }

        const updatedWallet = await prisma.wallet.update({
            where: { id: wallet.id },
            data: {
                credit: wallet.credit - montant
            }
        });

        await prisma.transaction.create({
            data: {
                userId,
                walletId: updatedWallet.id,
                type: "debit",
                montant,
                description,
                category: "credits"
            }
        });

        return updatedWallet;
    },


    /**
     * Ajouter ou retirer des points
     */
    async modifierPoints({ userId, montant, type = "credit", description = "Modification de points" }) {
        const wallet = await prisma.wallet.findUnique({ where: { userId } });
        if (!wallet) throw new Error("Wallet introuvable");

        let newPoint = wallet.point;

        if (type === "credit") {
            newPoint += montant;

            description = description || "Points ajoutés";

        } else if (type === "debit") {
            if (wallet.point < montant) throw new Error("Points insuffisants");

            newPoint -= montant;
            description = description || "Points retirés";
        } else {
            throw new Error("Type de transaction points invalide");

        }

        const updatedWallet = await prisma.wallet.update({
            where: { id: wallet.id },
            data: { point: newPoint }
        });

        await prisma.transaction.create({
            data: {
                userId,
                walletId: updatedWallet.id,
                type,              // credit ou debit
                montant,
                description,       // Points ajoutés / Points retirés
                category: "points"

            }
        });

        return updatedWallet;
    },



};
