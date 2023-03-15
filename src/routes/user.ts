import express from "express";
import { login_controller } from "../controllers/user";

let router = express.Router();

router.route('/login')
    .get(login_controller);

export default router;