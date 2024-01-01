// apiActions.js
import axios from 'axios';

const userInfo = async (id) => {
  const phpPageUrl = `https://game.capitallooks.com/php/userInfo.php`;
  try {
    const response = await axios.get(phpPageUrl);
    console.log(response)
    console.log('Data inserted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
};

export { userInfo };
