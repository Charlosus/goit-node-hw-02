const express = require("express");

const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name) {
    return res.status(400).json({ message: "missing required name - field" });
  }

  if (!email) {
    return res.status(400).json({ message: "missing required email - field" });
  }

  if (!phone) {
    return res.status(400).json({ message: "missing required phone - field" });
  }

  const newContact = await addContact({ name, email, phone });
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);

  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "missing fields" });
  }

  const updated = await updateContact(contactId, req.body);

  if (!updated) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(updated);
});

module.exports = router;
