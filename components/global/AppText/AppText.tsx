import type { ReactNode } from 'react';
import { Text, type StyleProp, type TextProps, type TextStyle } from 'react-native';

import { theme } from '../../../constants/theme';

type AppTextVariant = 'body' | 'bodyMedium' | 'caption' | 'heading' | 'hero';

type AppTextProps = TextProps & {
  children: ReactNode;
  className?: string;
  style?: StyleProp<TextStyle>;
  variant?: AppTextVariant;
};

const variantStyles: Record<AppTextVariant, TextStyle> = {
  body: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    lineHeight: 25,
  },
  bodyMedium: {
    fontFamily: theme.fonts.medium,
    fontSize: 16,
    lineHeight: 25,
  },
  caption: {
    fontFamily: theme.fonts.semiBold,
    fontSize: 12,
    letterSpacing: 1.4,
    lineHeight: 18,
  },
  heading: {
    fontFamily: theme.fonts.semiBold,
    fontSize: 24,
    letterSpacing: -0.5,
    lineHeight: 31,
  },
  hero: {
    fontFamily: theme.fonts.bold,
    fontSize: 36,
    letterSpacing: -1.2,
    lineHeight: 43,
  },
};

export function AppText({
  children,
  className,
  style,
  variant = 'body',
  ...textProps
}: AppTextProps) {
  return (
    <Text
      {...textProps}
      className={className}
      style={[variantStyles[variant], style]}
    >
      {children}
    </Text>
  );
}
