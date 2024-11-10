import React from 'react';

const FormularioAlerta = ({ nuevaAlerta, handleChange, handleSubmit }) => (
    <form onSubmit={handleSubmit} className="bg-white p-4 w-[420px] rounded-lg shadow">
        <div>
            <label className="block text-gray-700">Mensaje de Alerta</label>
            <input
                type="text"
                name="mensaje"
                value={nuevaAlerta.mensaje}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                required
            />
        </div>
        <div className="mb-3">
            <label className="block text-gray-700">Prioridad</label>
            <select
                name="prioridad"
                value={nuevaAlerta.prioridad}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
            >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
            </select>
        </div>
        <div className="mb-3">
            <label className="block text-gray-700">Zona</label>
            <select
                name="zona"
                value={nuevaAlerta.zona}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
            >
                <option value="Centro Histórico">Centro Histórico</option>
                <option value="Barrio Residencial Norte">Barrio Residencial Norte</option>
                <option value="Zona Industrial">Zona Industrial</option>
            </select>
        </div>
        <button type="submit" className="w-full bg-azulMedio text-white p-2 rounded mt-4">Agregar Alerta</button>
    </form>
);

export default FormularioAlerta;
