export type PersistableValue = string | number | null
      | PersistableValue[] | { [key: string]: PersistableValue};
export type KeyValues = { [key: string]: PersistableValue };
