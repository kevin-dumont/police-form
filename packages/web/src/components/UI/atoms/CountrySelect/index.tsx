import { Select, SelectProps } from '@chakra-ui/react';
import { countries } from 'countries-list';
import { forwardRef, useMemo } from 'react';

export const CountrySelect = forwardRef<React.LegacyRef<HTMLSelectElement>, SelectProps>((props, ref) => {
  const countriesOptions = useMemo(() => {
    const sortedCountries = Object.entries(countries).sort((a, b) => (a[1].name > b[1].name ? 1 : -1));

    return sortedCountries.map(([countryCode, { native, emoji, name }]) => ({
      value: countryCode,
      label: `${emoji} ${name}${name !== native ? ` (${native})` : ''}`,
    }));
  }, []);

  return (
    <Select ref={ref} {...props} placeholder="Select a country">
      {countriesOptions.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Select>
  );
});

CountrySelect.displayName = 'CountrySelect';
