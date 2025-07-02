import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ResponsiveButtonProps extends ButtonProps {
  touchFriendly?: boolean;
  animation?: boolean;
}

const ResponsiveButton = forwardRef<HTMLButtonElement, ResponsiveButtonProps>(
  ({ className, touchFriendly = true, animation = true, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          // Base responsive styles
          "text-responsive-base font-medium",
          // Touch-friendly sizing
          touchFriendly && "btn-touch",
          // Smooth animations
          animation && "nav-transition",
          // Enhanced shadows and states
          "shadow-sm hover:shadow-md active:shadow-lg",
          "rounded-xl",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

ResponsiveButton.displayName = "ResponsiveButton";

export default ResponsiveButton;