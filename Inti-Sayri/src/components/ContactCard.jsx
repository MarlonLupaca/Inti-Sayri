import React from 'react';

const FavoriteContactCard = ({ name, location, phone }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-6 border-l-4 border-verde">

            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-verde flex items-center justify-center">
                    <i className="fa-solid fa-user text-2xl text-white"></i>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-verde">{name}</h2>
                    <p className="text-sm text-gray-500">{location}</p>
                </div>
            </div>
            
            {phone && (
                <div className="flex items-center gap-2 ml-auto">
                    <i className="fa-solid fa-phone text-verde"></i>
                    <span className="text-gray-600">{phone}</span>
                </div>
            )}
        </div>
    );
};

export default FavoriteContactCard;
