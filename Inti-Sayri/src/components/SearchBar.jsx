import React from 'react';
import { Autocomplete } from '@react-google-maps/api';

const SearchBar = ({ searchQuery, handleSearchChange, onLoad, onPlaceChanged }) => (
    <div className="search-container my-3">
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar centros de ayuda"
                className="w-full p-2 border rounded"
            />
        </Autocomplete>
    </div>
);

export default SearchBar;
