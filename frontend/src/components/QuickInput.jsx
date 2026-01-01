import React, { useState } from 'react';

const QuickInput = ({ onAdd, user }) => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !summary) return;

        setLoading(true);
        try {
            await onAdd({
                title,
                summary,
                created_by_email: user.email,
                created_by_name: user.displayName,
            });
            setTitle('');
            setSummary('');
        } catch (error) {
            console.error("Error adding item:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-8 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                        Quick Add Action Item
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="flex-1 w-full">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="What needs to be done?"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder-gray-400 bg-gray-50 focus:bg-white"
                            />
                        </div>
                        <div className="flex-[2] w-full">
                            <input
                                type="text"
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                placeholder="Add a brief summary or context..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder-gray-400 bg-gray-50 focus:bg-white"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !title || !summary}
                            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                            {loading ? 'Adding...' : 'Add Item'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default QuickInput;
