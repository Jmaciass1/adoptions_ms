import { Router } from "express";
import asyncError from "../middlewares/asyncError.middleware";
import {
  getAdoptions,
  createAdoption,
  getAdoption,
  deleteAdoption,
  updateAdoption,
  resolveAdoption,
} from "../controllers/adoptions.controller";

const router = Router();

router.route("/").get(asyncError(getAdoptions)).post(asyncError(createAdoption));

router
  .route("/:adoptionId")
  .get(asyncError(getAdoption))
  .delete(asyncError(deleteAdoption))
  .put(asyncError(updateAdoption))
  .patch(asyncError(resolveAdoption));

export default router;

