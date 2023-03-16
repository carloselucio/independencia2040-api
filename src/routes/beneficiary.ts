import express from "express";
import { create_beneficiary_controller, update_beneficiary_controller, delete_beneficiary_controller } from "../controllers/beneficiary";

let router = express.Router();

router.route('/create_beneficiary')
    .post(create_beneficiary_controller);

router.route('/update_beneficiary')
    .put(update_beneficiary_controller);

router.route('/delete_beneficiary/:id')
    .delete(delete_beneficiary_controller);

export default router;