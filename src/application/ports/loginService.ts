import { BaseResponseDTO } from '../../domain/models/BaseResponseDTO';

export interface LoginService {
    doLogin: (
        username: string,
        password: string,
    ) => Promise<{ response: BaseResponseDTO<string> }>;
}