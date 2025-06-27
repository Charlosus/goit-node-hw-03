const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  getContact,
  initiateContact,
  patchContact,
  putContact,
  deleteContact,
  patchFavorite
} = require("../controllers/contacts/index");

router.get("/contacts", getAllContacts);
router.get("/contacts/:id", getContact);
router.post("/contacts", initiateContact);
router.patch("/contacts/:id", patchContact);
router.put("/contacts/:id", putContact);
router.delete("/contacts/:id", deleteContact);
router.patch("/contacts/:id/favorite", patchFavorite)

module.exports = router;
