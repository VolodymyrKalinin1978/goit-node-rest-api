import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
} from "../schemas/contactsSchemas.js";
import { checkUpdateBody } from "../middelware/checkUpdateBody.js";
import { isValidId } from "../middelware/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put(
  "/:id",
  isValidId,
  checkUpdateBody,
  validateBody(updateContactSchema),
  updateContact
);
contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateContactStatusSchema),
  updateStatusContact
);

export default contactsRouter;
