import { Router } from "express";
import violationSearch from "./violation.search.js";
const violationRouter = Router();

violationRouter.get("/", violationSearch);

export default violationRouter;
