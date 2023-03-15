// 예시
import axios from 'axios';

export async function loginAPI(userID, password) {
    try {
      const res = await axios.post('http://...', {
        params: { userID, password },
      });
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  }