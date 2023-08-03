import axios from 'axios';

const GetRequest = async (path) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/${path}`);
    return response.data; // returns the parsed JSON response
  } catch (error) {
    console.error('Error in getData:', error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export default GetRequest;
