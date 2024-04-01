import axiosClient from './apiClient';

export const getCourses = (langId=1) => {
  return axiosClient.get(`/api/Course/GetByLanguage/${langId}`)
}

