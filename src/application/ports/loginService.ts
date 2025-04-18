import { BaseResponseDTO } from '../../domain/models/BaseResponseDTO';
import { LoginDTO } from '../../domain/models/LoginDTO';

export interface LoginService {
    doLogin: (
        username: string,
        password: string,
    ) => Promise<{ response: BaseResponseDTO<LoginDTO> }>;
}