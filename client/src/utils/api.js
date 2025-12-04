const API_BASE_URL = 'http://localhost:3000/api/v1';

export const api = {
    async getAllTranslations() {
        const response = await fetch(`${API_BASE_URL}/translate`);
        if (!response.ok) throw new Error('Failed to fetch translations');
        const result = await response.json();
        return result.data || [];
    },

    async createTranslationKey(key, englishText, languages) {
        const response = await fetch(`${API_BASE_URL}/create-translation-key`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, englishText, languages })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create translation key');
        }
        const result = await response.json();
        return result.data;
    },

    async searchTranslations(searchTerm) {
        const url = searchTerm
            ? `${API_BASE_URL}/search?q=${encodeURIComponent(searchTerm)}`
            : `${API_BASE_URL}/translate`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to search translations');
        const result = await response.json();
        return result.data || [];
    },

    async updateTranslation(id, languageCode, newTranslation) {
        const response = await fetch(`${API_BASE_URL}/update-translation/${id}/${languageCode}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newTranslation })
        });
        if (!response.ok) throw new Error('Failed to update translation');
        const result = await response.json();
        return result.data;
    },

    async deleteTranslation(id) {
        const response = await fetch(`${API_BASE_URL}/delete-translation/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete translation');
        return true;
    },

    async deleteParticularTranslation(id, languageCode) {
        const response = await fetch(`${API_BASE_URL}/delete-translation/${id}/${languageCode}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete translation');
        return true;
    }
};

