import React from 'react';
import { Button } from '../../components/ui/button';
import { ButtonProps } from '@/components/ui/button';

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
}

export const LoadingButton = ({
  children,
  isLoading = false,
  loadingText = 'Loading...',
  disabled,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          {loadingText}
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
