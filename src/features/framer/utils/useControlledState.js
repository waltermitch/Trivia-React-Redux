import * as React from 'react';

export function useControlledState(value) {
  const [controlledValue, setValue] = React.useState(value);
  React.useEffect(() => {
    setValue(value);
  }, [
    value
  ]);
  return [
    controlledValue,
    setValue
  ];
}
