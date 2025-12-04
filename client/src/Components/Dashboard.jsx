import React, { useState, useEffect } from "react";
import { KeyRound, Globe, Search, Languages } from "lucide-react";
import Translations from "./Translations";
import { api } from "../utils/api";

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalKeys: 0,
        languages: 0,
        autoTranslated: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const data = await api.getAllTranslations();
            const languageSet = new Set();
            let totalTranslations = 0;

            data.forEach(item => {
                item.translations.forEach(t => {
                    languageSet.add(t.languageCode);
                    totalTranslations++;
                });
            });

            setStats({
                totalKeys: data.length,
                languages: languageSet.size,
                autoTranslated: totalTranslations
            });
        } catch (error) {
            console.error('Failed to load stats:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6">

            {/* Hero / Header */}
            <header className="mb-4 sm:mb-6">
                <div className="rounded-2xl overflow-hidden p-4 sm:p-6 shadow bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">Translation Dashboard</h1>
                        <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-600">Overview of keys, languages and translations</p>
                    </div>
                </div>
            </header>

            {/* Stats Cards */}
            <section className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                    <div className="p-4 sm:p-5 bg-white shadow rounded-xl flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-xs sm:text-sm text-gray-600">Total Keys</p>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                                {loading ? '...' : stats.totalKeys}
                            </h2>
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-50">
                            <KeyRound className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </div>
                    </div>

                    <div className="p-4 sm:p-5 bg-white shadow rounded-xl flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-xs sm:text-sm text-gray-600">Languages</p>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                                {loading ? '...' : stats.languages}
                            </h2>
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-green-50">
                            <Languages className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                        </div>
                    </div>

                    <div className="p-4 sm:p-5 bg-white shadow rounded-xl flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-xs sm:text-sm text-gray-600">Total Translations</p>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                                {loading ? '...' : stats.autoTranslated}
                            </h2>
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-50">
                            <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                        </div>
                    </div>

                    <div className="p-4 sm:p-5 bg-white shadow rounded-xl flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-xs sm:text-sm text-gray-600">Avg per Key</p>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                                {loading ? '...' : stats.totalKeys > 0 ? Math.round(stats.autoTranslated / stats.totalKeys) : 0}
                            </h2>
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-amber-50">
                            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                        </div>
                    </div>

                </div>
            </section>

            <div className="flex mt-4 sm:mt-6">
                <Translations />
            </div>

        </div>
    );
};

export default Dashboard;
