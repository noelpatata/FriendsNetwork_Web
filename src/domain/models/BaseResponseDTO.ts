export interface BaseResponseDTO<T> {
    success: boolean;
    message?: string;
    content?: T;
}
  