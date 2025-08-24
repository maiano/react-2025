import { describe, expect, it } from 'vitest';
import { formSchema } from '@/shared/validation/schema';

describe('formSchema', () => {
  it('validates correct data', () => {
    const data = {
      name: 'John',
      age: 25,
      email: 'test@example.com',
      password: 'Qwerty123!',
      confirmPassword: 'Qwerty123!',
      gender: 'male',
      accept: true,
      country: 'Ru',
      image: 'base64',
    };

    const result = formSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('fails when name is not capitalized', () => {
    const data = {
      name: 'john',
      age: 25,
      email: 'test@example.com',
      password: 'Qwerty123!',
      confirmPassword: 'Qwerty123!',
      gender: 'male',
      accept: true,
      country: 'Ru',
    };
    const result = formSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.name).toContainEqual(
      expect.stringContaining('uppercase'),
    );
  });
});
