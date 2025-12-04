import React, { useState } from "react";

const AddNew = () => {
    const [englishText, setEnglishText] = useState("");
    const [translations, setTranslations] = useState({ hi: "", te: "", ta: "" });

    const availableLanguages = [
        { code: 'hi', label: 'Hindi' },
        { code: 'te', label: 'Telugu' },
        { code: 'ta', label: 'Tamil' },
        { code: 'en', label: 'English' }
    ];

    const [selectedLanguages, setSelectedLanguages] = useState(['hi', 'te', 'ta']);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleLanguage = (code) => {
        setSelectedLanguages(prev =>
            prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-4xl mx-auto">
                
                <div className="mb-6 rounded-2xl overflow-hidden  p-6 shadow">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-black">Add New Translation</h1>
                    <p className="text-sm text-black/90 mt-1">Create a new translations.</p>
                </div>

                {/* Card */}
                <form className="bg-white shadow rounded-xl p-6">
                    {/* English Text */}
                    <label htmlFor="english" className="block text-sm font-semibold text-gray-700">English Text</label>
                    <input
                        id="english"
                        type="text"
                        value={englishText}
                        onChange={(e) => setEnglishText(e.target.value)}
                        placeholder="Enter English text..."
                        className="w-full mt-2 mb-4 px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 text-black"
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

                    {/* Actions */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button type="button" className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-700 shadow hover:bg-gray-50">
                            Auto Generate Translations
                        </button>
                        <button type="submit" className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-sky-600 text-white font-medium shadow hover:bg-sky-700">
                            Save Translation
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNew;
