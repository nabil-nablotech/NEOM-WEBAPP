export type Media = {
  id: string;
  attributes: {
    thumbnailUrl?: string;
    title: string;
    description: string;
    referanceUrl: string;
    fileName: string;
    bearing: string;
    actionType: string;
    featuredImage: boolean;
    updatedAt: Date;
    keywords: string[] | null;
    citation: string;
    latitude: Number;
    longitude: Number;
    imageMetadata: {
      fileSize: Number;
    },
    uniqueId: string
  };
};
