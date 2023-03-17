import { Request, Response } from 'express';
import { create_beneficiary_service, update_beneficiary_service, delete_beneficiary_service } from "../services/beneficiary";

export async function create_beneficiary_controller(req: Request, res: Response) {

    // Comprobation of the method
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { first_name, paternal_surname, maternal_surname, gender, birth_date, phone_number, person_2040, has_photo, religion, health_insurance, civil_status, status, curp, is_tentative_birth_date, how_found_out, state, municipality, locality, neighborhood, street, outdoor_number, interior_number, zip_code, parents_civil_status, house_type, number_of_siblings, civil_registration, has_birth_certificate_photo, birth_hospital, birth_weight, birth_height, has_vaccination_card_photo, vaccines, responsible_id, spiritualities } = req.body;

    // Errors management
    if (first_name !== null && paternal_surname !== null && maternal_surname !== null && gender !== null && birth_date !== null && phone_number !== null && person_2040 !== null && has_photo !== null && religion !== null && health_insurance !== null && civil_status !== null && status !== null && is_tentative_birth_date !== null && how_found_out !== null && state !== null && municipality !== null && locality !== null && neighborhood !== null && parents_civil_status !== null && house_type !== null && number_of_siblings !== null && civil_registration !== null && has_birth_certificate_photo !== null && birth_hospital !== null && has_vaccination_card_photo !== null && vaccines !== null && responsible_id !== null && spiritualities!== null) {
        try {
            let vaccines_updated: Array<{name: string, was_applied: boolean, date: Date}> = []
            if (vaccines) {
                vaccines_updated = vaccines.map(function(v: {name: string, was_applied: boolean, date: string}){
                    return { name: v.name, was_applied: v.was_applied, date: new Date(v.date) }
                })
            }

            // Calling service to create beneficiary
            const beneficiary = await create_beneficiary_service(first_name, paternal_surname, maternal_surname, gender, new Date(birth_date), phone_number, person_2040, has_photo, religion, health_insurance, civil_status, status, curp, is_tentative_birth_date, how_found_out, state, municipality, locality, neighborhood, street, outdoor_number, interior_number, zip_code, parents_civil_status, house_type, number_of_siblings, civil_registration, has_birth_certificate_photo, birth_hospital, birth_weight, birth_height, has_vaccination_card_photo, vaccines_updated, responsible_id, spiritualities);

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

    const { id, first_name, paternal_surname, maternal_surname, gender, birth_date, phone_number, person_2040, has_photo, religion, health_insurance, civil_status, status, curp, is_tentative_birth_date, how_found_out, state, municipality, locality, neighborhood, street, outdoor_number, interior_number, zip_code, parents_civil_status, house_type, number_of_siblings, civil_registration, has_birth_certificate_photo, birth_hospital, birth_weight, birth_height, has_vaccination_card_photo, vaccines, responsible_id, spiritualities} = req.body;

    // Errors management
    if (id !==null && first_name !== null && paternal_surname !== null && maternal_surname !== null && gender !== null && birth_date !== null && phone_number !== null && person_2040 !== null && has_photo !== null && religion !== null && health_insurance !== null && civil_status !== null && status !== null && is_tentative_birth_date !== null && how_found_out !== null && state !== null && municipality !== null && locality !== null && neighborhood !== null && parents_civil_status !== null && house_type !== null && number_of_siblings !== null && civil_registration !== null && has_birth_certificate_photo !== null && birth_hospital !== null && has_vaccination_card_photo !== null && vaccines !== null && responsible_id !== null && spiritualities!== null) {
        try {
            let vaccines_updated: Array<{name: string, was_applied: boolean, date: Date}> = []
            if (vaccines) {
                vaccines_updated = vaccines.map(function(v: {name: string, was_applied: boolean, date: string}){
                    return { name: v.name, was_applied: v.was_applied, date: new Date(v.date) }
                })
            }

            // Calling service to update beneficiary
            const beneficiary = await update_beneficiary_service(id, first_name, paternal_surname, maternal_surname, gender, new Date(birth_date), phone_number, person_2040, has_photo, religion, health_insurance, civil_status, status, curp, is_tentative_birth_date, how_found_out, state, municipality, locality, neighborhood, street, outdoor_number, interior_number, zip_code, parents_civil_status, house_type, number_of_siblings, civil_registration, has_birth_certificate_photo, birth_hospital, birth_weight, birth_height, has_vaccination_card_photo, vaccines_updated, responsible_id, spiritualities);

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
    if (id !== null) {
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