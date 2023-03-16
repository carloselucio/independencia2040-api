import { Request, Response } from 'express';
import { get_people_service, get_people_by_name_service, get_person_by_id_service } from "../services/person";

export async function get_people_controller(req: Request, res: Response) {

    // Comprobation of the method
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // Calling service to get Plan Independencia 2040 people
        const people = await get_people_service();
        res.status(200).json(people);
    } catch (e) {
        res.status(500).json({ error: "Unable to get people"});
        console.log(e);
    }
}

export async function get_people_by_name_controller(req: Request, res: Response) {

    // Comprobation of the method
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const name = req.params.name

    // Errors management
    if (name !== null) {
        try {
            // Calling service to get Plan Independencia 2040 people
            const people = await get_people_by_name_service(name);
            res.status(200).json(people);
        } catch (e) {
            res.status(500).json({ error: "Unable to get people with name: " + name});
            console.log(e);
        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}

export async function get_person_by_id_controller(req: Request, res: Response) {

    // Comprobation of the method
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const id = Number(req.params.id)

    // Errors management
    if (id !== null) {
        try {
            // Calling service to get person with id
            const user = await get_person_by_id_service(id);

            res.status(200).json(user);
        } catch (e) {
            res.status(500).json({ error: "Unable to get person with id: " + id.toString() });
            console.log(e);
        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}