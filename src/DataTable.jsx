import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

function DataTable() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, []); // Empty dependency array means this effect runs only once when component mounts

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
    
        try {
            const response = await axios.get(
                "https://api.airtable.com/v0/appXvdgNSlqDP9QwS/Table%201",
                {
                    headers: {
                        Authorization:
                            "Bearer patJrmzFDvT8Qncac.657ccc7a50caaebd1e4a3a390acca8e67d06047dd779d5726b602d4febe8e383",
                    },
                }
            );
            // Filter the data to include only required fields
            const filteredData = response.data.records.map(record => ({
                Flags: record.fields.Flags[0].url,
                Cur: record.fields.Cur,
                Currency: record.fields.Currency,
                Rate: record.fields.Rate
            }));
            console.log(filteredData);
            setData(filteredData);
            
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = () => {
        fetchData(); // Call fetchData function when refresh button is clicked
    };

    return (
        <div className="flex flex-col items-center"> 
            <button onClick={handleRefresh} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Refresh
            </button>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <table className="border-collapse border border-black m-4">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((record, index) => (
                            <tr key={index}>
                                <td>
                                    <img
                                        src={record.Flags}
                                        alt={record.Cur}
                                        className="w-8"
                                    />
                                </td>
                                <td>{record.Currency}</td>
                                <td>{record.Rate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default DataTable;
