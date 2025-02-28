import { Router } from "express";
import dashboard from "./dashboard.js";
import violationSearch from "./violation.search.js";
const violationRouter = Router();

violationRouter.get("/", violationSearch);
violationRouter.get("/dashboard", dashboard);

export default violationRouter;
