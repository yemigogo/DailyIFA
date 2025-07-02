import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";

interface ResponsiveCardProps {
  className?: string;
  animation?: "smooth" | "fade" | "slide" | "none";
  delay?: number;
  children?: ReactNode;
}

const ResponsiveCard = forwardRef<HTMLDivElement, ResponsiveCardProps>(
  ({ className, animation = "smooth", delay = 0, children }, ref) => {
    const animationClasses = {
      smooth: "card-smooth",
      fade: "reveal-fade",
      slide: "reveal-up",
      none: "",
    };

    return (
      <Card
        ref={ref}
        className={cn(
          "transition-all duration-300 ease-out",
          "border-sacred-gold/10 shadow-lg",
          "backdrop-blur-sm bg-white/95 dark:bg-gray-900/95",
          animationClasses[animation],
          className
        )}
        style={delay > 0 ? { animationDelay: `${delay}s` } : undefined}
      >
        {children}
      </Card>
    );
  }
);

ResponsiveCard.displayName = "ResponsiveCard";

export default ResponsiveCard;