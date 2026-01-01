import React, { useState } from 'react';

const ActionItemList = ({ items, onUpdate }) => {
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortBy, setSortBy] = useState('created_time'); // 'created_time' or 'priority'
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const filteredItems = items
        .filter(item => filterStatus === 'All' || item.status === filterStatus)
        .sort((a, b) => {
            if (sortBy === 'created_time') {
                return new Date(b.created_time) - new Date(a.created_time);
            } else if (sortBy === 'priority') {
                const priorityOrder = { 'P0': 3, 'P1': 2, 'P2': 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            return 0;
        });

    const handleEditClick = (item) => {
        setEditingId(item.id);
        setEditForm({ ...item });
    };

    const handleSaveClick = async () => {
        await onUpdate(editingId, editForm);
        setEditingId(null);
    };

    const handleCancelClick = () => {
        setEditingId(null);
    };

    const handleInputChange = (e, field) => {
        setEditForm({ ...editForm, [field]: e.target.value });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'New': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Complete': return 'bg-green-50 text-green-700 border-green-200';
            case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'Discard': return 'bg-gray-50 text-gray-600 border-gray-200';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'P0': return 'text-red-600 bg-red-50 border-red-200';
            case 'P1': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'P2': return 'text-green-600 bg-green-50 border-green-200';
            default: return 'text-gray-600';
        }
    };

    return (
        <section className="py-6 mb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-xl font-bold text-gray-800">Action Items</h2>

                    <div className="flex flex-wrap gap-2">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="All">All Status</option>
                            <option value="New">New</option>
                            <option value="Pending">Pending</option>
                            <option value="Complete">Complete</option>
                            <option value="Discard">Discard</option>
                        </select>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="created_time">Date (Newest)</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>
                </div>

                <div className="grid gap-4">
                    {filteredItems.map(item => (
                        <div key={item.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            {editingId === item.id ? (
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-4">
                                            <input
                                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-lg font-semibold"
                                                value={editForm.title}
                                                onChange={(e) => handleInputChange(e, 'title')}
                                                placeholder="Title"
                                            />
                                            <div className="flex gap-2">
                                                <select
                                                    className="px-3 py-2 border border-gray-200 rounded-lg"
                                                    value={editForm.priority}
                                                    onChange={(e) => handleInputChange(e, 'priority')}
                                                >
                                                    <option value="P0">P0</option>
                                                    <option value="P1">P1</option>
                                                    <option value="P2">P2</option>
                                                </select>
                                                <select
                                                    className="px-3 py-2 border border-gray-200 rounded-lg"
                                                    value={editForm.status}
                                                    onChange={(e) => handleInputChange(e, 'status')}
                                                >
                                                    <option value="New">New</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Complete">Complete</option>
                                                    <option value="Discard">Discard</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <input
                                                className="flex-1 px-3 py-2 border border-blue-100 bg-blue-50/50 rounded-lg text-sm"
                                                value={editForm.assigned_to || ''}
                                                onChange={(e) => handleInputChange(e, 'assigned_to')}
                                                placeholder="Assignee Name"
                                            />
                                            <input
                                                className="flex-1 px-3 py-2 border border-blue-100 bg-blue-50/50 rounded-lg text-sm"
                                                value={editForm.assigned_to_email || ''}
                                                onChange={(e) => handleInputChange(e, 'assigned_to_email')}
                                                placeholder="Assignee Email"
                                            />
                                        </div>
                                    </div>
                                    <textarea
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg min-h-[80px]"
                                        value={editForm.summary}
                                        onChange={(e) => handleInputChange(e, 'summary')}
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={handleCancelClick}
                                            className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSaveClick}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                                                {item.status}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                                                {item.priority}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">{item.summary}</p>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <span className="text-gray-500 font-medium">Assigned to:</span>
                                                {item.assigned_to || item.created_by_name}
                                                {item.assigned_to_email && <span className="text-gray-300">({item.assigned_to_email})</span>}
                                            </span>
                                            <span>•</span>
                                            <span>Created: {new Date(item.created_time).toLocaleString()} by {item.created_by_name}</span>
                                            {item.updated_by && (
                                                <>
                                                    <span>•</span>
                                                    <span>Updated: {new Date(item.updated_time).toLocaleString()} by {item.updated_by}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleEditClick(item)}
                                        className="px-4 py-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg font-medium transition-colors text-sm whitespace-nowrap"
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {filteredItems.length === 0 && (
                        <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            No items found matching your filters.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ActionItemList;
