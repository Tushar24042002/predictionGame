// apiActions.js
import axios from 'axios';

const insertData = async (totalMoney,userId, colorCode, currentTimestamp) => {
  const phpPageUrl = 'https://game.capitallooks.com/php/game.php';

  const dataToInsert = new URLSearchParams({
    colorCode: colorCode,
    userId: userId,
    amount: totalMoney,
    gameSerial : `${userId}_${currentTimestamp}`,
    timeInterval: currentTimestamp
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
