"use server";

import { seanceService } from "../services/ seanceService";


// Combine date + heure en un objet Date valide
function combineDateAndTime(dateStr, timeStr) {
    if (!dateStr || !timeStr) return null;
    const [hours, minutes] = timeStr.split(":").map(Number);
    const d = new Date(dateStr);
    d.setHours(hours, minutes, 0, 0);
    return d;
}

// Création de séance
export async function createSeanceAction(formData) {
    try {
        const date = formData.get("date");
        const heure = formData.get("heure");

        if (!date || !heure) throw new Error("La date et l'heure sont requises.");

        const data = {
            titre: formData.get("titre"),
            date: new Date(date), // date pure
            heure: combineDateAndTime(date, heure), // date + heure valide
            coatch: formData.get("coatch"),
            places: parseInt(formData.get("places")) || 0,
            credits: parseInt(formData.get("credits")) || 0,
        };

        return await seanceService.create(data);
    } catch (error) {
        console.error(error);
        throw error; // tu peux gérer le toast côté composant
    }
}

// Mise à jour de séance
export async function updateSeanceAction(id, formData) {
    try {
        const date = formData.get("date");
        const heure = formData.get("heure");

        if (!date || !heure) throw new Error("La date et l'heure sont requises.");

        const data = {
            titre: formData.get("titre"),
            date: new Date(date),
            heure: new Date(heure),
            coatch: formData.get("coatch"),
            places: parseInt(formData.get("places")) || 0,
            credits: parseInt(formData.get("credits")) || 0,
        };

        return await seanceService.update(id, data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Suppression d'une séance
export async function deleteSeanceAction(id) {
    try {
        return await seanceService.delete(id);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Suppression de plusieurs séances
export async function deleteMultipleSeancesAction(ids) {
    try {
        return await seanceService.deleteMany(ids);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
