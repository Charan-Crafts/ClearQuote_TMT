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
        <div className="min-h-screen bg-slate-50 p-6">

            {/* Hero / Header */}
            <header className="mb-6">
                <div className="rounded-2xl overflow-hidden  p-6 shadow">
                    <div className="max-w-7xl mx-auto text-black">
                        <h1 className="text-3xl sm:text-4xl font-extrabold">Translation Dashboard</h1>
                        <p className="mt-1 text-sm sm:text-base opacity-90">Overview of keys, languages and translations </p>
                    </div>
                </div>
            </header>

            {/* Stats Cards */}
            <section className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="p-5 bg-white shadow rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Keys</p>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {loading ? '...' : stats.totalKeys}
                            </h2>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50">
                            <KeyRound className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>

                    <div className="p-5 bg-white shadow rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Languages</p>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {loading ? '...' : stats.languages}
                            </h2>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-50">
                            <Languages className="w-6 h-6 text-green-600" />
                        </div>
                    </div>

                    <div className="p-5 bg-white shadow rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Translations</p>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {loading ? '...' : stats.autoTranslated}
                            </h2>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-50">
                            <Globe className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>

                    <div className="p-5 bg-white shadow rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Avg per Key</p>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {loading ? '...' : stats.totalKeys > 0 ? Math.round(stats.autoTranslated / stats.totalKeys) : 0}
                            </h2>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-amber-50">
                            <Search className="w-6 h-6 text-amber-600" />
                        </div>
                    </div>

                </div>

                {/* Example content area below stats */}
                
            </section>

            <div className="flex  mt-4">

                <Translations/>
            </div>

        </div>
    );
};

export default Dashboard;
