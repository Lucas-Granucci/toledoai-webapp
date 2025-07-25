export const Input = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    className = '',
    ...props
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-slate-700">
                    {label}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${className}`}
                {...props}
            />
        </div>
    );
};