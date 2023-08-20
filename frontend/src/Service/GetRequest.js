import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GetRequest = async (path) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/${path}`);
    if (response.status === 200) {
      return response.data;
    } else {
      // Display a toast for non-200 response
      toast.error('Server returned an error. Please try again later.');
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error in postData:', error); 
    toast.error('A network or Server error occurred. Please try again later.');
  }
};

export default GetRequest;
