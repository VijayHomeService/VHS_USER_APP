import axios from 'axios';
import {ApiUrl} from './ApiUrl';

async function getData(url, params) {
  try {
    const response = await axios.get(ApiUrl.BASEURL + url, {params});
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function postData(url, data) {
  try {
    const response = await axios.post(ApiUrl.BASEURL + url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function postFormData(url, formData) {
  try {
    const response = await axios.post(ApiUrl.BASEURL + url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function deleteData(url) {
  try {
    const response = await axios.post(ApiUrl.BASEURL + url);
    return response;
  } catch (error) {
    throw error;
  }
}

async function putData(url, data) {
  try {
    const response = await axios.put(ApiUrl.BASEURL + url, data);
    return response;
  } catch (error) {
    throw error;
  }
}

async function putFormData(url, formData) {
  try {
    const response = await axios.put(ApiUrl.BASEURL + url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function getAllCity(url, params) {
  try {
    let res = await axios.get(ApiUrl.SERVERURL + url);

    if (res.status === 200) {
      return res;
    } else {
      throw new Error(`Request failed with status: ${res.status}`);
    }
  } catch (error) {
    throw error;
  }
}

async function getAllCategory(url, params) {
  try {
    let res = await axios.get(ApiUrl.BASEURL + url);

    if (res.status === 200) {
      return res;
    } else {
      throw new Error(`Request failed with status: ${res.status}`);
    }
  } catch (error) {
    throw error;
  }
}

export {
  getData,
  postData,
  postFormData,
  deleteData,
  putData,
  putFormData,
  getAllCity,
  getAllCategory,
};
