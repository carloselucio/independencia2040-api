import express from "express";
import { create_beneficiary_controller } from "../controllers/beneficiary";

let router = express.Router();

router.route('/create_beneficiary')
    .post(create_beneficiary_controller);

export default router;