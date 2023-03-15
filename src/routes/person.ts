import express from "express";
import { get_people_controller, get_people_by_name_controller, get_person_by_id_controller } from "../controllers/person";

let router = express.Router();

router.route('/get_people')
    .get(get_people_controller);

router.route('/get_people/:name')
    .get(get_people_by_name_controller);

router.route('/get_person/:id')
    .get(get_person_by_id_controller);

export default router;