export type CustomVariableValue = {
  name: string;
  id: string;
  value: VariableValue;
};

export type CollectionData = {
  modes?: string[];
  variables:
    | { [modeName: string]: CustomVariableValue[] }
    | CustomVariableValue[];
  type: string;
};

export type VariablesJson = {
  [key: string]: CollectionData;
};
