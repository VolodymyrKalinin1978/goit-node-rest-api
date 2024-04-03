import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import { checkUpdateBody } from "../middelware/checkUpdateBody.js";
import { checkId } from "../middelware/checkId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", checkId, getOneContact);

contactsRouter.delete("/:id", checkId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put(
  "/:id",
  checkId,
  checkUpdateBody,
  validateBody(updateContactSchema),
  updateContact
);

export default contactsRouter;
