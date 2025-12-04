import React, { useState } from "react";
import {api} from "./utils/api"
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
        { code: 'hi', label: 'Hindi' },
        { code: 'te', label: 'Telugu' },
        { code: 'ta', label: 'Tamil' },
        { code: 'en', label: 'English' }
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
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-4xl mx-auto">
                
                <div className="mb-6 rounded-2xl overflow-hidden  p-6 shadow">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-black">Add New Translation</h1>
                    <p className="text-sm text-black/90 mt-1">Create a new translations.</p>
                </div>

                {/* Card */}
                <form onSubmit={handleSave} className="bg-white shadow rounded-xl p-6">
                    {message.text && (
                        <div className={`mb-4 p-3 rounded-lg ${
                            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                        }`}>
                            {message.text}
                        </div>
                    )}

                    {/* Translation Key */}
                    <label htmlFor="key" className="block text-sm font-semibold text-gray-700">Translation Key</label>
                    <input
                        id="key"
                        type="text"
                        value={translationKey}
                        onChange={(e) => setTranslationKey(e.target.value)}
                        placeholder="Enter translation key..."
                        className="w-full mt-2 mb-4 px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 text-black"
                        required
                    />

                    {/* English Text */}
                    <label htmlFor="english" className="block text-sm font-semibold text-gray-700">English Text</label>
                    <input
                        id="english"
                        type="text"
                        value={englishText}
                        onChange={(e) => setEnglishText(e.target.value)}
                        placeholder="Enter English text..."
                        className="w-full mt-2 mb-4 px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 text-black"
                        required
                    />

                    {/* Language selector + Translation Inputs */}
                    <div className="mt-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Languages</label>

                        {/* Dropdown */}
                        <div className="relative inline-block text-left w-full">
                            <button
                                type="button"
                                onClick={() => setDropdownOpen(o => !o)}
                                className="w-full inline-flex justify-between items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none"
                                aria-haspopup="true"
                                aria-expanded={dropdownOpen}
                            >
                                <div className="truncate text-sm text-gray-800">
                                    {selectedLanguages.length === 0 ? 'No languages selected' : selectedLanguages.map(code => availableLanguages.find(l => l.code === code)?.label).join(', ')}
                                </div>
                                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                                    <div className="flex flex-col gap-2 max-h-40 overflow-auto">
                                        {availableLanguages.map(lang => (
                                            <label key={lang.code} className=" text-black inline-flex items-center gap-2 text-sm px-2 py-1 rounded hover:bg-gray-50 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedLanguages.includes(lang.code)}
                                                    onChange={() => toggleLanguage(lang.code)}
                                                    className="w-4 h-4"
                                                />
                                                <span className="truncate">{lang.label} <span className="text-xs text-gray-400">({lang.code})</span></span>
                                            </label>
                                        ))}
                                    </div>
                                    
                                </div>
                            )}
                        </div>

                        
                    </div>

                    {generatedTranslations && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Generated Translations:</h3>
                            <div className="space-y-2">
                                {generatedTranslations.translations.map((t, idx) => (
                                    <div key={idx} className="text-sm">
                                        <span className="font-medium">{t.languageCode}:</span> {t.translatedText}
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
                            className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-700 shadow hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Generating...' : 'Auto Generate Translations'}
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-sky-600 text-white font-medium shadow hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
