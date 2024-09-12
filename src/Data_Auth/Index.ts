import { ILoginInput, IRegisterInput } from "../Interface";

export const REGISTER_FORM: IRegisterInput[] = [
  {
    name: "name",
    placeholder: "Username",
    type: "text",
    validation: {
      required: true,
      minLength: 5,
    },
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
    validation: {
      required: true,
      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    },
  },
  {
    name: "phone",
    placeholder: "Phone",
    type: "phone",
    validation: {
      required: true,
    },
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: true,
      minLength: 6,
    },
  },
  {
    name: "passwordConfirm",
    placeholder: "passwordConfirm",
    type: "password",
    validation: {
      required: true,
      minLength: 6,
    },
  },
  
];

export const LOGIN_FORM: ILoginInput[] = [
  {
    name: "email",
    placeholder: "Enter Your Email",
    type: "email",
    validation: {
      required: true,
      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    },
  },
  {
    name: "password",
    placeholder: "Enter Your Password",
    type: "password",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];