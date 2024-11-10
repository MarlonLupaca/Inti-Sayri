import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const FavoritesButton = ({ isFavorite, toggleFavorite }) => (
    <button onClick={toggleFavorite} className="favorite-btn text-yellow-500 text-2xl">
        {isFavorite ? <FaStar /> : <FaRegStar />}
    </button>
);

export default FavoritesButton;
