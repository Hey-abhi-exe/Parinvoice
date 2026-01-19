import { forwardRef, type ButtonHTMLAttributes, type ReactNode, type CSSProperties } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  style,
  ...props
}, ref) => {

  const baseStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'inherit',
    fontWeight: 500,
    textDecoration: 'none',
    border: 'none',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    outline: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    opacity: disabled || isLoading ? 0.6 : 1,
    borderRadius: '12px',
    fontSize: '0.95rem',
  };

  const sizeStyles: Record<string, CSSProperties> = {
    sm: {
      height: '32px',
      padding: '0 1rem',
      fontSize: '0.85rem',
    },
    md: {
      height: '40px',
      padding: '0 1.5rem',
      fontSize: '0.95rem',
    },
    lg: {
      height: '48px',
      padding: '0 2rem',
      fontSize: '1.1rem',
    },
    xl: {
      height: '56px',
      padding: '0 2.5rem',
      fontSize: '1.25rem',
    },
  };

  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
      color: 'white',
      boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
    },
    secondary: {
      background: 'white',
      border: '1px solid var(--border-light)',
      color: 'var(--text-primary)',
    },
    outline: {
      background: 'transparent',
      border: '1px solid var(--primary)',
      color: 'var(--primary)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
    },
    danger: {
      background: 'var(--danger)',
      color: 'white',
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  return (
    <button
      ref={ref}
      style={combinedStyles}
      disabled={disabled || isLoading}
      className={`${className} ${isLoading ? 'loading' : ''}`}
      {...props}
    >
      {isLoading && (
        <span style={{ marginRight: '0.5rem', animation: 'spin 1s linear infinite' }}>
          ⏳
        </span>
      )}
      {!isLoading && leftIcon && <span style={{ marginRight: '0.5rem' }}>{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span style={{ marginLeft: '0.5rem' }}>{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;