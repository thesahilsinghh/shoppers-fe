import { gql } from '@apollo/client';

export const Login_M = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      message
      token
      user {
        _id
        email
        first_name
        last_name
        role
        isVerified
        address
        createdAt
        updatedAt
      }
    }
  }
`;

export const Register_M = gql`
  mutation Register($createUserInput: CreateUserInput!) {
    register(createUserInput: $createUserInput)
  }
`;

export const VerifyOtp_M = gql`
  mutation VerifyOtp($verifyOtpInput: VerifyOtpInput!) {
    verifyOtp(verifyOtpInput: $verifyOtpInput) {
      message
      user {
        _id
        email
        first_name
        last_name
        isVerified
      }
    }
  }
`;

export const UpdateUser = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(updateuserinput: $input) {
      _id
      first_name
      last_name
      email
      isVerified
      createdAt
      updatedAt
    }
  }
`;

export const Logout_M = gql`
  mutation Logout {
    logout
  }
`;

export const ResendOtp_M = gql`
  mutation ResendOtp($resendOtpInput: ResendOtpInput!) {
    resendOtp(resendOtpInput: $resendOtpInput)
  }
`;