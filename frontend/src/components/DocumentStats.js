import React from 'react';
import './DocumentStats.css';

const DocumentStats = ({ title = '', content = '', lastUpdated }) => {
    // Safeguard against undefined/null values
    const wordCount = typeof content === 'string' ? content.trim().split(/\s+/).filter(Boolean).length : 0;
    const charCount = typeof content === 'string' ? content.length : 0;

    const formattedDate = lastUpdated
        ? new Date(lastUpdated).toLocaleString()
        : 'Not Available';

    return (
        <div className="stats-container">
            <h4 className="stats-heading">📊 Document Stats</h4>
            <ul className="stats-list">
                <li><strong>📝 Title:</strong> {title || 'Untitled Document'}</li>
                <li><strong>🔤 Words:</strong> {wordCount}</li>
                <li><strong>✍️ Characters:</strong> {charCount}</li>
                <li><strong>📅 Last Updated:</strong> {formattedDate}</li>
            </ul>
        </div>
    );
};

export default DocumentStats;
