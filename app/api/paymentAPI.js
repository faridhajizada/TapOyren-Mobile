import axiosClient from './apiClient';

export const initiatePayment = (data) => {
  return axiosClient.post(`/api/Payment/InitiatePayment`, data)
}
