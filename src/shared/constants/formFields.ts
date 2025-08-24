export const FORM_FIELDS = {
  name: { id: 'name', label: 'Name', type: 'text' },
  age: { id: 'age', label: 'Age', type: 'number' },
  email: { id: 'email', label: 'Email', type: 'email' },
  country: { id: 'country', label: 'Country', type: 'text' },
  password: { id: 'password', label: 'Password', type: 'password' },
  confirmPassword: {
    id: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
  },
} as const;
