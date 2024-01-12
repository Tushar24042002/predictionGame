// apiActions.js
import axios from 'axios';

const adduser = async (data) => {
  const phpPageUrl = 'http://localhost:8000/register.php';

  const dataToInsert = new URLSearchParams(data);

  try {
    const response = await axios.post(phpPageUrl, dataToInsert);

    console.log('Data inserted successfully:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
};

export { adduser };
