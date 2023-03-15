import express from "express";
import { create_familiar_controller } from "../controllers/familiar";

let router = express.Router();

router.route('/create_familiar')
    .post(create_familiar_controller);

export default router;