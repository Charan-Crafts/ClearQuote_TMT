import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const Translations = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState({ id: null, lang: null, value: '' });
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        loadTranslations();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm) {
                handleSearch();
            } else {
                loadTranslations();
            }
        }, 300);

        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    const loadTranslations = async () => {
        setLoading(true);
        try {
            const result = await api.getAllTranslations();
            setData(result);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to load translations' });
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const result = await api.searchTranslations(searchTerm);
            setData(result);
        } catch (error) {
            setMessage({ type: 'error', text: 'Search failed' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id, lang, currentText) => {
        setEditing({ id, lang, value: currentText });
    };

    const handleSaveEdit = async () => {
        if (!editing.value.trim()) {
            setMessage({ type: 'error', text: 'Translation cannot be empty' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            return;
        }

        try {
            await api.updateTranslation(editing.id, editing.lang, editing.value);
            setMessage({ type: 'success', text: 'Translation updated successfully' });
            setEditing({ id: null, lang: null, value: '' });
            loadTranslations();
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update translation' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const handleCancelEdit = () => {
        setEditing({ id: null, lang: null, value: '' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this translation key?')) {
            return;
        }

        try {
            await api.deleteTranslation(id);
            setMessage({ type: 'success', text: 'Translation deleted successfully' });
            loadTranslations();
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to delete translation' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const handleDeleteParticular = async (id, lang) => {
        if (!window.confirm(`Are you sure you want to delete the ${lang} translation?`)) {
            return;
        }

        try {
            await api.deleteParticularTranslation(id, lang);
            setMessage({ type: 'success', text: 'Translation deleted successfully' });
            loadTranslations();
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to delete translation' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto">
            {message.text && (
                <div className={`mb-4 p-3 rounded-lg text-sm border ${message.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
                    }`}>
                    {message.text}
                </div>
            )}

            <div className='w-full p-2 sm:p-3 flex justify-center mb-4 sm:mb-6'>
                <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search Key or Translation...'
                    className='w-full sm:w-3/4 items-center text-gray-900 p-2.5 sm:p-3 border-2 border-gray-300 rounded-xl sm:rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32B9B9] focus:border-[#32B9B9] placeholder-gray-400'
                />
            </div>

            {loading ? (
                <div className="text-center py-8">
                    <p className="text-gray-600">Loading translations...</p>
                </div>
            ) : data.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600">No translations found</p>
                </div>
            ) : (
                <div>
                    {data.map((item) => {
                        return (
                            <div className="overflow-x-auto bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-md hover:shadow-lg transition-shadow" key={item._id}>
                                <div className="collapse border border-gray-200 rounded-lg">
                                    <input type="checkbox" className="peer" />
                                    <div className="collapse-title peer-checked:text-background text-lg sm:text-xl font-bold text-gray-900">
                                        {item.text}
                                    </div>

                                    <div className="collapse-content overflow-x-auto">
                                        <div className="overflow-x-auto">
                                            <table className="table w-full text-sm sm:text-base">
                                                <thead>
                                                    <tr className="bg-gray-100">
                                                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-gray-900 font-semibold">#</th>
                                                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-gray-900 font-semibold">Language Code</th>
                                                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-gray-900 font-semibold">Translation Text</th>
                                                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-gray-900 font-semibold">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {item.translations.map((translation, index) => (
                                                        <tr key={translation.languageCode ?? index} className="hover:bg-gray-50 border-b border-gray-100">
                                                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-700">{index + 1}</td>
                                                            <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-900 uppercase text-xs sm:text-sm">{translation.languageCode}</td>
                                                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-800">
                                                                {editing.id === item._id && editing.lang === translation.languageCode ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editing.value}
                                                                        onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                                                                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#32B9B9]"
                                                                        autoFocus
                                                                    />
                                                                ) : (
                                                                    <span className="break-all">{translation.translatedText}</span>
                                                                )}
                                                            </td>
                                                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                                                                {editing.id === item._id && editing.lang === translation.languageCode ? (
                                                                    <div className="inline-flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
                                                                        <button
                                                                            onClick={handleSaveEdit}
                                                                            className='text-white bg-green-600 px-2 sm:px-4 py-1.5 sm:py-2 cursor-pointer rounded-lg hover:bg-green-700 text-xs sm:text-sm transition-colors'
                                                                        >
                                                                            Save
                                                                        </button>
                                                                        <button
                                                                            onClick={handleCancelEdit}
                                                                            className='text-white bg-gray-600 px-2 sm:px-4 py-1.5 sm:py-2 cursor-pointer rounded-lg hover:bg-gray-700 text-xs sm:text-sm transition-colors'
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <div className="inline-flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
                                                                        <button
                                                                            onClick={() => handleEdit(item._id, translation.languageCode, translation.translatedText)}
                                                                            className='text-white bg-blue-600 px-2 sm:px-4 py-1.5 sm:py-2 cursor-pointer rounded-lg hover:bg-blue-700 text-xs sm:text-sm transition-colors'
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDeleteParticular(item._id, translation.languageCode)}
                                                                            className='text-white bg-red-600 px-2 sm:px-4 py-1.5 sm:py-2 cursor-pointer rounded-lg hover:bg-red-700 text-xs sm:text-sm transition-colors'
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="mt-3 sm:mt-4 flex justify-end">
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className='text-white bg-red-600 px-4 sm:px-6 py-1.5 sm:py-2 cursor-pointer rounded-lg hover:bg-red-700 text-xs sm:text-sm transition-colors'
                                            >
                                                Delete Entire Key
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
}

export default Translations;
