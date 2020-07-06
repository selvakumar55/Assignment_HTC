import axios from 'axios';

const getData = (type: string) => {
  return axios
    .get(`http://www.omdbapi.com/?type=movie&apikey=5d81e1ce&page=1&s=${type}`)
    .then(response => response.data)
    .catch(error => console.log('DataError', error));
};

export default getData;
