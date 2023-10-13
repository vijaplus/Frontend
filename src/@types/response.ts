type SuccessResponse = any
type FailResponse = any

export interface ResponseType{
  status: boolean,
  data?: SuccessResponse,
  errors?: FailResponse
} 
