import { Lock, Mail } from 'lucide-react';
import { useMemo } from 'react';

import { Alert, AlertTitle, AlertDescription } from '~/ui/alert';

interface SignUpFeedbackProps {
  status: boolean;
  title?: string;
  description?: string;
  icon?: string;
  variant?: 'destructive';
}

export function SignUpFeedback({
  status,
  title,
  description,
  icon = 'mail',
  variant,
}: SignUpFeedbackProps) {
  const opacityVariants = {
    hide: 'max-w transition-opacity motion-reduce:transition-none opacity-0',
    show: 'max-w transition-opacity motion-reduce:transition-none opacity-100',
  };

  const Icon = useMemo(() => (icon === 'mail' ? Mail : Lock), [icon]);

  return (
    <Alert
      variant={variant ?? 'default'}
      className={status ? opacityVariants.show : opacityVariants.hide}
    >
      <Icon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
