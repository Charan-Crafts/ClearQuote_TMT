const express = require('express');

const translateController = require("../controller/translateController");

const router = express.Router();

router.post("/translate",translateController.translateText);

router.put("/update-translation/:id/:languageCode",translateController.editTranslation)

router.get("/get-translations/:id",translateController.getTranslationTextFromAnotherLanguage)

router.delete("/delete-translation/:id",translateController.deleteTranslation)

router.get("/translate",translateController.getAllTranslatedText);

router.delete("/delete-translation/:id/:languageCode",translateController.deleteParticularTranslation)

router.post("/create-translation-key", translateController.createTranslationKey);

router.get("/search", translateController.searchTranslations);

module.exports = router;