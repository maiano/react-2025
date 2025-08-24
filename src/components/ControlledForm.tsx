import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FORM_FIELDS } from '@/shared/constants/formFields';
import { useFormStore } from '@/shared/store/useFormStore';
import { Button } from '@/shared/ui/Button';
import { CheckboxWithLabel } from '@/shared/ui/CheckboxWithLabel';
import { Input } from '@/shared/ui/Input';
import { InputWithLabel } from '@/shared/ui/InputWithLabel';
import { Label } from '@/shared/ui/Label';
import { formSchema, type FormData } from '@/shared/validation/schema';

export const ControlledForm = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const setControlledForms = useFormStore((state) => state.setControlledForms);

  const onSubmit = (data: FormData) => {
    setControlledForms(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {Object.entries(FORM_FIELDS).map(([field, { id, label, type }]) => (
        <InputWithLabel
          key={id}
          label={label}
          id={id}
          type={type}
          error={errors[field as keyof FormData]?.message}
          {...register(
            field as keyof FormData,
            field === 'age' ? { valueAsNumber: true } : {},
          )}
        />
      ))}
      <div className="flex space-x-4 mb-4">
        <Label>Gender</Label>
        {['male', 'female'].map((gender) => {
          const inputId = `gender-${gender}`;
          return (
            <div key={gender} className="flex items-center space-x-2">
              <Input
                type="radio"
                id={inputId}
                value={gender}
                {...register('gender')}
              />
              <Label htmlFor={inputId} className="capitalize cursor-pointer">
                {gender}
              </Label>
            </div>
          );
        })}
      </div>
      <CheckboxWithLabel
        id="accept"
        label="I accept Terms & Conditions"
        error={errors.accept?.message}
        {...register('accept')}
      />
      <Button type="submit" disabled={!isValid}>
        Submit
      </Button>
    </form>
  );
};
