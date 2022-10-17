export type Place = {
  id: string;
  attributes: {
    thumbnailUrl?: string;
    placeNameEnglish: string;
    placeNameArabic: string;
    siteDescription: string;
    updatedAt: string;
    keywords: string[] | null;
    placeNumber: string | null;
    latitude: Number;
    longitude: Number;
    uniqueId: string;
    period: string;
    researchValue: FieldOptions
    tourismValue: FieldOptions
    stateOfConservation: FieldOptions
    recommendations: FieldOptions
    risk: FieldOptions
  };
};

export type Meta = {
  pagination: {
    total: number;
    pageCount: number;
    pageSize: number;
    page: number;
  };
};

export type Languages = {
  data: {
    attributes: {
      name: string;
    };
  };
};
export type Locale = {
  value: string;
  languages: Languages;
};
export type Translation = {
  data: {
    id: string;
    attributes: {
      code: string;
      locale: Locale[];
    };
  };
};
export type FieldOption = {
  id: string;
  attributes: {
    name: string;
    translation: Translation;
  };
};
export type FieldOptions = {
  data: FieldOption[] | []
}
