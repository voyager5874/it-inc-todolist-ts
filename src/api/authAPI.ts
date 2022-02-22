import { axiosInstance } from './config';
import { BaseResponseType, LoginDataType } from './types';

export const authAPI = {
  login(authData: LoginDataType) {
    return axiosInstance.post<BaseResponseType<{ userId?: number }>>(
      'auth/login',
      authData,
    );
  },
  authMe() {
    return axiosInstance.get<BaseResponseType>('auth/me');
  },
};
