// apiActions.js
import axios from 'axios';

const insertData = async (colorCode) => {
  const phpPageUrl = 'http://localhost:8000/game.php';

  const dataToInsert = new URLSearchParams({
    colorCode: colorCode,
    userId: 'user123',
    amount: 200,
    gameSerial: '456',
    timeInterval: '10:00 AM - 12:00 PM'
  });

  try {
    const response = await axios.post(phpPageUrl, dataToInsert);

    console.log('Data inserted successfully:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
};

export { insertData };
