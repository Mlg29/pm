
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable keyword-spacing */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import axios from "axios";


export const getRequest = async (url: string) => {

    const token =  await localStorage.getItem('token')

    var response = await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      if(response?.status === 200 || response?.status === 201){
        return response
      }
}

export const getRequestNoToken = async (url: string) => {

  var response = await axios.get(url)
    if(response?.status === 200 || response?.status === 201){
      return response
    }
}

export const postRequest =  async (url: string, payload?: any) => {
  const token =  await localStorage.getItem('token')

  var res = await axios.post(url, payload, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  if(res?.status === 200 || res?.status === 201){
    return res
  }
  
}

export const postImageRequest =  async (url: string, formData?: any) => {
    try {
      const response = await axios.post(
        url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'accept': 'application/json',
          },
        }
      );
      return response
     
    } catch (error) {
      console.log(`Error uploading file: ${error.message}`);
    }
  
}


export const postRequestNoToken =  async (url: string, payload?: any) => {

    var res = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(res?.status === 200 || res?.status === 201){
      return res
    }
    
  }

export const updateRequest =  async (url: string, payload?: any) => {
  const token =  await localStorage.getItem('token')

  var res = await axios.put(url, payload, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  if(res?.status === 200 || res?.status === 201){
    return res
  }
  
}

export const updateRequestWithNoPayload =  async (url: string) => {
  const token =  await localStorage.getItem('token')

  var res = await axios.patch(url, null,{
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  if(res?.status === 200 || res?.status === 201){
    return res
  }
  
}
export const updateRequestWithPayload =  async (url: string, payload: any) => {
  const token =  await localStorage.getItem('token')

  var res = await axios.patch(url, payload,{
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  if(res?.status === 200 || res?.status === 201){
    return res
  }
  
}
export const deleteRequest = (url: string, payload?: any) => {
  return axios.delete(url, payload)
}

export const deleteRequestNoPayload = async (url: string) => {
  const token =  await localStorage.getItem('token')

  return axios.delete(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}


export const truncate = (info: string, num: number) => {
  return info?.length > num ? info?.substr(0, num - 1) + "..." : info 
}