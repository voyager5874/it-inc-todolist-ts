import { axiosInstance } from './config';
import { AuthMeResponseDataType, BaseResponseType, LoginRequestDataType } from './types';

export const authAPI = {
  login(authData: LoginRequestDataType) {
    return axiosInstance.post<BaseResponseType<{ userId?: number }>>(
      'auth/login',
      authData,
    );
  },
  logout() {
    return axiosInstance.delete<BaseResponseType>('auth/login');
  },
  authMe() {
    return axiosInstance.get<BaseResponseType<AuthMeResponseDataType>>('auth/me');
  },
};
