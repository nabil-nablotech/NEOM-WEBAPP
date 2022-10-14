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
