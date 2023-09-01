import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function PostRequest(url = '', data = {}) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.status === 200) {
      return response.data;
    } else if(response.status ===403) {
      // for login call , if username or password not found
      toast.error('Username or Password is incorrect.');
    } else {
      // Display a toast for non-200 response
        toast.error('Server returned an error. Please try again later.');
    }

  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error in postData:', error); 
    toast.error('An error occurred. Please try again later.');
  }
}


export default PostRequest;
