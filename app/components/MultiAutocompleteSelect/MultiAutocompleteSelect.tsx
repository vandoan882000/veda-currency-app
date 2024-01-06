import {LegacyStack, Tag, Autocomplete} from '@shopify/polaris';
import type { FC} from 'react';
import {useState, useCallback, useMemo} from 'react';
import { moneyFormats } from '~/utils/moneyFormats';

interface MultiAutocompleteSelectProp {
  selectedOptions: string[];
  onChange: (value: string[]) => void;
}

export const MultiAutocompleteSelect: FC<MultiAutocompleteSelectProp> = ({ selectedOptions, onChange }) => {
  const CURRENCIES_OPTIONS: Array<{ label: string; value: string }> = Object.entries(moneyFormats).reduce(
    (acc, [key, value]) => {
      acc.push({ label: value.money_name, value: key });
      return acc;
    },
    [] as any,
  );
  const deselectedOptions = useMemo(
    () => CURRENCIES_OPTIONS,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );

      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const removeTag = useCallback(
    (tag: string) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      onChange(options);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedOptions],
  );

  const verticalContentMarkup =
    selectedOptions.length > 0 ? (
      <LegacyStack spacing="extraTight" alignment="center">
        {selectedOptions.map((option) => {
          let tagLabel = '';
          tagLabel = option.replace('_', ' ');
          tagLabel = titleCase(tagLabel);
          return (
            <Tag key={`option${option}`} onRemove={removeTag(option)}>
              {tagLabel}
            </Tag>
          );
        })}
      </LegacyStack>
    ) : null;

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Pick currencies that your customers will want"
      value={inputValue}
      placeholder="Pick currencies"
      verticalContent={verticalContentMarkup}
      autoComplete="off"
    />
  );

  return (
    <div>
      <Autocomplete
        allowMultiple
        options={options}
        selected={selectedOptions}
        textField={textField}
        onSelect={onChange}
        listTitle="Suggested Tags"
      />
    </div>
  );

  function titleCase(string: string) {
    return string
      .toLowerCase()
      .split(' ')
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join('');
  }
}
