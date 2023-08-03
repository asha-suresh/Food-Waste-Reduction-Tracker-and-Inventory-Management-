import axios from 'axios';

async function PostRequest(url = '', data = {}) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // returns the parsed JSON response
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error in postData:', error);
    throw error; // Rethrow the error to be handled by the calling function
  }
}

export default PostRequest;
