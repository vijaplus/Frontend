export interface AuthEmailRequest {
  "user_id": string | number
  "code_otp": string | number
}

export interface ResendOTPRequestUserId{
  "user_id": string | number
}

export interface ForgotPasswordRequest{
  "email":string,
}

export interface LoginRequest{
  "email": string;
  "password": string;
};

export interface RegisterRequest {
  "email": string;
  "phone_number_country": string;
  "phone_number_digit": string;
  "password": string;
  "name": string;
  "company_name": string;
  "company_type": number
  "business_type_id": number;
};

export interface AuthForgotPasswordRequest{
  "user_id": number | string,
  "code_otp": number | string
}

export interface ResetForgotPasswordRequest{
  "user_id": number | string,
  "token": string,
  "password_new": string
}