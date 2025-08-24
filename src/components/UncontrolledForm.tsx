import { useRef, useState } from 'react';
import { FORM_FIELDS } from '@/shared/constants/formFields';
import { useFormStore } from '@/shared/store/useFormStore';
import { Button } from '@/shared/ui/Button';
import { CheckboxWithLabel } from '@/shared/ui/CheckboxWithLabel';
import { GenderField } from '@/shared/ui/GenderField';
import { InputWithLabel } from '@/shared/ui/InputWithLabel';
import { formSchema, type FormData } from '@/shared/validation/schema';

export const UncontrolledForm = ({ onClose }: { onClose: () => void }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const setUncontrolledForms = useFormStore(
    (state) => state.setUncontrolledForms,
  );

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [gender, setGender] = useState<FormData['gender']>('male');
  const [accept, setAccept] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const form = formRef.current;
    const formData = new FormData(form);

    const data: FormData = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender,
      accept,
      country: formData.get('country') as string,
      image: '',
    };

    const result = formSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const newErrors: typeof errors = {};
      for (const key in fieldErrors) {
        const msg = fieldErrors[key as keyof FormData]?.[0];
        if (msg) newErrors[key as keyof FormData] = msg;
      }
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setUncontrolledForms(result.data);
    onClose();
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-3">
      {Object.entries(FORM_FIELDS).map(([field, { id, label, type }]) => (
        <InputWithLabel
          key={id}
          id={id}
          name={id}
          label={label}
          type={type}
          error={errors[field as keyof FormData]}
        />
      ))}

      <GenderField value={gender} onChange={setGender} />

      <CheckboxWithLabel
        id="accept"
        name="accept"
        label="I accept Terms & Conditions"
        error={errors.accept}
        checked={accept}
        onChange={(e) => setAccept(e.target.checked)}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};
