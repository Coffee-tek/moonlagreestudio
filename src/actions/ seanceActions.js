"use server";

import { seanceService } from "../services/ seanceService";


function combineDateAndTime(dateStr, timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const d = new Date(dateStr);
    d.setHours(hours, minutes, 0, 0);
    return d;
}

export async function createSeanceAction(formData) {
    const data = {
        titre: formData.get("titre"),
        date: new Date(formData.get("date")), // date pure
        heure: combineDateAndTime(formData.get("date"), formData.get("heure")), // date + heure
        coatch: formData.get("coatch"),
        places: parseInt(formData.get("places")),
        credits: parseInt(formData.get("credits")),
    };
    return await seanceService.create(data);
}

export async function updateSeanceAction(id, formData) {
    const data = {
        titre: formData.get("titre"),
        date: new Date(formData.get("date")),
        heure: new Date(formData.get("heure")),
        coatch: formData.get("coatch"),
        places: parseInt(formData.get("places")),
        credits: parseInt(formData.get("credits")),
    };
    return await seanceService.update(id, data);
}

export async function deleteSeanceAction(id) {
    return await seanceService.delete(id);
}
