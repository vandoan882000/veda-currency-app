import type { HSBAColor} from '@shopify/polaris';
import { Button, ColorPicker, FormLayout, Popover } from '@shopify/polaris';
import type { FC} from 'react';
import { useCallback, useState } from 'react';
import { Color } from '../Color/Color';

interface CustomColorPickerProp {
  hue: number;
  brightness: number;
  saturation: number;
  onChange: (color: HSBAColor) => void;
}

export const CustomColorPicker: FC<CustomColorPickerProp> = ({ hue, brightness, saturation, onChange }) => {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );


  const activator = (
    <Color hue={hue} brightness={brightness} saturation={saturation} onClick={togglePopoverActive}  />
  );
  console.log(hue, brightness, saturation, 'aaa');
  return (
    <div>
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
        ariaHaspopup={false}
        sectioned
      >
        <FormLayout>
          <ColorPicker onChange={onChange} color={{hue, brightness,saturation}} />
          <Button size="slim" onClick={togglePopoverActive}>Select</Button>
        </FormLayout>
      </Popover>
    </div>
  );
}
