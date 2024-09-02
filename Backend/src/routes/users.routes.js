import { Router } from "express";
import {
  login,
  register,
  addtohistory,
  getuserhistory,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/add_to_activity").post(addtohistory);
router.route("/get_all_activity").get(getuserhistory);

export default router;
