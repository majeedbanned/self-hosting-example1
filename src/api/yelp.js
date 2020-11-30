import axios from 'axios';

// export default axios.create({
//     baseURL:'https://api.yelp.com/v3/businesses/',
//     headers:{
//         Authorization:'Bearer 4BXSRyLbvwxJ4fUP5DvfPLAnLKUVeajX2mnXCinwK6s2vx8_TVxVI1aRgrBYrIH6dmZICY1L4F3bAsbi7rbsaKaCw-_8lMI0NkeOVsDZfW1Fc2WnlWx_oLyYkG14XnYx'
//     }
// });
export default axios.create({
    baseURL:'http://192.168.1.12:8080/pApi.asmx/',
    headers:{
        Authorization:'Bearer 4BXSRyLbvwxJ4fUP5DvfPLAnLKUVeajX2mnXCinwK6s2vx8_TVxVI1aRgrBYrIH6dmZICY1L4F3bAsbi7rbsaKaCw-_8lMI0NkeOVsDZfW1Fc2WnlWx_oLyYkG14XnYx'
    }
});