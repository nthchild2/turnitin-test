export interface Dog {
  id: string;
  imageUrl: string;
  breedLabel: string;
}

export interface DogApiSuccessResponse<TMessage> {
  status: 'success';
  message: TMessage;
}

export interface DogApiErrorResponse {
  status: string;
  message: string;
}

export type DogApiResponse<TMessage> = DogApiSuccessResponse<TMessage> | DogApiErrorResponse;

