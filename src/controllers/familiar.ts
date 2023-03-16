import { Request, Response } from 'express';
import { create_familiar_service, update_familiar_service, delete_familiar_service } from "../services/familiar";

export async function create_familiar_controller(req: Request, res: Response) {

    // Comprobation of the method
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { first_name, paternal_surname, maternal_surname, gender, birth_date, phone_number, person_2040, has_photo, religion, health_insurance, civil_status, status, relationship, beneficiary_id, school_level, last_school_grade, is_studying, career, job_name, occupation, has_health_insurance, position, salary } = req.body;

    // Errors management
    if (first_name !== null && paternal_surname !== null && maternal_surname !== null && gender !== null && birth_date !== null && phone_number !== null && person_2040 !== null && has_photo !== null && religion !== null && health_insurance !== null && civil_status !== null && status !== null && relationship !== null && beneficiary_id !== null && school_level !== null && last_school_grade !== null && is_studying !== null && career !== null && job_name !== null && occupation !== null && has_health_insurance !== null && position !== null) {
        try {
            // Calling service to create familiar
            const familiar = await create_familiar_service(first_name, paternal_surname, maternal_surname, gender, new Date(birth_date), phone_number, person_2040, has_photo, religion, health_insurance, civil_status, status, relationship, beneficiary_id, school_level, last_school_grade, is_studying, career, job_name, occupation, has_health_insurance, position, salary);

            res.status(200).json(familiar);
        } catch (e) {
            res.status(500).json({ error: "Unable to create familiar"});
            console.log(e);
        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}

export async function update_familiar_controller(req: Request, res: Response) {

    // Comprobation of the method
    if (req.method !== "PUT") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { id, first_name, paternal_surname, maternal_surname, gender, birth_date, phone_number, person_2040, has_photo, religion, health_insurance, civil_status, status, relationship, beneficiary_id, school_level, last_school_grade, is_studying, career, job_name, occupation, has_health_insurance, position, salary } = req.body;

    // Errors management
    if (id !== null && first_name !== null && paternal_surname !== null && maternal_surname !== null && gender !== null && birth_date !== null && phone_number !== null && person_2040 !== null && has_photo !== null && religion !== null && health_insurance !== null && civil_status !== null && status !== null && relationship !== null && beneficiary_id !== null && school_level !== null && last_school_grade !== null && is_studying !== null && career !== null && job_name !== null && occupation !== null && has_health_insurance !== null && position !== null) {
        try {
            // Calling service to update familiar
            const familiar = await update_familiar_service(id, first_name, paternal_surname, maternal_surname, gender, new Date(birth_date), phone_number, person_2040, has_photo, religion, health_insurance, civil_status, status, relationship, beneficiary_id, school_level, last_school_grade, is_studying, career, job_name, occupation, has_health_insurance, position, salary);

            res.status(200).json(familiar);
        } catch (e) {
            res.status(500).json({ error: "Unable to update familiar with id: " + id.toString() });
            console.log(e);
        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}

export async function delete_familiar_controller(req: Request, res: Response) {

    // Comprobation of the method
    if (req.method !== "DELETE") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const id = Number(req.params.id)
    // Errors managementS
    if (id !== null) {
        try {
            // Calling service to delete familiar with id
            const familiar = await delete_familiar_service(id);

            res.status(200).json(familiar);
        } catch (e) {
            res.status(500).json({ error: "Unable to delete familiar with id: " + id.toString() });
            console.log(e);
        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}