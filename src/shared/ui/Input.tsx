type InputProps = {
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  className = '',
  type = 'text',
  ...rest
}: InputProps) => {
  return (
    <input
      type={type}
      className={`w-full bg-gray-200 px-3 py-2 text-sm outline-none focus:ring focus:ring-gray-100 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...rest}
    />
  );
};
