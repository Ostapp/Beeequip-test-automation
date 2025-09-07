import {
  AvailableCategories,
  AantalCilindersCheckboxes,
  FilterTypes,
  SubcategorieCheckboxes,
  VrachtwagenFilterNames,
  LandbouwmachineFilterNames,
  AanhagwagenFilterNames,
  OpplegerFilterNames,
  InternTransportFilterNames,
} from "./enums";

/*
This is a type that will return the keys of a type that match a value.
E.g. KeysMatchingValue<{ a: 1, b: 2, c: 3 }, 2> will return "b".
*/
export type KeysMatchingValue<M, V> = {
  [K in keyof M]-?: M[K] extends V ? K : never;
}[keyof M];

/*
This is a type that will return the keys of a the range input filter type from CategoryFilterTypeMapping.
E.g. RangeInputKeys<AvailableCategories.VRACHTWAGEN> will return the keys of the VrachtwagenFilterTypeMapping that are of type FilterTypes.RANGEINPUT.
*/
export type RangeInputKeys<C extends keyof CategoryFilterTypeMapping> =
  KeysMatchingValue<CategoryFilterTypeMapping[C], FilterTypes.RANGEINPUT>;

/*
This is a type that will return the keys of a the checkbox filter type from CategoryFilterTypeMapping.
E.g. CheckboxKeys<AvailableCategories.VRACHTWAGEN> will return the keys of the VrachtwagenFilterTypeMapping that are of type FilterTypes.CHECKBOX.
*/
export type CheckboxKeys<C extends keyof CategoryFilterTypeMapping> =
  KeysMatchingValue<CategoryFilterTypeMapping[C], FilterTypes.CHECKBOX>;

/*
This is a type that will return the keys of a the filter type from CategoryFilterTypeMapping.
E.g. DisplayName<AvailableCategories.VRACHTWAGEN> will return the keys of the VrachtwagenFilterTypeMapping that are of type string. 
E.g. "Subcategorie", "Merk", "Model", etc.
*/
export type DisplayName<C extends keyof CategoryFilterTypeMapping> = Extract<
  keyof CategoryFilterTypeMapping[C],
  string
>;

export type FilterNames =
  | VrachtwagenFilterNames
  | LandbouwmachineFilterNames
  | AanhagwagenFilterNames
  | OpplegerFilterNames
  | InternTransportFilterNames;

export type Filter = {
  name: FilterNames;
  type: FilterTypes;
};

export type SupportedCategories = keyof CategoryFilterTypeMapping &
  keyof CategoryCheckboxMappings;

export type CategoryFilterTypeMapping = {
  [AvailableCategories.VRACHTWAGEN]: VrachtwagenFilterTypeMapping;
};

export type CategoryFilterNamesMapping = {
  [AvailableCategories.VRACHTWAGEN]: VrachtwagenFilterNames;
};

export type CategoryCheckboxMappings = {
  [AvailableCategories.VRACHTWAGEN]: VrachtwagenCheckboxMappings;
};

export type VrachtwagenFilterTypeMapping = {
  Subcategorie: FilterTypes.CHECKBOX;
  Merk: FilterTypes.CHECKBOX;
  Model: FilterTypes.CHECKBOX;
  Bouwjaar: FilterTypes.RANGEINPUT;
  Conditie: FilterTypes.CHECKBOX;
  Leaseprijs: FilterTypes.RANGEINPUT;
  Aanschafwaarde: FilterTypes.RANGEINPUT;
  Kilometerstand: FilterTypes.RANGEINPUT;
  Draaiuren: FilterTypes.RANGEINPUT;
  "Eerst registratie": FilterTypes.RANGEINPUT;
  Overig: FilterTypes.CHECKBOX;
  Cabinetype: FilterTypes.CHECKBOX;
  "Lengte hoogte combinatie": FilterTypes.RANGEINPUT;
  "Ledig gewicht": FilterTypes.RANGEINPUT;
  Trekgewicht: FilterTypes.RANGEINPUT;
  Laadfermogen: FilterTypes.RANGEINPUT;
  Totaalgewicht: FilterTypes.RANGEINPUT;
  Brandstof: FilterTypes.CHECKBOX;
  Transmisie: FilterTypes.CHECKBOX;
  Emissieklasse: FilterTypes.CHECKBOX;
  Asconfiguratie: FilterTypes.CHECKBOX;
  "Aantal cilinders": FilterTypes.CHECKBOX;
  "Motorvermogen in kW": FilterTypes.RANGEINPUT;
  "Motorvermogen in pk": FilterTypes.RANGEINPUT;
  Motorinhoud: FilterTypes.RANGEINPUT;
  "Veiligheid em techniek": FilterTypes.CHECKBOX;
  "Interieur en comfort": FilterTypes.CHECKBOX;
};

export type VrachtwagenCheckboxMappings = {
  Subcategorie: SubcategorieCheckboxes;
  "Aantal cilinders": AantalCilindersCheckboxes;
};
