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
import { authenticate } from "../middelware/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.get("/",authenticate , getAllContacts);

contactsRouter.get("/:id",authenticate, isValidId, getOneContact);

contactsRouter.delete("/:id",authenticate, isValidId, deleteContact);

contactsRouter.post("/",authenticate ,validateBody(createContactSchema), createContact);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  checkUpdateBody,
  validateBody(updateContactSchema),
  updateContact
);
contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateContactStatusSchema),
  updateStatusContact
);

export default contactsRouter;
