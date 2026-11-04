import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { getThemeColors } from '../../../constants/theme';
import { AppText } from '../AppText/AppText';

type NoticeVariant = 'error' | 'info' | 'warning';

type AppNoticeModalProps = {
  description: string;
  onClose: () => void;
  title: string;
  variant?: NoticeVariant;
  visible: boolean;
};

type IoniconName = ComponentProps<typeof Ionicons>['name'];

const iconByVariant: Record<NoticeVariant, IoniconName> = {
  error: 'close-circle',
  info: 'information-circle',
  warning: 'warning',
};

export function AppNoticeModal({
  description,
  onClose,
  title,
  variant = 'info',
  visible,
}: AppNoticeModalProps) {
  const { colorScheme } = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const accentColor =
    variant === 'error'
      ? colors.danger
      : variant === 'warning'
        ? colors.warning
        : colors.primary;
  const iconBackgroundClass =
    variant === 'error'
      ? 'bg-danger-soft dark:bg-dark-danger-soft'
      : variant === 'warning'
        ? 'bg-warning-soft dark:bg-dark-warning-soft'
        : 'bg-primary-soft dark:bg-dark-primary-soft';

  return (
    <Modal
      animationType='fade'
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <View className='flex-1 items-center justify-center bg-black/55 px-inner'>
        <View className='w-full max-w-[420px] gap-5 rounded-card border border-border bg-surface p-inner dark:border-dark-border dark:bg-dark-surface'>
          <View
            className={`h-14 w-14 items-center justify-center rounded-control ${iconBackgroundClass}`}
          >
            <Ionicons color={accentColor} name={iconByVariant[variant]} size={28} />
          </View>

          <View className='gap-2'>
            <AppText
              className='text-secondary dark:text-dark-secondary'
              variant='heading'
            >
              {title}
            </AppText>
            <AppText className='text-muted dark:text-dark-muted'>
              {description}
            </AppText>
          </View>

          <Pressable
            accessibilityRole='button'
            className='min-h-12 items-center justify-center rounded-control bg-primary px-inner dark:bg-dark-primary-dark'
            onPress={onClose}
          >
            <AppText className='text-white' variant='bodyMedium'>
              Rendben
            </AppText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
