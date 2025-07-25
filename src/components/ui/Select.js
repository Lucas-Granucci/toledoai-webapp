export const Select = ({ label, options, value, onChange, className = '' }) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-slate-700">
                    {label}
                </label>
            )}
            <select
                value={value}
                onChange={onChange}
                className={`w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${className}`}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};