import * as React from "react"
import { Chip, ChipProps } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledChip = styled(Chip)<{ badgeVariant?: string }>(({ theme, badgeVariant }) => ({
  ...(badgeVariant === 'destructive' && {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  }),
  ...(badgeVariant === 'secondary' && {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  }),
  ...(badgeVariant === 'outline' && {
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }),
}))

export interface BadgeProps extends Omit<ChipProps, 'variant'> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <StyledChip
      badgeVariant={variant}
      variant={variant === 'outline' ? 'outlined' : 'filled'}
      size="small"
      sx={{
        fontSize: '0.75rem',
        fontWeight: 600,
        ...(className && { className })
      }}
      {...props}
    />
  )
}

export { Badge } 