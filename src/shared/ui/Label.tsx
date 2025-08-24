type LabelProps = {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
};

export const Label = ({ htmlFor, className = '', children }: LabelProps) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium ${className}`}>
    {children}
  </label>
);
