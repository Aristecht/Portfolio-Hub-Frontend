export type ProfileAlbum = {
  id: string;
  title: string;
  isPublic: boolean;
  projectsCount: number;
  thumbnailUrl: string;
};

export type ProfileProjectMedia = {
  id: string;
  url: string;
  mediaType: "IMAGE" | "VIDEO";
};

export type ProfileProject = {
  id: string;
  title: string;
  description?: string | null;
  isPublic: boolean;
  tags: string[];
  commentsCount: number;
  thumbnailUrl: string;
  views: number;
  likes: number;
  media: ProfileProjectMedia[];
};

export type ChannelStats = {
  albumsCount: number;
  followersCount: number;
  followingCount: number;
  projectsCount: number;
  totalLikes: number;
  totalViews: number;
};

export type ChannelSocialLink = {
  id: string;
  title: string;
  url: string;
  position: number;
};

export type MyChannel = {
  id: string;
  username: string;
  displayName: string;
  avatar?: string | null;
  bio?: string | null;
  createdAt: string;
  isFollowing: boolean;
  stats: ChannelStats;
  albums: ProfileAlbum[];
  projects: ProfileProject[];
  socialLinks: ChannelSocialLink[];
};

export type MyChannelData = {
  getChannel: MyChannel;
};

export type PopularTagsData = {
  popularTags: Array<{ tag: string; count: number }>;
};

export type MediaFile = {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
  uploading: boolean;
  url?: string;
  error: boolean;
};
