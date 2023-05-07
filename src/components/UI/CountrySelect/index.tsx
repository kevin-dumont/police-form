import { Space, Select, SelectProps } from "antd";
import { countries } from "countries-list";
import { useMemo } from "react";

const filterOptions: SelectProps["filterOption"] = (input, option) => {
  const key = (option?.value as any) as keyof typeof countries;

  return (
    countries[key].name.toLowerCase().includes(input.toLowerCase()) ||
    countries[key].native.toLowerCase().includes(input.toLowerCase()) ||
    (option?.value as string)?.includes(input.toLowerCase())
  );
};

export type CountrySelectProps = Pick<SelectProps, "value" | "onChange">;

export const CountrySelect = ({ onChange, value }: CountrySelectProps) => {
  const sortedCountries = useMemo(
    () =>
      Object.entries(countries).sort((a, b) => {
        return a[1].name > b[1].name ? 1 : -1;
      }),
    []
  );

  return (
    <Select
      style={{ width: "100%" }}
      placeholder="Nationalité (Nationality)"
      allowClear
      showSearch
      filterOption={filterOptions}
      optionLabelProp="label"
      onChange={onChange}
      value={value}
      size="small"
      bordered={false}
    >
      {sortedCountries.map(([code, data]) => {
        const label = (
          <Space>
            <span role="img" aria-label="China">
              {data.emoji}
            </span>
            {data.name}
            {data.native !== data.name && ` (${data.native})`}
          </Space>
        );

        return (
          <Select.Option value={code} label={label} key={code}>
            {label}
          </Select.Option>
        );
      })}
    </Select>
  );
};
