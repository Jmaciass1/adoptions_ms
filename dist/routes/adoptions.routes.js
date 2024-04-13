"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adoptions_controller_1 = require("../controllers/adoptions.controller");
const router = (0, express_1.Router)();
router.route("/").get(adoptions_controller_1.getAdoptions).post(adoptions_controller_1.createAdoption);
router.route("/:adoptionId").get(adoptions_controller_1.getAdoption).delete(adoptions_controller_1.deleteAdoption).put(adoptions_controller_1.updateAdoption);
exports.default = router;
