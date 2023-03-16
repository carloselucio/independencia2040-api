import { Request, Response } from 'express';
import { create_beneficiary_service, update_beneficiary_service, delete_beneficiary_service } from "../services/beneficiary";

export async function create_beneficiary_controller(req: Request, res: Response) {

    // Comprobation of the method
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { first_name, paternal_surname, maternal_surname, gender, birth_date, phone_number, person_2040, has_photo, religion, health_insurance, civil_status, status, curp, is_tentative_birth_date, how_found_out, state, municipality, locality, neighborhood, street, outdoor_number, interior_number, zip_code, parents_civil_status, house_type, number_of_siblings, civil_registration, has_birth_certificate_photo, birth_hospital, birth_weight, birth_height, has_vaccination_card_photo, vaccines, responsible_id } = req.body;

    // Errors management
    if (first_name && paternal_surname && maternal_surname && gender && birth_date && phone_number && person_2040 && has_photo && religion && health_insurance && civil_status && status && is_tentative_birth_date && how_found_out && state && municipality && locality && neighborhood && parents_civil_status && house_type && number_of_siblings && civil_registration && has_birth_certificate_photo && birth_hospital && has_vaccination_card_photo && vaccines && responsible_id) {
        try {
            // Calling service to create beneficiary
            const beneficiary = await create_beneficiary_service(first_name, paternal_surname, maternal_surname, gender, birth_date, phone_number, person_2040, has_photo, religion, health_insurance, civil_status, status, curp, is_tentative_birth_date, how_found_out, state, municipality, locality, neighborhood, street, outdoor_number, interior_number, zip_code, parents_civil_status, house_type, number_of_siblings, civil_registration, has_birth_certificate_photo, birth_hospital, birth_weight, birth_height, has_vaccination_card_photo, vaccines, responsible_id);

            res.status(200).json(beneficiary);
        } catch (e) {
            res.status(500).json({ error: "Unable to create beneficiary"});
            console.log(e);
        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}

export async function update_beneficiary_controller(req: Request, res: Response) {

    // Comprobation of the method
    if (req.method !== "PUT") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { id, first_name, paternal_surname, maternal_surname, gender, birth_date, phone_number, person_2040, has_photo, religion, health_insurance, civil_status, status, curp, is_tentative_birth_date, how_found_out, state, municipality, locality, neighborhood, street, outdoor_number, interior_number, zip_code, parents_civil_status, house_type, number_of_siblings, civil_registration, has_birth_certificate_photo, birth_hospital, birth_weight, birth_height, has_vaccination_card_photo, vaccines, responsible_id } = req.body;

    // Errors management
    if (id && first_name && paternal_surname && maternal_surname && gender && birth_date && phone_number && person_2040 && has_photo && religion && health_insurance && civil_status && status && is_tentative_birth_date && how_found_out && state && municipality && locality && neighborhood && parents_civil_status && house_type && number_of_siblings && civil_registration && has_birth_certificate_photo && birth_hospital && has_vaccination_card_photo && vaccines && responsible_id) {
        try {
            // Calling service to update beneficiary
            const beneficiary = await update_beneficiary_service(id, first_name, paternal_surname, maternal_surname, gender, birth_date, phone_number, person_2040, has_photo, religion, health_insurance, civil_status, status, curp, is_tentative_birth_date, how_found_out, state, municipality, locality, neighborhood, street, outdoor_number, interior_number, zip_code, parents_civil_status, house_type, number_of_siblings, civil_registration, has_birth_certificate_photo, birth_hospital, birth_weight, birth_height, has_vaccination_card_photo, vaccines, responsible_id);

            res.status(200).json(beneficiary);
        } catch (e) {
            res.status(500).json({ error: "Unable to update beneficiary with id: " + id.toString() });
            console.log(e);
        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    } 
}

export async function delete_beneficiary_controller(req: Request, res: Response) {

    // Comprobation of the method
    if (req.method !== "DELETE") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const id = Number(req.params.id)
    // Errors managementS
    if (id) {
        try {
            // Calling service to delete beneficiary with id
            const beneficiary = await delete_beneficiary_service(id);

            res.status(200).json(beneficiary);
        } catch (e) {
            res.status(500).json({ error: "Unable to delete beneficiary with id: " + id.toString() });
            console.log(e);
        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}