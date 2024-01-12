// apiActions.js
import axios from 'axios';

const loginUser = async (data) => {
  const phpPageUrl = 'http://localhost:8000/login.php';

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

export { loginUser };
