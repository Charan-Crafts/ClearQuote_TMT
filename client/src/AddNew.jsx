import React, { useState } from "react";
import { api } from "./utils/api"
import { useNavigate } from "react-router-dom";

const AddNew = () => {
    const navigate = useNavigate();
    const [translationKey, setTranslationKey] = useState("");
    const [englishText, setEnglishText] = useState("");
    const [selectedLanguages, setSelectedLanguages] = useState(['hi', 'te', 'ta']);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [generatedTranslations, setGeneratedTranslations] = useState(null);

    const availableLanguages = [
        { code: 'en', label: 'English' },
        { code: 'hi', label: 'Hindi' },
        { code: 'te', label: 'Telugu' },
        { code: "kn", label: 'Kannada' },
        { code: "ml", label: 'Malayalam' },
        { code: "mr", label: 'Marathi' },
        { code: "gu", label: 'Gujarati' },
        { code: "bn", label: 'Bengali' },
        { code: "pa", label: 'Punjabi' },
        { code: "or", label: 'Odia' },
        { code: "ur", label: 'Urdu' },
        { code: 'ta', label: 'Tamil' },
        { code: 'es', label: 'Spanish' },
        { code: 'fr', label: 'French' },
        { code: 'de', label: 'German' },
        { code: 'ja', label: 'Japanese' },
        { code: 'ko', label: 'Korean' },
        { code: 'zh', label: 'Chinese' },
        { code: 'ar', label: 'Arabic' },
        { code: 'pt', label: 'Portuguese' },
        { code: 'ru', label: 'Russian' },
        { code: 'it', label: 'Italian' },
        { code: 'nl', label: 'Dutch' },
        { code: 'pl', label: 'Polish' },
        { code: 'tr', label: 'Turkish' },
        { code: 'vi', label: 'Vietnamese' },
        { code: 'th', label: 'Thai' },
        { code: 'id', label: 'Indonesian' }
    ];

    const toggleLanguage = (code) => {
        setSelectedLanguages(prev =>
            prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
        );
    };

    const handleAutoGenerate = async () => {
        if (!translationKey.trim() || !englishText.trim()) {
            setMessage({ type: 'error', text: 'Please enter both translation key and English text' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            return;
        }

        if (selectedLanguages.length === 0) {
            setMessage({ type: 'error', text: 'Please select at least one language' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const result = await api.createTranslationKey(translationKey, englishText, selectedLanguages);
            setGeneratedTranslations(result);
            setMessage({ type: 'success', text: 'Translations generated successfully!' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to generate translations' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!translationKey.trim() || !englishText.trim()) {
            setMessage({ type: 'error', text: 'Please enter both translation key and English text' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            return;
        }

        if (selectedLanguages.length === 0) {
            setMessage({ type: 'error', text: 'Please select at least one language' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await api.createTranslationKey(translationKey, englishText, selectedLanguages);
            setMessage({ type: 'success', text: 'Translation saved successfully!' });
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to save translation' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">

                <div className="mb-4 sm:mb-6 rounded-2xl overflow-hidden p-4 sm:p-6 shadow bg-white">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">Add New Translation</h1>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">Create a new translation key with multiple language support.</p>
                </div>

                {/* Card */}
                <form onSubmit={handleSave} className="bg-white shadow rounded-xl p-4 sm:p-6">
                    {message.text && (
                        <div className={`mb-4 p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    {/* Translation Key */}
                    <label htmlFor="key" className="block text-sm font-semibold text-gray-900 mb-2">Translation Key</label>
                    <input
                        id="key"
                        type="text"
                        value={translationKey}
                        onChange={(e) => setTranslationKey(e.target.value)}
                        placeholder="Enter translation key..."
                        className="w-full mt-2 mb-4 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32B9B9] text-gray-900 placeholder-gray-400"
                        required
                    />

                    {/* English Text */}
                    <label htmlFor="english" className="block text-sm font-semibold text-gray-900 mb-2">English Text</label>
                    <input
                        id="english"
                        type="text"
                        value={englishText}
                        onChange={(e) => setEnglishText(e.target.value)}
                        placeholder="Enter English text..."
                        className="w-full mt-2 mb-4 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32B9B9] text-gray-900 placeholder-gray-400"
                        required
                    />

                    {/* Language selector + Translation Inputs */}
                    <div className="mt-4">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Select Languages</label>

                        {/* Dropdown */}
                        <div className="relative inline-block text-left w-full">
                            <button
                                type="button"
                                onClick={() => setDropdownOpen(o => !o)}
                                className="w-full inline-flex justify-between items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32B9B9] hover:border-gray-400 transition-colors"
                                aria-haspopup="true"
                                aria-expanded={dropdownOpen}
                            >
                                <div className="truncate text-sm text-gray-900">
                                    {selectedLanguages.length === 0
                                        ? 'No languages selected'
                                        : selectedLanguages.length > 2
                                            ? `${selectedLanguages.length} languages selected`
                                            : selectedLanguages.map(code => availableLanguages.find(l => l.code === code)?.label).join(', ')}
                                </div>
                                <svg className={`w-4 h-4 text-gray-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-xl p-2 sm:p-3 max-h-60 sm:max-h-80 overflow-auto">
                                    <div className="flex flex-col gap-1 sm:gap-2">
                                        {availableLanguages.map(lang => (
                                            <label key={lang.code} className="text-gray-900 inline-flex items-center gap-2 text-sm px-2 py-1.5 sm:py-2 rounded hover:bg-gray-100 cursor-pointer transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedLanguages.includes(lang.code)}
                                                    onChange={() => toggleLanguage(lang.code)}
                                                    className="w-4 h-4 text-[#32B9B9] border-gray-300 rounded focus:ring-[#32B9B9]"
                                                />
                                                <span className="truncate">{lang.label} <span className="text-xs text-gray-500">({lang.code})</span></span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {generatedTranslations && (
                        <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Generated Translations:</h3>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {generatedTranslations.translations.map((t, idx) => (
                                    <div key={idx} className="text-sm text-gray-800 bg-white p-2 rounded border border-gray-200">
                                        <span className="font-semibold text-gray-900">{t.languageCode.toUpperCase()}:</span> <span className="text-gray-700">{t.translatedText}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={handleAutoGenerate}
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center px-4 py-2.5 sm:py-3 rounded-lg bg-white border-2 border-gray-300 text-gray-900 font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                        >
                            {loading ? 'Generating...' : 'Auto Generate Translations'}
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center px-4 py-2.5 sm:py-3 rounded-lg bg-[#32B9B9] text-white font-medium shadow-md hover:bg-[#2aa6a6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                        >
                            {loading ? 'Saving...' : 'Save Translation'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNew;
