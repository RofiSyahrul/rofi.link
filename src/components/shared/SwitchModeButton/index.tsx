import { MoonIcon, SunIcon } from '@/components/icons';
import { useColorMode, useColorModeValue } from '@/context/color-mode';

import Button from '../Button';
import VisuallyHidden from '../VisuallyHidden';

const light = {
  Icon: MoonIcon,
  description: 'Gunakan mode gelap'
};

const dark = {
  Icon: SunIcon,
  description: 'Gunakan mode terang'
};

export default function SwitchModeButton() {
  const { toggleColorMode } = useColorMode();
  const { Icon, description } = useColorModeValue(light, dark);

  return (
    <Button variant='secondary' title={description} onClick={toggleColorMode}>
      <Icon variant='secondary' />
      <VisuallyHidden>
        {description}
      </VisuallyHidden>
    </Button>
  );
}
