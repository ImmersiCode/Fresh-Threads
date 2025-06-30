import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
});

export const requestOtp = (phone: string) => API.post('/auth/request-otp', { phone });
export const adminLogin = (phone: string, password: string) =>
  API.post('/auth/admin-login', { phone, password });

export const verifyOtp = (phone: string, otp: string) =>
  API.post('/auth/verify-otp', { phone, otp });
