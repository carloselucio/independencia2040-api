import { Request, Response } from 'express';
import { create_familiar_service } from "../services/familiar";

export async function create_familiar_controller(req: Request, res: Response) {

    // Comprobation of the method
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { first_name, paternal_surname, maternal_surname, gender, birth_date, phone_number, person_2040, has_photo, religion, health_insurance, civil_status, status, relationship, beneficiary_id, school_level, last_school_grade, is_studying, career, job_name, occupation, has_health_insurance, position, salary } = req.body;

    // Errors management
    if (first_name && paternal_surname && maternal_surname && gender && birth_date && phone_number && person_2040 && has_photo && religion && health_insurance && civil_status && status && relationship && beneficiary_id && school_level && last_school_grade && is_studying && career && job_name && occupation && has_health_insurance && position) {
        try {
            // Calling service to create familiar
            const familiar = await create_familiar_service(first_name, paternal_surname, maternal_surname, gender, birth_date, phone_number, person_2040, has_photo, religion, health_insurance, civil_status, status, relationship, beneficiary_id, school_level, last_school_grade, is_studying, career, job_name, occupation, has_health_insurance, position, salary);

            res.status(200).json(familiar);
        } catch (e) {
            res.status(500).json({ error: "Unable to create familiar"});
            console.log(e);
        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}