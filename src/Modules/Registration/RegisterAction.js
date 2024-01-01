// apiActions.js
import axios from 'axios';

const adduser = async (data) => {
  const phpPageUrl = 'https://game.capitallooks.com/php/register.php';

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
