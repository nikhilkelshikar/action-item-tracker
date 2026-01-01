import React, { useState, useEffect } from 'react';

const SummarySection = ({ backendUrl }) => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSummary = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${backendUrl}/action-items/summarize`);
            if (!response.ok) {
                throw new Error('Failed to fetch summary');
            }
            const data = await response.json();
            setSummary(data.summary);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchSummary();
    }, [backendUrl]);

    return (
        <section className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 shadow-sm relative overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full blur-3xl opacity-20"></div>

                    <div className="flex justify-between items-center mb-4 relative z-10">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <span className="text-2xl">✨</span> Gemini Summary
                        </h2>
                        <button
                            onClick={fetchSummary}
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1 rounded-full hover:bg-white/50 transition-colors"
                        >
                            Refresh
                        </button>
                    </div>

                    <div className="relative z-10">
                        {loading ? (
                            <div className="flex items-center gap-2 text-gray-500 animate-pulse">
                                <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                Generating AI summary...
                            </div>
                        ) : error ? (
                            <div className="text-red-500 text-sm">{error}</div>
                        ) : (
                            <div className="prose prose-indigo max-w-none text-gray-700 leading-relaxed bg-white/40 p-4 rounded-xl backdrop-blur-sm">
                                {summary ? summary : "No new items to summarize."}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SummarySection;
