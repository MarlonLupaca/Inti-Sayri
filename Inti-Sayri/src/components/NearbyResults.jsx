import React from 'react';
import ResultItem from './ResultItem';

const NearbyResults = ({ results, favorites, toggleFavorite }) => (
    <div className="results-container py-2 w-full">
        {results.map((result) => (
            <ResultItem
                key={result.id}
                result={result}
                isFavorite={favorites.includes(result.id)}
                toggleFavorite={toggleFavorite}
            />
        ))}
    </div>
);

export default NearbyResults;
