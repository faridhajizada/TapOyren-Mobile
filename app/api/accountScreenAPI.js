import axiosClient, { authAxiosClient } from './apiClient';


export const signUp = (user) => {
  return authAxiosClient.post(`/api/User/register`, user)
}
export const signIn = async (user) => {
  return authAxiosClient.post(`/api/User/token`, user)
}
export const refresh = async () => {
  return authAxiosClient.post(`/api/User/refresh-token`)
}
export const forgetPassword = async (email) => {
  return axiosClient.post(`/api/User/forgot-password`, email)
}
export const getMyCourses = async (id) => {
  return authAxiosClient.get(`/api/CourseStudent/GetActiveCoursesByStudentId/${id}`)
}

