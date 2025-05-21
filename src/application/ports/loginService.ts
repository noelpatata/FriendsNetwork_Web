import { BaseResponseDTO } from '../../domain/models/BaseResponseDTO';
import { LoginViewModel } from '../../domain/models/Login/LoginViewModel';

export interface LoginService {
    doLogin: (
        username: string,
        password: string,
    ) => Promise<BaseResponseDTO<LoginViewModel>>;
}