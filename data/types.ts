export type CaseStudyBullet = {
  label?: string;
  text: string;
};

export type CaseStudySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: CaseStudyBullet[];
};

export type GalleryItem = {
  type: "video" | "image";
  src: string;
  caption?: string;
};

/** One side (VR or Mobile) of a paired-platform comparison gif/screenshot. */
export type PairedGalleryAsset = {
  src?: string;
  caption?: string;
};

/** One page of a VR-vs-Mobile comparison carousel. */
export type PairedGalleryPage = {
  label?: string;
  vr: PairedGalleryAsset;
  mobile: PairedGalleryAsset;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  videoUrl?: string;
  demoUrl?: string;
  date: string;
  type: string;
  linkType: "internal" | "external" | "none";
  externalUrl?: string;
  role?: string;
  timeline?: string;
  tools?: string[];
  heroVideoUrl?: string;
  gallery?: GalleryItem[];
  pairedGallery?: PairedGalleryPage[];
  caseStudy?: CaseStudySection[];
};
