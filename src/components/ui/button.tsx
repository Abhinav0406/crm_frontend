import * as React from "react"
import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material"
import { styled } from "@mui/material/styles"

// Styled button variants
const StyledButton = styled(MuiButton)<{ buttonVariant?: string; buttonSize?: string }>(({ theme, buttonVariant, buttonSize }) => ({
  ...(buttonVariant === 'destructive' && {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  }),
  ...(buttonVariant === 'outline' && {
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }),
  ...(buttonVariant === 'secondary' && {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  }),
  ...(buttonVariant === 'ghost' && {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }),
  ...(buttonVariant === 'link' && {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
    },
  }),
  ...(buttonSize === 'sm' && {
    height: '36px',
    padding: '0 12px',
    fontSize: '0.875rem',
  }),
  ...(buttonSize === 'lg' && {
    height: '44px',
    padding: '0 32px',
    fontSize: '1rem',
  }),
  ...(buttonSize === 'icon' && {
    minWidth: '40px',
    width: '40px',
    height: '40px',
    padding: 0,
  }),
}))

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    // Map our variants to MUI variants
    const muiVariant = variant === 'default' ? 'contained' : 
                      variant === 'outline' ? 'outlined' : 
                      variant === 'ghost' || variant === 'link' ? 'text' : 'contained'
    
    return (
      <StyledButton
        buttonVariant={variant}
        buttonSize={size}
        variant={muiVariant}
        size={size === 'default' ? 'medium' : size === 'sm' ? 'small' : 'large'}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button } 