import axios from 'axios';

const useAxios = () => {
  const get = (url) => axios.get(url);
  const post = (url, data) => axios.post(url, data);
  const patch = (url, data) => axios.patch(url, data);
  const delete_ = (url) => axios.delete(url);
  
  return { get, post, patch, delete: delete_ };
};

export default useAxios;
