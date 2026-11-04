export const theme = {
  colors: {
    light: {
      background: '#F4F7FC',
      surface: '#FFFFFF',
      primary: '#4F7CFF',
      primaryDark: '#315BD9',
      primarySoft: '#E9EFFF',
      secondary: '#12213A',
      muted: '#64748B',
      border: '#E2E8F0',
      danger: '#DC4C64',
      dangerSoft: '#FFF0F3',
      warning: '#D98B00',
      warningSoft: '#FFF6DB',
      sun: '#FFC857',
    },
    dark: {
      background: '#0B1220',
      surface: '#152238',
      primary: '#7EA2FF',
      primaryDark: '#4F7CFF',
      primarySoft: '#20345C',
      secondary: '#F3F6FF',
      muted: '#9CAAC2',
      border: '#283A56',
      danger: '#FF7A90',
      dangerSoft: '#3A1F2A',
      warning: '#FFC857',
      warningSoft: '#3B3018',
      sun: '#FFD166',
    },
  },
  spacing: {
    inner: 20,
    section: 60,
    contentBottom: 40,
  },
  fonts: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semiBold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },
} as const;

export function getThemeColors(colorScheme: 'dark' | 'light' | undefined) {
  return colorScheme === 'dark' ? theme.colors.dark : theme.colors.light;
}
