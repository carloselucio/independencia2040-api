import express from "express";
import { create_familiar_controller, update_familiar_controller, delete_familiar_controller } from "../controllers/familiar";

let router = express.Router();

router.route('/create_familiar')
    .post(create_familiar_controller);

router.route('/update_familiar')
    .put(update_familiar_controller);

router.route('/delete_familiar/:id')
    .delete(delete_familiar_controller);

export default router;