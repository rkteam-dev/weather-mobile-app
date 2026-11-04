import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';

type AppCardVariant = 'default' | 'primary';

type AppCardProps = ViewProps & {
  children: ReactNode;
  className?: string;
  variant?: AppCardVariant;
};

const variantClasses: Record<AppCardVariant, string> = {
  default: 'border border-border bg-surface',
  primary: 'bg-primary',
};

export function AppCard({
  children,
  className = '',
  variant = 'default',
  ...viewProps
}: AppCardProps) {
  return (
    <View
      {...viewProps}
      className={`rounded-card p-inner ${variantClasses[variant]} ${className}`}
    >
      {children}
    </View>
  );
}
