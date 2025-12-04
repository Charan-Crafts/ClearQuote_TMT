const translate = require('google-translate-api-x');

const translateModel = require("../models/TranslateModel");
const { text } = require('express');

const translateText = async (req, res) => {


    const { text, targetLanguage } = req.body;

    try {

        const response = await translate(text, { to: targetLanguage })

        // Now store the translation in the database

        // First find if there is already a document for the text

        let search = text.toLowerCase().trim();

        const textDoc = await translateModel.findOne({ text: search })

        // if textDoc is found, update it, else create a new one

        if (textDoc) {
            // Check for the LanguageCode already exists

            const exists = await textDoc.translations.find(t => t.languageCode === targetLanguage);

            console.log("Exists:", exists);

            if (exists) {
                return res.status(200).json(
                    {
                        success: true,
                        message: "Translation fetched successfully",
                        data: textDoc.translations.find(t => t.languageCode === targetLanguage)
                    }
                )
            }

            // Store the new translation

            textDoc.translations.push({
                languageCode: targetLanguage,
                translatedText: response.text
            });

            await textDoc.save();

            return res.status(200).json(
                {
                    success: true,
                    message: "Translation fetched successfully",
                    data: textDoc.translations.find(t => t.languageCode === targetLanguage)
                })
        }
        // Create a new document
        const newTextDoc = new translateModel({
            text: text,
            translations: [{
                languageCode: targetLanguage,
                translatedText: response.text
            }]
        });

        await newTextDoc.save();

        return res.status(200).json(
            {
                success: true,
                message: "Translation fetched successfully",
                data: newTextDoc.translations[0]
            })


    } catch (error) {

        console.error("Translation Error:", error);

        return res.status(500).json({ message: "Translation failed" });
    }
}

const editTranslation = async (req, res) => {

    const { id, languageCode } = req.params;

    const { newTranslation } = req.body;

    try {

        const textDoc = await translateModel.findById(id);

        for (const translate of textDoc.translations) {
            if (translate.languageCode === languageCode) {
                translate.translatedText = newTranslation;
                await textDoc.save();
                return res.status(200).json(
                    {
                        success: true,
                        message: "Translation updated successfully",
                        data: translate
                    }
                )
            }
        }


    } catch (error) {
        console.error("Edit Translation Error:", error);
        return res.status(500).json({ message: "Edit Translation failed" });
    }
}

const deleteParticularTranslation = async (req, res) => {

    const { id, languageCode } = req.params;

    try {

        const textDoc = await translateModel.findById(id);
        textDoc.translations = textDoc.translations.filter(t => t.languageCode !== languageCode);

        await textDoc.save();
        return res.status(200).json(
            {
                success: true,
                message: "Translation deleted successfully",
            }
        )

    } catch (error) {
        console.error("Delete Particular Translation Error:", error);
        return res.status(500).json({ message: "Delete Particular Translation failed" });
    }
}

const getTranslationTextFromAnotherLanguage = async (req, res) => {

    const { id } = req.params;

    try {

        const textDoc = await translateModel.findById(id);

        return res.status(200).json(
            {
                success: true,
                message: "Translation fetched successfully",
                data: textDoc
            }
        )
    } catch (error) {
        return res.status(500).json({ message: "Fetch Translation failed" });
    }
}

const deleteTranslation = async (req, res) => {

    const { id } = req.params;

    try {

        const textDoc = await translateModel.findByIdAndDelete(id);

        return res.status(200).json(
            {
                success: true,
                message: "Translation deleted successfully",
            }
        )

    } catch (error) {
        console.error("Delete Translation Error:", error);
        return res.status(500).json({ message: "Delete Translation failed" });
    }
}

const getAllTranslatedText = async (req, res) => {
    try {

        const allTexts = await translateModel.find({});

        return res.status(200).json(
            {
                success: true,
                message: "",
                data: allTexts
            })

    } catch (error) {
        console.error("Get All Translated Text Error:", error);
        return res.status(500).json({ message: "Get All Translated Text failed" });
    }
}

module.exports = { translateText, editTranslation, getTranslationTextFromAnotherLanguage, deleteTranslation, getAllTranslatedText , deleteParticularTranslation};