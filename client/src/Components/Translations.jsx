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
                <div className={`mb-4 p-3 rounded-lg ${
                    message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                    {message.text}
                </div>
            )}

            <div className='w-full p-3 flex justify-center mb-6'>
                <input 
                    type="search" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search Key or Translation...' 
                    className='w-3/4 items-center text-black p-3 border-2 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400' 
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
                            <div className="overflow-x-auto bg-white p-4 rounded-2xl mb-4 shadow-lg" key={item._id}>
                                <div className="collapse border border-gray-200">
                                    <input type="checkbox" className="peer" />
                                    <div className="collapse-title peer-checked:text-secondary-content text-xl font-bold text-black">
                                        {item.text}
                                    </div>

                                    <div className="collapse-content overflow-x-auto">
                                        <table className="table w-full">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="px-4 py-3 text-left">#</th>
                                                    <th className="px-4 py-3 text-left">Language Code</th>
                                                    <th className="px-4 py-3 text-left">Translation Text</th>
                                                    <th className="px-4 py-3 text-center">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.translations.map((translation, index) => (
                                                    <tr key={translation.languageCode ?? index} className="hover:bg-gray-50">
                                                        <td className="px-4 py-3">{index + 1}</td>
                                                        <td className="px-4 py-3 font-medium">{translation.languageCode}</td>
                                                        <td className="px-4 py-3">
                                                            {editing.id === item._id && editing.lang === translation.languageCode ? (
                                                                <input
                                                                    type="text"
                                                                    value={editing.value}
                                                                    onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                                                                    className="w-full px-2 py-1 border border-gray-300 rounded text-black"
                                                                    autoFocus
                                                                />
                                                            ) : (
                                                                <span>{translation.translatedText}</span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            {editing.id === item._id && editing.lang === translation.languageCode ? (
                                                                <div className="inline-flex items-center justify-center gap-2">
                                                                    <button 
                                                                        onClick={handleSaveEdit}
                                                                        className='text-white bg-green-600 px-4 py-2 cursor-pointer rounded-lg hover:bg-green-700'
                                                                    >
                                                                        Save
                                                                    </button>
                                                                    <button 
                                                                        onClick={handleCancelEdit}
                                                                        className='text-white bg-gray-600 px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-700'
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div className="inline-flex items-center justify-center gap-2">
                                                                    <button 
                                                                        onClick={() => handleEdit(item._id, translation.languageCode, translation.translatedText)}
                                                                        className='text-white bg-blue-600 px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-700'
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => handleDeleteParticular(item._id, translation.languageCode)}
                                                                        className='text-white bg-red-600 px-4 py-2 cursor-pointer rounded-lg hover:bg-red-700'
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
                                        <div className="mt-4 flex justify-end">
                                            <button 
                                                onClick={() => handleDelete(item._id)}
                                                className='text-white bg-red-600 px-6 py-2 cursor-pointer rounded-lg hover:bg-red-700'
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
