import { Request, Response } from 'express';
import { login_service } from "../services/user";

export async function login_controller(req: Request, res: Response) {

    // Comprobation of the method
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { email, password } = req.body;

    // Errors management
    if (email !== null && password !== null) {
        try {
            // Calling service to validate login
            const user = await login_service(email, password);

            res.status(200).json(user);
        } catch (e) {
            res.status(500).json({ error: "Unable get user with email: " + email.toString() });
            console.log(e);
        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}