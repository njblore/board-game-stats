import Axios from 'axios';

export const fetchData = async (pword, location) => {
  const result = await Axios(`https://api.jsonbin.io/b/${location}/latest`, {
    headers: {
      'secret-key': pword,
    },
  });
  return result.data;
};
