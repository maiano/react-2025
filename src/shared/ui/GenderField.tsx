import { Input } from '@/shared/ui/Input';
import { Label } from '@/shared/ui/Label';

type Gender = 'male' | 'female';

type Props = {
  value: string;
  onChange: (value: Gender) => void;
};

export const GenderField = ({ value, onChange }: Props) => (
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
            checked={value === gender}
            onChange={() => onChange(gender as Gender)}
          />
          <Label htmlFor={inputId} className="capitalize cursor-pointer">
            {gender}
          </Label>
        </div>
      );
    })}
  </div>
);
