import axiosClient, { authAxiosClient } from './apiClient';

export const getCategories = (langId=1) => {
  return authAxiosClient.get(`/api/Category/GetParentCategoriesByLanguageId?languageid=${langId}`)
}

export const getSubcategories = (catId, langId=1) => {
  return axiosClient.get(`/api/Category/GetSubcategoryByParentId/${catId}/${langId}`)
}
export const getCourses = (subcatId, langId=1) => {
  return authAxiosClient.get(`api/Course/GetByCategory/${subcatId}/${langId}`)
}
