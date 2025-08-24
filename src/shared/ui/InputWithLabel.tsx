import { Input } from '@/shared/ui/Input';
import { Label } from '@/shared/ui/Label';

type InputWithLabelProps = {
  label: string;
  error?: string;
  id: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputWithLabel = ({
  label,
  id,
  error,
  className = '',
  ...props
}: InputWithLabelProps) => (
  <div className={`flex items-center justify-between ${className}`}>
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} className={`${error && 'border-red-500'}`} {...props} />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);
