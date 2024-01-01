import React, { useState, useEffect } from 'react';

const fetchData = () => {
  // Simulate a fetch request delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: 'Fake data from API' });
    }, 2000); // Simulating a 2-second delay
  });
};

const DataLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const result = await fetchData();
        setData(result.data);
      } finally {
        // Set isLoading to false regardless of success or failure
        setIsLoading(false);
      }
    };

    fetchDataFromAPI();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div>
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader-content">
            {/* Loading animation */}
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      )}

      {!isLoading && data && (
        <div>
          {/* Display your content when data is loaded */}
          <h1>Data Loaded Successfully</h1>
          <p>{data}</p>
        </div>
      )}
    </div>
  );
};

export default DataLoader;
