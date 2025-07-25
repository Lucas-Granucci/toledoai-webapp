export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    onClick,
    className = '',
    ...props
}) => {
    const baseClasses = 'font-medium rounded-xl transition-colors cursor-pointer flex items-center justify-center';

    const variants = {
        primary: 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-md hover:shadow-lg',
        secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-800',
        ghost: 'bg-white/60 hover:bg-white border border-slate-200 text-slate-700',
        icon: 'p-2 hover:bg-slate-100 rounded-lg'
    };

    const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
        icon: 'p-3'
    }

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`;

    return (
        <button 
            className={classes}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};