import { Label } from '@/shared/ui/Label';

type CheckboxWithLabelProps = {
  id: string;
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const CheckboxWithLabel = ({
  id,
  label,
  error,
  ...props
}: CheckboxWithLabelProps) => (
  <div className="flex flex-col">
    <div className="flex items-center space-x-2">
      <input type="checkbox" id={id} {...props} />
      <Label htmlFor={id}>{label}</Label>
    </div>
    <div className="min-h-[1.2rem] mt-1">
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  </div>
);
