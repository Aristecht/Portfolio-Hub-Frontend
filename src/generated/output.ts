import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type AlbumMetaModel = {
  __typename?: 'AlbumMetaModel';
  limit: Scalars['Float']['output'];
  page: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type AlbumModel = {
  __typename?: 'AlbumModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isPublic: Scalars['Boolean']['output'];
  projectCount?: Maybe<Scalars['Int']['output']>;
  projects?: Maybe<Array<AlbumProjectModel>>;
  thumbnailUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<AlbumUserModel>;
};

export type AlbumPreviewModel = {
  __typename?: 'AlbumPreviewModel';
  id: Scalars['String']['output'];
  isPublic: Scalars['Boolean']['output'];
  projectsCount: Scalars['Int']['output'];
  thumbnailUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type AlbumProjectMediaModel = {
  __typename?: 'AlbumProjectMediaModel';
  id: Scalars['ID']['output'];
  mediaType: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type AlbumProjectModel = {
  __typename?: 'AlbumProjectModel';
  commentsCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isPublic: Scalars['Boolean']['output'];
  likes: Scalars['Int']['output'];
  media: Array<AlbumProjectMediaModel>;
  tags: Array<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type AlbumUserModel = {
  __typename?: 'AlbumUserModel';
  avatar?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type AlbumUserModell = {
  __typename?: 'AlbumUserModell';
  avatar?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  followers: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isFollowing?: Maybe<Scalars['Boolean']['output']>;
  username: Scalars['String']['output'];
};

export type ApprovePayoutResponseModel = {
  __typename?: 'ApprovePayoutResponseModel';
  amount: Scalars['Int']['output'];
  payoutId: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type AuthModel = {
  __typename?: 'AuthModel';
  message?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserModel>;
};

export type BalanceModel = {
  __typename?: 'BalanceModel';
  availableBalance: Scalars['Int']['output'];
  totalPaidOut: Scalars['Int']['output'];
  totalReceived: Scalars['Int']['output'];
};

export type ChangeEmailInput = {
  email: Scalars['String']['input'];
};

export type ChangeNotificationsSettingsInput = {
  pushNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  siteNotifications?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword?: InputMaybe<Scalars['String']['input']>;
};

export type ChangeProfileInput = {
  bio: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type ChannelModel = {
  __typename?: 'ChannelModel';
  albums: Array<AlbumPreviewModel>;
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isFollowing: Scalars['Boolean']['output'];
  projects: Array<ProjectPreviewModel>;
  socialLinks: Array<ChannelSocialLinkModel>;
  stats: ChannelStatsModel;
  username: Scalars['String']['output'];
};

export type ChannelSocialLinkModel = {
  __typename?: 'ChannelSocialLinkModel';
  id: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ChannelStatsModel = {
  __typename?: 'ChannelStatsModel';
  albumsCount: Scalars['Int']['output'];
  followersCount: Scalars['Int']['output'];
  followingCount: Scalars['Int']['output'];
  projectsCount: Scalars['Int']['output'];
  totalLikes: Scalars['Int']['output'];
  totalViews: Scalars['Int']['output'];
};

export type ChatMemberModel = {
  __typename?: 'ChatMemberModel';
  user: UserChatInfoModel;
};

export type ChatMessagesMetaModel = {
  __typename?: 'ChatMessagesMetaModel';
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type ChatMessagesResponseModel = {
  __typename?: 'ChatMessagesResponseModel';
  data: Array<MessageModel>;
  meta: ChatMessagesMetaModel;
};

export type ChatModel = {
  __typename?: 'ChatModel';
  id: Scalars['String']['output'];
  lastMessage?: Maybe<MessageModel>;
  members: Array<UserChatInfoModel>;
  unreadCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CommentMetaModel = {
  __typename?: 'CommentMetaModel';
  limit: Scalars['Float']['output'];
  page: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type CommentModel = {
  __typename?: 'CommentModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  projectId: Scalars['String']['output'];
  replies?: Maybe<Array<CommentModel>>;
  repliesCount: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserInfoCommentModel;
  userId: Scalars['String']['output'];
};

export type CommnetCountModel = {
  __typename?: 'CommnetCountModel';
  count: Scalars['String']['output'];
};

export type CreateAlbumInput = {
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateCommentInput = {
  parentId?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type CreateDonationTierInput = {
  amount: Scalars['Float']['input'];
  benefits?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreatePaymentInput = {
  isAnonymous?: InputMaybe<Scalars['Boolean']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  paymentMethod: PaymentMethod;
  tierId: Scalars['String']['input'];
};

export type CreatePaymentResponseModel = {
  __typename?: 'CreatePaymentResponseModel';
  amount: Scalars['Int']['output'];
  expiresAt: Scalars['String']['output'];
  method: PaymentMethod;
  paymentId: Scalars['String']['output'];
  paymentUrl: Scalars['String']['output'];
  qrCode?: Maybe<Scalars['String']['output']>;
  webUrl?: Maybe<Scalars['String']['output']>;
};

export type CreateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  projectId: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateTagInput = {
  projectId: Scalars['String']['input'];
  tag: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DeactivateAccountInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  pin?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceModel = {
  __typename?: 'DeviceModel';
  browser: Scalars['String']['output'];
  os: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type DevicesModel = {
  __typename?: 'DevicesModel';
  createdAt: Scalars['DateTime']['output'];
  deviceName: Scalars['String']['output'];
  deviceType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastUsedAt: Scalars['DateTime']['output'];
  token: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type DonationMetaModel = {
  __typename?: 'DonationMetaModel';
  limit: Scalars['Float']['output'];
  page: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type DonationStatsModel = {
  __typename?: 'DonationStatsModel';
  donationsGivenCount: Scalars['Int']['output'];
  donationsReceivedCount: Scalars['Int']['output'];
  totalGiven: Scalars['Int']['output'];
  totalReceived: Scalars['Int']['output'];
  uniqueDonorsCount: Scalars['Int']['output'];
};

export type DonationTierModel = {
  __typename?: 'DonationTierModel';
  amount: Scalars['Int']['output'];
  authorId: Scalars['String']['output'];
  benefits: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  position: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EarnOnFeeModel = {
  __typename?: 'EarnOnFeeModel';
  totalPlatformFee: Scalars['Int']['output'];
  totalReceived: Scalars['Int']['output'];
};

export type EditMessageInput = {
  messageId: Scalars['String']['input'];
  newText: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type EnableTotpInput = {
  pin: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type FilterAlbumInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  publicOnly?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type FilterAlbumModel = {
  __typename?: 'FilterAlbumModel';
  data: Array<AlbumModel>;
  meta: AlbumMetaModel;
};

export type FilterCommentInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['String']['input'];
};

export type FilterCommentModel = {
  __typename?: 'FilterCommentModel';
  data: Array<CommentModel>;
  meta: CommentMetaModel;
};

export type FilterProjectInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  publicOnly?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type FilterProjectModel = {
  __typename?: 'FilterProjectModel';
  data: Array<ProjectModel>;
  meta: ProjectMetaModel;
};

export type FindFollowers = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  username: Scalars['String']['input'];
};

export type FindFollowings = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  username: Scalars['String']['input'];
};

export type FollowModel = {
  __typename?: 'FollowModel';
  createdAt: Scalars['DateTime']['output'];
  follower?: Maybe<UserModel>;
  followerId?: Maybe<Scalars['String']['output']>;
  following?: Maybe<UserModel>;
  followingId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FullModelProject = {
  __typename?: 'FullModelProject';
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  user: AlbumUserModell;
};

export type GetOrCreateChatModel = {
  __typename?: 'GetOrCreateChatModel';
  chatMembers: Array<ChatMemberModel>;
  id: Scalars['String']['output'];
  messages: Array<MessageModel>;
};

export type GetRepliesInput = {
  commentId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type HistoryPaymentInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type LocationModel = {
  __typename?: 'LocationModel';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longtitude: Scalars['Float']['output'];
};

export type LoginInput = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
  pin?: InputMaybe<Scalars['String']['input']>;
};

export type MediaModel = {
  __typename?: 'MediaModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  mediaType: MediaType;
  projectId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export enum MediaType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type MessageModel = {
  __typename?: 'MessageModel';
  chatId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  isEdited: Scalars['Boolean']['output'];
  isRead: Scalars['Boolean']['output'];
  sender: UserChatInfoModel;
  senderId: Scalars['String']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTag: Scalars['Boolean']['output'];
  approvePayout: ApprovePayoutResponseModel;
  changeEmail: Scalars['Boolean']['output'];
  changeNotificationSettings: ChangeNotificationSettingsModel;
  changePassword: Scalars['Boolean']['output'];
  changeProfileInfo: Scalars['Boolean']['output'];
  clearSessionCookie: Scalars['Boolean']['output'];
  createAlbum: AlbumModel;
  createComment: CommentModel;
  createDonationTier: DonationTierModel;
  createDraftProject: Scalars['String']['output'];
  createPayment: CreatePaymentResponseModel;
  createProject: ProjectModel;
  createRefund: RefundResponseModel;
  createSocialLink: Scalars['Boolean']['output'];
  createUser: UserModel;
  deactivateAccount: AuthModel;
  deleteDonationTier: Scalars['Boolean']['output'];
  deleteDraftProject: Scalars['Boolean']['output'];
  deleteMessage: Scalars['Boolean']['output'];
  deleteProject: Scalars['Boolean']['output'];
  disableTotp: Scalars['Boolean']['output'];
  editMessage: MessageModel;
  enableTotp: Scalars['Boolean']['output'];
  followUser: Scalars['Boolean']['output'];
  getOrCreateChat: GetOrCreateChatModel;
  incrementProjectView: Scalars['Int']['output'];
  loginUser: AuthModel;
  logoutUser: Scalars['Boolean']['output'];
  markAllNotificationAsRead: Scalars['Boolean']['output'];
  markNotificationAsRead: Scalars['Boolean']['output'];
  newEmail: Scalars['Boolean']['output'];
  newPassword: Scalars['Boolean']['output'];
  registerDeviceToken: Scalars['Boolean']['output'];
  rejectPayout: Scalars['Boolean']['output'];
  removeAlbum: Scalars['Boolean']['output'];
  removeComment: Scalars['Boolean']['output'];
  removeDeviceToken: Scalars['Boolean']['output'];
  removePayoutMethod: Scalars['Boolean']['output'];
  removeSession: Scalars['Boolean']['output'];
  removeSocialLink: Scalars['Boolean']['output'];
  removeTag: Scalars['Boolean']['output'];
  reorderSocialLinks: Scalars['Boolean']['output'];
  requestPayout: RequestPayoutResponseModel;
  resetPassword: Scalars['Boolean']['output'];
  setProjectLike: ProjectModel;
  setupPayoutMethod: SetupPayoutResponseModel;
  startProcessingPayout: ProcessPayoutResponseModel;
  toggleLike: ProjectModel;
  unfollowUser: Scalars['Boolean']['output'];
  updateAlbum: AlbumModel;
  updateComment: CommentModel;
  updateDonationTier: DonationTierModel;
  updatePayoutMethod: SetupPayoutResponseModel;
  updateProject: ProjectModel;
  updateSocialLink: Scalars['Boolean']['output'];
  verifyAccount: UserModel;
};


export type MutationAddTagArgs = {
  data: CreateTagInput;
};


export type MutationApprovePayoutArgs = {
  payoutId: Scalars['String']['input'];
  transactionId: Scalars['String']['input'];
};


export type MutationChangeEmailArgs = {
  data: ChangeEmailInput;
};


export type MutationChangeNotificationSettingsArgs = {
  data: ChangeNotificationsSettingsInput;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationChangeProfileInfoArgs = {
  data: ChangeProfileInput;
};


export type MutationCreateAlbumArgs = {
  data: CreateAlbumInput;
};


export type MutationCreateCommentArgs = {
  data: CreateCommentInput;
};


export type MutationCreateDonationTierArgs = {
  data: CreateDonationTierInput;
};


export type MutationCreateDraftProjectArgs = {
  albumId: Scalars['String']['input'];
};


export type MutationCreatePaymentArgs = {
  data: CreatePaymentInput;
};


export type MutationCreateProjectArgs = {
  data: CreateProjectInput;
};


export type MutationCreateRefundArgs = {
  data: RefundPaymentInput;
};


export type MutationCreateSocialLinkArgs = {
  data: SocialLinkInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeactivateAccountArgs = {
  data: DeactivateAccountInput;
};


export type MutationDeleteDonationTierArgs = {
  tierId: Scalars['String']['input'];
};


export type MutationDeleteDraftProjectArgs = {
  projectId: Scalars['String']['input'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['String']['input'];
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['String']['input'];
};


export type MutationEditMessageArgs = {
  data: EditMessageInput;
};


export type MutationEnableTotpArgs = {
  data: EnableTotpInput;
};


export type MutationFollowUserArgs = {
  channelId: Scalars['String']['input'];
};


export type MutationGetOrCreateChatArgs = {
  userId: Scalars['String']['input'];
};


export type MutationIncrementProjectViewArgs = {
  projectId: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  data: LoginInput;
};


export type MutationMarkNotificationAsReadArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type MutationNewEmailArgs = {
  data: NewEmailInput;
};


export type MutationNewPasswordArgs = {
  data: NewPasswordInput;
};


export type MutationRegisterDeviceTokenArgs = {
  data: RegisterDeviceTokenInput;
};


export type MutationRejectPayoutArgs = {
  payoutId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};


export type MutationRemoveAlbumArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveCommentArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveDeviceTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationRemoveSessionArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveSocialLinkArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveTagArgs = {
  data: RemoveTagInput;
};


export type MutationReorderSocialLinksArgs = {
  list: Array<SocialLinkOrderInput>;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationSetProjectLikeArgs = {
  like: Scalars['Boolean']['input'];
  projectId: Scalars['String']['input'];
};


export type MutationSetupPayoutMethodArgs = {
  data: SetupPayoutInput;
};


export type MutationStartProcessingPayoutArgs = {
  payoutId: Scalars['String']['input'];
};


export type MutationToggleLikeArgs = {
  projectId: Scalars['String']['input'];
};


export type MutationUnfollowUserArgs = {
  channelId: Scalars['String']['input'];
};


export type MutationUpdateAlbumArgs = {
  data: UpdateAlbumInput;
};


export type MutationUpdateCommentArgs = {
  data: UpdateCommentInput;
};


export type MutationUpdateDonationTierArgs = {
  data: UpdateDonationTierInput;
};


export type MutationUpdatePayoutMethodArgs = {
  data: SetupPayoutInput;
};


export type MutationUpdateProjectArgs = {
  data: UpdateProjectInput;
};


export type MutationUpdateSocialLinkArgs = {
  data: SocialLinkInput;
  id: Scalars['String']['input'];
};


export type MutationVerifyAccountArgs = {
  data: VerificationInput;
};

export type NewEmailInput = {
  token: Scalars['String']['input'];
};

export type NewPasswordInput = {
  password: Scalars['String']['input'];
  passwordRepeat: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type NotificationMetaModel = {
  __typename?: 'NotificationMetaModel';
  limit: Scalars['Float']['output'];
  page: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type NotificationModel = {
  __typename?: 'NotificationModel';
  actorId?: Maybe<Scalars['String']['output']>;
  albumId?: Maybe<Scalars['String']['output']>;
  commentId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  projectId?: Maybe<Scalars['String']['output']>;
  type: NotificationsType;
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type NotificationSettingsModel = {
  __typename?: 'NotificationSettingsModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  pushNotifications: Scalars['Boolean']['output'];
  siteNotifications: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export enum NotificationsType {
  CommentReply = 'COMMENT_REPLY',
  DisableTwoFactor = 'DISABLE_TWO_FACTOR',
  DonationReceived = 'DONATION_RECEIVED',
  EnableTwoFactor = 'ENABLE_TWO_FACTOR',
  NewFollower = 'NEW_FOLLOWER',
  NewProject = 'NEW_PROJECT',
  NewSponsorship = 'NEW_SPONSORSHIP',
  PayoutSuccess = 'PAYOUT_SUCCESS',
  ProjectComment = 'PROJECT_COMMENT',
  ProjectLike = 'PROJECT_LIKE',
  RefundProcessed = 'REFUND_PROCESSED',
  VerifiedChannel = 'VERIFIED_CHANNEL'
}

export type OutputDonationHistoryModel = {
  __typename?: 'OutputDonationHistoryModel';
  data: Array<PaymentModel>;
  meta: DonationMetaModel;
};

export type OutputFollowModel = {
  __typename?: 'OutputFollowModel';
  data: Array<FollowModel>;
  meta: ProfileMetaModel;
};

export type OutputNotificationModel = {
  __typename?: 'OutputNotificationModel';
  data: Array<NotificationModel>;
  meta: NotificationMetaModel;
};

export type PageLimitInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export enum PaymentMethod {
  FreedomPay = 'FREEDOM_PAY',
  KaspiPay = 'KASPI_PAY'
}

export type PaymentModel = {
  __typename?: 'PaymentModel';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  donor: UserInfoModel;
  id: Scalars['String']['output'];
  isAnonymous: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  paymentMethod: PaymentMethod;
  recipient: UserInfoModel;
  status: PaymentsStatus;
};

export enum PaymentsStatus {
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Refunded = 'REFUNDED',
  Succeeded = 'SUCCEEDED'
}

export type PayoutDetailsGql = {
  __typename?: 'PayoutDetailsGQL';
  card?: Maybe<Scalars['String']['output']>;
  iban?: Maybe<Scalars['String']['output']>;
  method: PayoutMethod;
  phone?: Maybe<Scalars['String']['output']>;
};

export type PayoutHistoryItemModel = {
  __typename?: 'PayoutHistoryItemModel';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  failureReason?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  method: PayoutMethod;
  processedAt?: Maybe<Scalars['DateTime']['output']>;
  status: PayoutStatus;
  transactionId?: Maybe<Scalars['String']['output']>;
};

export type PayoutHistoryResponseModel = {
  __typename?: 'PayoutHistoryResponseModel';
  data: Array<PayoutHistoryItemModel>;
  meta: PaginationMeta;
};

export type PayoutItemModel = {
  __typename?: 'PayoutItemModel';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  payoutDetails?: Maybe<PayoutDetailsGql>;
  status: PayoutStatus;
  user: PayoutUserInfoModel;
};

export type PayoutListResponseModel = {
  __typename?: 'PayoutListResponseModel';
  data: Array<PayoutItemModel>;
  meta: PaginationMeta;
};

export enum PayoutMethod {
  BankTransfer = 'BANK_TRANSFER',
  CardTransfer = 'CARD_TRANSFER',
  KaspiTransfer = 'KASPI_TRANSFER'
}

export type PayoutSettingsModel = {
  __typename?: 'PayoutSettingsModel';
  cardHolder?: Maybe<Scalars['String']['output']>;
  cardNumber?: Maybe<Scalars['String']['output']>;
  iban?: Maybe<Scalars['String']['output']>;
  kaspiPhone?: Maybe<Scalars['String']['output']>;
  method?: Maybe<PayoutMethod>;
};

export enum PayoutStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING'
}

export type PayoutUserInfoModel = {
  __typename?: 'PayoutUserInfoModel';
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type PopularTagsModel = {
  __typename?: 'PopularTagsModel';
  count: Scalars['Int']['output'];
  tag: Scalars['String']['output'];
};

export type ProcessPayoutResponseModel = {
  __typename?: 'ProcessPayoutResponseModel';
  status: PayoutStatus;
  success: Scalars['Boolean']['output'];
};

export type ProfileMetaModel = {
  __typename?: 'ProfileMetaModel';
  limit: Scalars['Float']['output'];
  page: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type ProjectLikeModel = {
  __typename?: 'ProjectLikeModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  user: ProjectLikedUserModel;
};

export type ProjectLikedUserModel = {
  __typename?: 'ProjectLikedUserModel';
  avatar?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type ProjectMetaModel = {
  __typename?: 'ProjectMetaModel';
  limit: Scalars['Float']['output'];
  page: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type ProjectModel = {
  __typename?: 'ProjectModel';
  album: FullModelProject;
  albumId: Scalars['String']['output'];
  comments: Array<CommentModel>;
  commentsCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  isPublic: Scalars['Boolean']['output'];
  likedBy?: Maybe<Array<ProjectLikeModel>>;
  likes: Scalars['Int']['output'];
  media: Array<MediaModel>;
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  views: Scalars['Int']['output'];
};

export type ProjectPreviewModel = {
  __typename?: 'ProjectPreviewModel';
  commentsCount: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isPublic: Scalars['Boolean']['output'];
  likes: Scalars['Int']['output'];
  media: Array<MediaModel>;
  tags: Array<Scalars['String']['output']>;
  thumbnailUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  views: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAllAlbums: FilterAlbumModel;
  findAllProject: FilterProjectModel;
  findAllUser: Array<UserModel>;
  findCommentByProject: FilterCommentModel;
  findCurrentSession: SessionModel;
  findFollowers: OutputFollowModel;
  findFollowings: OutputFollowModel;
  findNotificationsByUser: OutputNotificationModel;
  findNotificationsUnreadCount: Scalars['Float']['output'];
  findOne: AlbumModel;
  findOneProject: ProjectModel;
  findProfile: UserModel;
  findSessionByUser: Array<SessionModel>;
  findSocialMedia: Array<SocialLinkModel>;
  generateTotpSecret: TotpModel;
  getAllPayouts: PayoutListResponseModel;
  getBalance: BalanceModel;
  getChannel: ChannelModel;
  getChatMessages: ChatMessagesResponseModel;
  getDevices: Array<DevicesModel>;
  getDonationStats: DonationStatsModel;
  getEarnOnFee: EarnOnFeeModel;
  getMyChats: Array<ChatModel>;
  getPaymentHistory: OutputDonationHistoryModel;
  getPayoutHistory: PayoutHistoryResponseModel;
  getPayoutSettings: PayoutSettingsModel;
  getPendingPayouts: PayoutListResponseModel;
  getProjectCommentCount: CommnetCountModel;
  getRepliesComment: FilterCommentModel;
  getTiersByAuthor: Array<DonationTierModel>;
  popularTags: Array<PopularTagsModel>;
  projectLikes: Array<ProjectLikeModel>;
};


export type QueryFindAllAlbumsArgs = {
  filter: FilterAlbumInput;
};


export type QueryFindAllProjectArgs = {
  filter: FilterProjectInput;
};


export type QueryFindCommentByProjectArgs = {
  filter: FilterCommentInput;
};


export type QueryFindFollowersArgs = {
  data: FindFollowers;
};


export type QueryFindFollowingsArgs = {
  data: FindFollowings;
};


export type QueryFindNotificationsByUserArgs = {
  data: PageLimitInput;
};


export type QueryFindOneArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindOneProjectArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryGetAllPayoutsArgs = {
  data: HistoryPaymentInput;
};


export type QueryGetChannelArgs = {
  username: Scalars['String']['input'];
};


export type QueryGetChatMessagesArgs = {
  data: GetChatMessagesInput;
};


export type QueryGetPaymentHistoryArgs = {
  data: HistoryPaymentInput;
};


export type QueryGetPayoutHistoryArgs = {
  data?: InputMaybe<HistoryPaymentInput>;
};


export type QueryGetPendingPayoutsArgs = {
  data?: InputMaybe<HistoryPaymentInput>;
};


export type QueryGetProjectCommentCountArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryGetRepliesCommentArgs = {
  data: GetRepliesInput;
};


export type QueryGetTiersByAuthorArgs = {
  username: Scalars['String']['input'];
};


export type QueryPopularTagsArgs = {
  limit?: Scalars['Int']['input'];
};


export type QueryProjectLikesArgs = {
  projectId: Scalars['String']['input'];
};

export type RefundPaymentInput = {
  paymentId: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type RefundResponseModel = {
  __typename?: 'RefundResponseModel';
  amount: Scalars['Int']['output'];
  refundId: Scalars['String']['output'];
  status: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type RegisterDeviceTokenInput = {
  deviceName?: InputMaybe<Scalars['String']['input']>;
  deviceType: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type RemoveTagInput = {
  projectId: Scalars['String']['input'];
  tag: Scalars['String']['input'];
};

export type RequestPayoutResponseModel = {
  __typename?: 'RequestPayoutResponseModel';
  amount: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  method: PayoutMethod;
  payoutId: Scalars['String']['output'];
  status: PayoutStatus;
};

export type ResetPasswordInput = {
  email: Scalars['String']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SessionMetadataModel = {
  __typename?: 'SessionMetadataModel';
  device: DeviceModel;
  ip: Scalars['String']['output'];
  location: LocationModel;
};

export type SessionModel = {
  __typename?: 'SessionModel';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isCurrent: Scalars['Boolean']['output'];
  metadata?: Maybe<SessionMetadataModel>;
  userId: Scalars['String']['output'];
};

export type SetupPayoutInput = {
  cardHolder?: InputMaybe<Scalars['String']['input']>;
  cardNumber?: InputMaybe<Scalars['String']['input']>;
  iban?: InputMaybe<Scalars['String']['input']>;
  kaspiPhone?: InputMaybe<Scalars['String']['input']>;
  method: PayoutMethod;
};

export type SetupPayoutResponseModel = {
  __typename?: 'SetupPayoutResponseModel';
  method: PayoutMethod;
  success: Scalars['Boolean']['output'];
};

export type SocialLinkInput = {
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type SocialLinkModel = {
  __typename?: 'SocialLinkModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  position: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type SocialLinkOrderInput = {
  id: Scalars['String']['input'];
  position: Scalars['Float']['input'];
};

export type TotpModel = {
  __typename?: 'TotpModel';
  qrcodeUrl: Scalars['String']['output'];
  secret: Scalars['String']['output'];
};

export type UpdateAlbumInput = {
  id: Scalars['String']['input'];
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCommentInput = {
  id: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type UpdateDonationTierInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  benefits?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  tierId: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  media?: InputMaybe<Array<Scalars['String']['input']>>;
  projectId: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UserChatInfoModel = {
  __typename?: 'UserChatInfoModel';
  avatar?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isOnline: Scalars['Boolean']['output'];
  lastSeenAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type UserInfoCommentModel = {
  __typename?: 'UserInfoCommentModel';
  avatar?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserInfoModel = {
  __typename?: 'UserInfoModel';
  avatar?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserModel = {
  __typename?: 'UserModel';
  albums: Array<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  bankCardHolder: Scalars['String']['output'];
  bankCardNumber: Scalars['String']['output'];
  bankIBAN: Scalars['String']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  comments: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deactivatedAt?: Maybe<Scalars['DateTime']['output']>;
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isDeactivated: Scalars['Boolean']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  isOnline: Scalars['Boolean']['output'];
  isTotpEnabled: Scalars['Boolean']['output'];
  isVerified: Scalars['Boolean']['output'];
  kaspiPhone: Scalars['String']['output'];
  lastSeenAt: Scalars['DateTime']['output'];
  notificaitons: Array<NotificationModel>;
  notifications: Array<Scalars['String']['output']>;
  notificationsSettings: NotificationSettingsModel;
  password: Scalars['String']['output'];
  pendingNewEmail: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  projectLikes: Array<Scalars['String']['output']>;
  role: Role;
  socialLink?: Maybe<Array<SocialLinkModel>>;
  subscriptions?: Maybe<Scalars['String']['output']>;
  totpSecret?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type VerificationInput = {
  token: Scalars['String']['input'];
};

export type ChangeNotificationSettingsModel = {
  __typename?: 'changeNotificationSettingsModel';
  notificationSettings: NotificationSettingsModel;
};

export type GetChatMessagesInput = {
  chatId: Scalars['String']['input'];
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};

export type AddTagMutationVariables = Exact<{
  data: CreateTagInput;
}>;


export type AddTagMutation = { __typename?: 'Mutation', addTag: boolean };

export type ApprovePayoutMutationVariables = Exact<{
  payoutId: Scalars['String']['input'];
  transactionId: Scalars['String']['input'];
}>;


export type ApprovePayoutMutation = { __typename?: 'Mutation', approvePayout: { __typename?: 'ApprovePayoutResponseModel', payoutId: string, amount: number, success: boolean } };

export type ChangeEmailMutationVariables = Exact<{
  data: ChangeEmailInput;
}>;


export type ChangeEmailMutation = { __typename?: 'Mutation', changeEmail: boolean };

export type ChangeNotificationSettingsMutationVariables = Exact<{
  data: ChangeNotificationsSettingsInput;
}>;


export type ChangeNotificationSettingsMutation = { __typename?: 'Mutation', changeNotificationSettings: { __typename?: 'changeNotificationSettingsModel', notificationSettings: { __typename?: 'NotificationSettingsModel', siteNotifications: boolean, pushNotifications: boolean } } };

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };

export type ChangeProfileInfoMutationVariables = Exact<{
  data: ChangeProfileInput;
}>;


export type ChangeProfileInfoMutation = { __typename?: 'Mutation', changeProfileInfo: boolean };

export type CreateAlbumMutationVariables = Exact<{
  data: CreateAlbumInput;
}>;


export type CreateAlbumMutation = { __typename?: 'Mutation', createAlbum: { __typename?: 'AlbumModel', thumbnailUrl: string, title: string, isPublic: boolean, createdAt: string, id: string } };

export type CreateDonationTierMutationVariables = Exact<{
  data: CreateDonationTierInput;
}>;


export type CreateDonationTierMutation = { __typename?: 'Mutation', createDonationTier: { __typename?: 'DonationTierModel', id: string, title: string, description: string, amount: number, currency: string, benefits: Array<string>, isActive: boolean, position: number } };

export type CreateDraftProjectMutationVariables = Exact<{
  albumId: Scalars['String']['input'];
}>;


export type CreateDraftProjectMutation = { __typename?: 'Mutation', createDraftProject: string };

export type CreatePaymentMutationVariables = Exact<{
  data: CreatePaymentInput;
}>;


export type CreatePaymentMutation = { __typename?: 'Mutation', createPayment: { __typename?: 'CreatePaymentResponseModel', paymentId: string, paymentUrl: string, amount: number, method: PaymentMethod, expiresAt: string, qrCode?: string | null, webUrl?: string | null } };

export type CreateProjectMutationVariables = Exact<{
  data: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'ProjectModel', albumId: string, tags: Array<string>, title: string, description?: string | null, createdAt: string, id: string, likes: number, commentsCount: number, views: number, media: Array<{ __typename?: 'MediaModel', mediaType: MediaType, projectId: string, url: string }> } };

export type CreateProjectCommentMutationVariables = Exact<{
  data: CreateCommentInput;
}>;


export type CreateProjectCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommentModel', id: string, text: string, createdAt: string, user: { __typename?: 'UserInfoCommentModel', id: string, username: string, avatar?: string | null } } };

export type CreateSocialLinkMutationVariables = Exact<{
  data: SocialLinkInput;
}>;


export type CreateSocialLinkMutation = { __typename?: 'Mutation', createSocialLink: boolean };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserModel', username: string, email: string, password: string } };

export type DeactivateAccountMutationVariables = Exact<{
  data: DeactivateAccountInput;
}>;


export type DeactivateAccountMutation = { __typename?: 'Mutation', deactivateAccount: { __typename?: 'AuthModel', user?: { __typename?: 'UserModel', username: string, email: string } | null } };

export type DeleteDonationTierMutationVariables = Exact<{
  tierId: Scalars['String']['input'];
}>;


export type DeleteDonationTierMutation = { __typename?: 'Mutation', deleteDonationTier: boolean };

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['String']['input'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: boolean };

export type DeleteProjectMutationVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type DisableTotpMutationVariables = Exact<{ [key: string]: never; }>;


export type DisableTotpMutation = { __typename?: 'Mutation', disableTotp: boolean };

export type EditMessageMutationVariables = Exact<{
  data: EditMessageInput;
}>;


export type EditMessageMutation = { __typename?: 'Mutation', editMessage: { __typename?: 'MessageModel', id: string, text: string, isEdited: boolean } };

export type EnableTotpMutationVariables = Exact<{
  data: EnableTotpInput;
}>;


export type EnableTotpMutation = { __typename?: 'Mutation', enableTotp: boolean };

export type FollowUserMutationVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: boolean };

export type GetOrCreateChatMutationVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetOrCreateChatMutation = { __typename?: 'Mutation', getOrCreateChat: { __typename?: 'GetOrCreateChatModel', id: string, chatMembers: Array<{ __typename?: 'ChatMemberModel', user: { __typename?: 'UserChatInfoModel', id: string, username: string, displayName: string, avatar?: string | null, lastSeenAt?: string | null } }>, messages: Array<{ __typename?: 'MessageModel', id: string, chatId: string, senderId: string, text: string, isRead: boolean, isEdited: boolean, createdAt: string, sender: { __typename?: 'UserChatInfoModel', id: string, username: string, displayName: string, avatar?: string | null } }> } };

export type IncrementProjectViewMutationVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type IncrementProjectViewMutation = { __typename?: 'Mutation', incrementProjectView: number };

export type LoginUserMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'AuthModel', message?: string | null, user?: { __typename?: 'UserModel', email: string, username: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logoutUser: boolean };

export type MarkAllNotificationsAsReadMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkAllNotificationsAsReadMutation = { __typename?: 'Mutation', markAllNotificationAsRead: boolean };

export type MarkNotificationAsReadMutationVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead: boolean };

export type NewEmailMutationVariables = Exact<{
  data: NewEmailInput;
}>;


export type NewEmailMutation = { __typename?: 'Mutation', newEmail: boolean };

export type NewPasswordMutationVariables = Exact<{
  data: NewPasswordInput;
}>;


export type NewPasswordMutation = { __typename?: 'Mutation', newPassword: boolean };

export type RegisterDeviceTokenMutationVariables = Exact<{
  data: RegisterDeviceTokenInput;
}>;


export type RegisterDeviceTokenMutation = { __typename?: 'Mutation', registerDeviceToken: boolean };

export type RejectPayoutMutationVariables = Exact<{
  payoutId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
}>;


export type RejectPayoutMutation = { __typename?: 'Mutation', rejectPayout: boolean };

export type RemoveAlbumMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveAlbumMutation = { __typename?: 'Mutation', removeAlbum: boolean };

export type RemoveDeviceTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type RemoveDeviceTokenMutation = { __typename?: 'Mutation', removeDeviceToken: boolean };

export type RemovePayoutMethodMutationVariables = Exact<{ [key: string]: never; }>;


export type RemovePayoutMethodMutation = { __typename?: 'Mutation', removePayoutMethod: boolean };

export type RemoveProjectCommentMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveProjectCommentMutation = { __typename?: 'Mutation', removeComment: boolean };

export type RemoveSessionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveSessionMutation = { __typename?: 'Mutation', removeSession: boolean };

export type RemoveSocialLinkMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveSocialLinkMutation = { __typename?: 'Mutation', removeSocialLink: boolean };

export type RemoveTagMutationVariables = Exact<{
  data: RemoveTagInput;
}>;


export type RemoveTagMutation = { __typename?: 'Mutation', removeTag: boolean };

export type ReorderSocialLinksMutationVariables = Exact<{
  list: Array<SocialLinkOrderInput> | SocialLinkOrderInput;
}>;


export type ReorderSocialLinksMutation = { __typename?: 'Mutation', reorderSocialLinks: boolean };

export type RequestPayoutMutationVariables = Exact<{ [key: string]: never; }>;


export type RequestPayoutMutation = { __typename?: 'Mutation', requestPayout: { __typename?: 'RequestPayoutResponseModel', payoutId: string, amount: number, method: PayoutMethod, status: PayoutStatus, message: string } };

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type SetupPayoutMethodMutationVariables = Exact<{
  data: SetupPayoutInput;
}>;


export type SetupPayoutMethodMutation = { __typename?: 'Mutation', setupPayoutMethod: { __typename?: 'SetupPayoutResponseModel', method: PayoutMethod, success: boolean } };

export type StartProcessingPayoutMutationVariables = Exact<{
  payoutId: Scalars['String']['input'];
}>;


export type StartProcessingPayoutMutation = { __typename?: 'Mutation', startProcessingPayout: { __typename?: 'ProcessPayoutResponseModel', status: PayoutStatus, success: boolean } };

export type ToggleLikeProjectMutationVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type ToggleLikeProjectMutation = { __typename?: 'Mutation', toggleLike: { __typename?: 'ProjectModel', id: string, likes: number, isLiked?: boolean | null, likedBy?: Array<{ __typename?: 'ProjectLikeModel', id: string, createdAt: string, user: { __typename?: 'ProjectLikedUserModel', id: string, displayName?: string | null, username: string, avatar?: string | null } }> | null } };

export type UnfollowUserMutationVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser: boolean };

export type UpdateAlbumMutationVariables = Exact<{
  data: UpdateAlbumInput;
}>;


export type UpdateAlbumMutation = { __typename?: 'Mutation', updateAlbum: { __typename?: 'AlbumModel', thumbnailUrl: string, title: string, isPublic: boolean, id: string } };

export type UpdateDonationTierMutationVariables = Exact<{
  data: UpdateDonationTierInput;
}>;


export type UpdateDonationTierMutation = { __typename?: 'Mutation', updateDonationTier: { __typename?: 'DonationTierModel', id: string, title: string, description: string, amount: number, currency: string, benefits: Array<string>, isActive: boolean, position: number } };

export type UpdateProjectMutationVariables = Exact<{
  data: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'ProjectModel', albumId: string, tags: Array<string>, title: string, description?: string | null, id: string, views: number, commentsCount: number, likes: number, media: Array<{ __typename?: 'MediaModel', mediaType: MediaType, projectId: string, url: string }> } };

export type UpdateProjectCommentMutationVariables = Exact<{
  data: UpdateCommentInput;
}>;


export type UpdateProjectCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'CommentModel', id: string, text: string, updatedAt: string } };

export type UpdateSocialLinkMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: SocialLinkInput;
}>;


export type UpdateSocialLinkMutation = { __typename?: 'Mutation', updateSocialLink: boolean };

export type VerifyAccountMutationVariables = Exact<{
  data: VerificationInput;
}>;


export type VerifyAccountMutation = { __typename?: 'Mutation', verifyAccount: { __typename?: 'UserModel', email: string, username: string } };

export type SetProjectLikeMutationVariables = Exact<{
  projectId: Scalars['String']['input'];
  like: Scalars['Boolean']['input'];
}>;


export type SetProjectLikeMutation = { __typename?: 'Mutation', setProjectLike: { __typename?: 'ProjectModel', id: string, likes: number, isLiked?: boolean | null, likedBy?: Array<{ __typename?: 'ProjectLikeModel', id: string, createdAt: string, user: { __typename?: 'ProjectLikedUserModel', id: string, username: string, displayName?: string | null, avatar?: string | null } }> | null } };

export type FindAllAlbumsQueryVariables = Exact<{
  filter: FilterAlbumInput;
}>;


export type FindAllAlbumsQuery = { __typename?: 'Query', findAllAlbums: { __typename?: 'FilterAlbumModel', data: Array<{ __typename?: 'AlbumModel', id: string, title: string, projectCount?: number | null, thumbnailUrl: string, isPublic: boolean, user?: { __typename?: 'AlbumUserModel', avatar?: string | null, id: string, username: string } | null }>, meta: { __typename?: 'AlbumMetaModel', limit: number, page: number, totalPages: number, total: number } } };

export type FindAllProjectsQueryVariables = Exact<{
  filter: FilterProjectInput;
}>;


export type FindAllProjectsQuery = { __typename?: 'Query', findAllProject: { __typename?: 'FilterProjectModel', data: Array<{ __typename?: 'ProjectModel', id: string, title: string, description?: string | null, likes: number, views: number, tags: Array<string>, media: Array<{ __typename?: 'MediaModel', id: string, url: string, mediaType: MediaType }> }>, meta: { __typename?: 'ProjectMetaModel', limit: number, page: number, total: number, totalPages: number } } };

export type FindCommentsByProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type FindCommentsByProjectQuery = { __typename?: 'Query', findCommentByProject: { __typename?: 'FilterCommentModel', data: Array<{ __typename?: 'CommentModel', id: string, text: string, createdAt: string, repliesCount: number, user: { __typename?: 'UserInfoCommentModel', id: string, username: string, avatar?: string | null } }>, meta: { __typename?: 'CommentMetaModel', page: number, limit: number, total: number, totalPages: number } } };

export type FindFollowersQueryVariables = Exact<{
  data: FindFollowers;
}>;


export type FindFollowersQuery = { __typename?: 'Query', findFollowers: { __typename?: 'OutputFollowModel', data: Array<{ __typename?: 'FollowModel', followerId?: string | null, follower?: { __typename?: 'UserModel', id: string, username: string, avatar?: string | null } | null }>, meta: { __typename?: 'ProfileMetaModel', limit: number, page: number, total: number, totalPages: number } } };

export type FindFollowingsQueryVariables = Exact<{
  data: FindFollowings;
}>;


export type FindFollowingsQuery = { __typename?: 'Query', findFollowings: { __typename?: 'OutputFollowModel', data: Array<{ __typename?: 'FollowModel', followingId?: string | null, following?: { __typename?: 'UserModel', id: string, avatar?: string | null, username: string } | null }>, meta: { __typename?: 'ProfileMetaModel', limit: number, page: number, total: number, totalPages: number } } };

export type FindNotificationsByUserQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FindNotificationsByUserQuery = { __typename?: 'Query', findNotificationsByUser: { __typename?: 'OutputNotificationModel', data: Array<{ __typename?: 'NotificationModel', id: string, message: string, type: NotificationsType, isRead: boolean, createdAt: string, actorId?: string | null, albumId?: string | null, projectId?: string | null, commentId?: string | null }>, meta: { __typename?: 'NotificationMetaModel', page: number, limit: number, total: number, totalPages: number } } };

export type FindOneAlbumQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type FindOneAlbumQuery = { __typename?: 'Query', findOne: { __typename?: 'AlbumModel', id: string, title: string, thumbnailUrl: string, isPublic: boolean, projects?: Array<{ __typename?: 'AlbumProjectModel', id: string, title?: string | null, isPublic: boolean, likes: number, commentsCount: number, tags: Array<string>, media: Array<{ __typename?: 'AlbumProjectMediaModel', id: string, mediaType: string, url: string }> }> | null, user?: { __typename?: 'AlbumUserModel', id: string, username: string, avatar?: string | null } | null } };

export type FindOneProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type FindOneProjectQuery = { __typename?: 'Query', findOneProject: { __typename?: 'ProjectModel', id: string, title: string, description?: string | null, likes: number, albumId: string, isLiked?: boolean | null, views: number, tags: Array<string>, album: { __typename?: 'FullModelProject', id: string, title: string, user: { __typename?: 'AlbumUserModell', avatar?: string | null, id: string, username: string, isFollowing?: boolean | null, followers: number } }, likedBy?: Array<{ __typename?: 'ProjectLikeModel', id: string, createdAt: string, user: { __typename?: 'ProjectLikedUserModel', id: string, displayName?: string | null, username: string, avatar?: string | null } }> | null, media: Array<{ __typename?: 'MediaModel', id: string, url: string, mediaType: MediaType }> } };

export type PopularTagsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
}>;


export type PopularTagsQuery = { __typename?: 'Query', popularTags: Array<{ __typename?: 'PopularTagsModel', count: number, tag: string }> };

export type FindProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type FindProfileQuery = { __typename?: 'Query', findProfile: { __typename?: 'UserModel', username: string, email: string, isVerified: boolean, avatar?: string | null, bio?: string | null, displayName: string, id: string, isEmailVerified: boolean, isTotpEnabled: boolean, projectLikes: Array<string>, notificationsSettings: { __typename?: 'NotificationSettingsModel', siteNotifications: boolean, pushNotifications: boolean }, socialLink?: Array<{ __typename?: 'SocialLinkModel', id: string, title: string, url: string, position: number }> | null } };

export type FindSessionsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSessionsByUserQuery = { __typename?: 'Query', findSessionByUser: Array<{ __typename?: 'SessionModel', id: string, createdAt: string, isCurrent: boolean, metadata?: { __typename?: 'SessionMetadataModel', ip: string, device: { __typename?: 'DeviceModel', browser: string, os: string, type: string }, location: { __typename?: 'LocationModel', country: string, city: string } } | null }> };

export type FindSocialMediaQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSocialMediaQuery = { __typename?: 'Query', findSocialMedia: Array<{ __typename?: 'SocialLinkModel', title: string, url: string, position: number, id: string }> };

export type FindNotificationsUnreadCountQueryVariables = Exact<{ [key: string]: never; }>;


export type FindNotificationsUnreadCountQuery = { __typename?: 'Query', findNotificationsUnreadCount: number };

export type GenerateTotpSecretQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerateTotpSecretQuery = { __typename?: 'Query', generateTotpSecret: { __typename?: 'TotpModel', qrcodeUrl: string, secret: string } };

export type GetAllPayoutsQueryVariables = Exact<{
  data: HistoryPaymentInput;
}>;


export type GetAllPayoutsQuery = { __typename?: 'Query', getAllPayouts: { __typename?: 'PayoutListResponseModel', data: Array<{ __typename?: 'PayoutItemModel', id: string, amount: number, status: PayoutStatus, createdAt: string, user: { __typename?: 'PayoutUserInfoModel', id: string, username: string }, payoutDetails?: { __typename?: 'PayoutDetailsGQL', method: PayoutMethod, phone?: string | null, card?: string | null, iban?: string | null } | null }>, meta: { __typename?: 'PaginationMeta', page: number, limit: number, total: number, totalPages: number } } };

export type GetBalanceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBalanceQuery = { __typename?: 'Query', getBalance: { __typename?: 'BalanceModel', availableBalance: number, totalPaidOut: number, totalReceived: number } };

export type GetChannelQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetChannelQuery = { __typename?: 'Query', getChannel: { __typename?: 'ChannelModel', avatar?: string | null, id: string, username: string, bio?: string | null, displayName: string, createdAt: string, isFollowing: boolean, socialLinks: Array<{ __typename?: 'ChannelSocialLinkModel', id: string, title: string, url: string, position: number }>, stats: { __typename?: 'ChannelStatsModel', albumsCount: number, followersCount: number, followingCount: number, projectsCount: number, totalLikes: number, totalViews: number }, albums: Array<{ __typename?: 'AlbumPreviewModel', id: string, isPublic: boolean, projectsCount: number, thumbnailUrl: string, title: string }>, projects: Array<{ __typename?: 'ProjectPreviewModel', id: string, title: string, description?: string | null, isPublic: boolean, tags: Array<string>, commentsCount: number, thumbnailUrl: string, views: number, likes: number, media: Array<{ __typename?: 'MediaModel', id: string, url: string, mediaType: MediaType }> }> } };

export type GetChatMessagesQueryVariables = Exact<{
  data: GetChatMessagesInput;
}>;


export type GetChatMessagesQuery = { __typename?: 'Query', getChatMessages: { __typename?: 'ChatMessagesResponseModel', data: Array<{ __typename?: 'MessageModel', id: string, chatId: string, senderId: string, text: string, isRead: boolean, isEdited: boolean, createdAt: string, sender: { __typename?: 'UserChatInfoModel', id: string, username: string, displayName: string, avatar?: string | null } }>, meta: { __typename?: 'ChatMessagesMetaModel', total: number, totalPages: number, page: number, limit: number } } };

export type GetDonationStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDonationStatsQuery = { __typename?: 'Query', getDonationStats: { __typename?: 'DonationStatsModel', donationsGivenCount: number, donationsReceivedCount: number, totalGiven: number, totalReceived: number, uniqueDonorsCount: number } };

export type GetEarnOnFeeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEarnOnFeeQuery = { __typename?: 'Query', getEarnOnFee: { __typename?: 'EarnOnFeeModel', totalPlatformFee: number, totalReceived: number } };

export type GetMyChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyChatsQuery = { __typename?: 'Query', getMyChats: Array<{ __typename?: 'ChatModel', id: string, unreadCount: number, updatedAt: string, lastMessage?: { __typename?: 'MessageModel', id: string, text: string, createdAt: string, senderId: string } | null, members: Array<{ __typename?: 'UserChatInfoModel', id: string, username: string, displayName: string, avatar?: string | null, isOnline: boolean, lastSeenAt?: string | null }> }> };

export type GetPaymentHistoryQueryVariables = Exact<{
  data: HistoryPaymentInput;
}>;


export type GetPaymentHistoryQuery = { __typename?: 'Query', getPaymentHistory: { __typename?: 'OutputDonationHistoryModel', data: Array<{ __typename?: 'PaymentModel', id: string, amount: number, currency: string, status: PaymentsStatus, paymentMethod: PaymentMethod, isAnonymous: boolean, message?: string | null, createdAt: string, paidAt?: string | null, donor: { __typename?: 'UserInfoModel', id: string, username: string, displayName?: string | null, avatar?: string | null }, recipient: { __typename?: 'UserInfoModel', id: string, username: string, displayName?: string | null, avatar?: string | null } }>, meta: { __typename?: 'DonationMetaModel', total: number, page: number, limit: number, totalPages: number } } };

export type GetPayoutHistoryQueryVariables = Exact<{
  data?: InputMaybe<HistoryPaymentInput>;
}>;


export type GetPayoutHistoryQuery = { __typename?: 'Query', getPayoutHistory: { __typename?: 'PayoutHistoryResponseModel', data: Array<{ __typename?: 'PayoutHistoryItemModel', id: string, amount: number, method: PayoutMethod, status: PayoutStatus, createdAt: string, processedAt?: string | null, failureReason?: string | null, transactionId?: string | null }>, meta: { __typename?: 'PaginationMeta', page: number, limit: number, total: number, totalPages: number } } };

export type GetPayoutSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPayoutSettingsQuery = { __typename?: 'Query', getPayoutSettings: { __typename?: 'PayoutSettingsModel', method?: PayoutMethod | null, kaspiPhone?: string | null, cardNumber?: string | null, cardHolder?: string | null, iban?: string | null } };

export type GetPendingPayoutsQueryVariables = Exact<{
  data?: InputMaybe<HistoryPaymentInput>;
}>;


export type GetPendingPayoutsQuery = { __typename?: 'Query', getPendingPayouts: { __typename?: 'PayoutListResponseModel', data: Array<{ __typename?: 'PayoutItemModel', id: string, amount: number, status: PayoutStatus, createdAt: string, user: { __typename?: 'PayoutUserInfoModel', id: string, username: string }, payoutDetails?: { __typename?: 'PayoutDetailsGQL', method: PayoutMethod, phone?: string | null, card?: string | null, iban?: string | null } | null }>, meta: { __typename?: 'PaginationMeta', page: number, limit: number, total: number, totalPages: number } } };

export type GetCommentRepliesQueryVariables = Exact<{
  data: GetRepliesInput;
}>;


export type GetCommentRepliesQuery = { __typename?: 'Query', getRepliesComment: { __typename?: 'FilterCommentModel', data: Array<{ __typename?: 'CommentModel', text: string, id: string, parentId?: string | null, createdAt: string, user: { __typename?: 'UserInfoCommentModel', id: string, avatar?: string | null, username: string }, replies?: Array<{ __typename?: 'CommentModel', id: string, text: string, user: { __typename?: 'UserInfoCommentModel', id: string, username: string } }> | null }> } };

export type GetTiersByAuthorQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetTiersByAuthorQuery = { __typename?: 'Query', getTiersByAuthor: Array<{ __typename?: 'DonationTierModel', id: string, title: string, description: string, amount: number, currency: string, benefits: Array<string>, isActive: boolean, position: number }> };

export type ProjectLikesQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type ProjectLikesQuery = { __typename?: 'Query', projectLikes: Array<{ __typename?: 'ProjectLikeModel', id: string, createdAt: string, user: { __typename?: 'ProjectLikedUserModel', id: string, username: string, displayName?: string | null, avatar?: string | null } }> };


export const AddTagDocument = gql`
    mutation addTag($data: CreateTagInput!) {
  addTag(data: $data)
}
    `;
export type AddTagMutationFn = ApolloReactCommon.MutationFunction<AddTagMutation, AddTagMutationVariables>;

/**
 * __useAddTagMutation__
 *
 * To run a mutation, you first call `useAddTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTagMutation, { data, loading, error }] = useAddTagMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddTagMutation, AddTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AddTagMutation, AddTagMutationVariables>(AddTagDocument, options);
      }
export type AddTagMutationHookResult = ReturnType<typeof useAddTagMutation>;
export type AddTagMutationResult = ApolloReactCommon.MutationResult<AddTagMutation>;
export type AddTagMutationOptions = ApolloReactCommon.BaseMutationOptions<AddTagMutation, AddTagMutationVariables>;
export const ApprovePayoutDocument = gql`
    mutation ApprovePayout($payoutId: String!, $transactionId: String!) {
  approvePayout(payoutId: $payoutId, transactionId: $transactionId) {
    payoutId
    amount
    success
  }
}
    `;
export type ApprovePayoutMutationFn = ApolloReactCommon.MutationFunction<ApprovePayoutMutation, ApprovePayoutMutationVariables>;

/**
 * __useApprovePayoutMutation__
 *
 * To run a mutation, you first call `useApprovePayoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApprovePayoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approvePayoutMutation, { data, loading, error }] = useApprovePayoutMutation({
 *   variables: {
 *      payoutId: // value for 'payoutId'
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useApprovePayoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ApprovePayoutMutation, ApprovePayoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ApprovePayoutMutation, ApprovePayoutMutationVariables>(ApprovePayoutDocument, options);
      }
export type ApprovePayoutMutationHookResult = ReturnType<typeof useApprovePayoutMutation>;
export type ApprovePayoutMutationResult = ApolloReactCommon.MutationResult<ApprovePayoutMutation>;
export type ApprovePayoutMutationOptions = ApolloReactCommon.BaseMutationOptions<ApprovePayoutMutation, ApprovePayoutMutationVariables>;
export const ChangeEmailDocument = gql`
    mutation changeEmail($data: ChangeEmailInput!) {
  changeEmail(data: $data)
}
    `;
export type ChangeEmailMutationFn = ApolloReactCommon.MutationFunction<ChangeEmailMutation, ChangeEmailMutationVariables>;

/**
 * __useChangeEmailMutation__
 *
 * To run a mutation, you first call `useChangeEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeEmailMutation, { data, loading, error }] = useChangeEmailMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangeEmailMutation, ChangeEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ChangeEmailMutation, ChangeEmailMutationVariables>(ChangeEmailDocument, options);
      }
export type ChangeEmailMutationHookResult = ReturnType<typeof useChangeEmailMutation>;
export type ChangeEmailMutationResult = ApolloReactCommon.MutationResult<ChangeEmailMutation>;
export type ChangeEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const ChangeNotificationSettingsDocument = gql`
    mutation changeNotificationSettings($data: ChangeNotificationsSettingsInput!) {
  changeNotificationSettings(data: $data) {
    notificationSettings {
      siteNotifications
      pushNotifications
    }
  }
}
    `;
export type ChangeNotificationSettingsMutationFn = ApolloReactCommon.MutationFunction<ChangeNotificationSettingsMutation, ChangeNotificationSettingsMutationVariables>;

/**
 * __useChangeNotificationSettingsMutation__
 *
 * To run a mutation, you first call `useChangeNotificationSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeNotificationSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeNotificationSettingsMutation, { data, loading, error }] = useChangeNotificationSettingsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeNotificationSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangeNotificationSettingsMutation, ChangeNotificationSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ChangeNotificationSettingsMutation, ChangeNotificationSettingsMutationVariables>(ChangeNotificationSettingsDocument, options);
      }
export type ChangeNotificationSettingsMutationHookResult = ReturnType<typeof useChangeNotificationSettingsMutation>;
export type ChangeNotificationSettingsMutationResult = ApolloReactCommon.MutationResult<ChangeNotificationSettingsMutation>;
export type ChangeNotificationSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangeNotificationSettingsMutation, ChangeNotificationSettingsMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation changePassword($data: ChangePasswordInput!) {
  changePassword(data: $data)
}
    `;
export type ChangePasswordMutationFn = ApolloReactCommon.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = ApolloReactCommon.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeProfileInfoDocument = gql`
    mutation ChangeProfileInfo($data: ChangeProfileInput!) {
  changeProfileInfo(data: $data)
}
    `;
export type ChangeProfileInfoMutationFn = ApolloReactCommon.MutationFunction<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>;

/**
 * __useChangeProfileInfoMutation__
 *
 * To run a mutation, you first call `useChangeProfileInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProfileInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProfileInfoMutation, { data, loading, error }] = useChangeProfileInfoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeProfileInfoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>(ChangeProfileInfoDocument, options);
      }
export type ChangeProfileInfoMutationHookResult = ReturnType<typeof useChangeProfileInfoMutation>;
export type ChangeProfileInfoMutationResult = ApolloReactCommon.MutationResult<ChangeProfileInfoMutation>;
export type ChangeProfileInfoMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>;
export const CreateAlbumDocument = gql`
    mutation CreateAlbum($data: CreateAlbumInput!) {
  createAlbum(data: $data) {
    thumbnailUrl
    title
    isPublic
    createdAt
    id
  }
}
    `;
export type CreateAlbumMutationFn = ApolloReactCommon.MutationFunction<CreateAlbumMutation, CreateAlbumMutationVariables>;

/**
 * __useCreateAlbumMutation__
 *
 * To run a mutation, you first call `useCreateAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAlbumMutation, { data, loading, error }] = useCreateAlbumMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateAlbumMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAlbumMutation, CreateAlbumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateAlbumMutation, CreateAlbumMutationVariables>(CreateAlbumDocument, options);
      }
export type CreateAlbumMutationHookResult = ReturnType<typeof useCreateAlbumMutation>;
export type CreateAlbumMutationResult = ApolloReactCommon.MutationResult<CreateAlbumMutation>;
export type CreateAlbumMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAlbumMutation, CreateAlbumMutationVariables>;
export const CreateDonationTierDocument = gql`
    mutation CreateDonationTier($data: CreateDonationTierInput!) {
  createDonationTier(data: $data) {
    id
    title
    description
    amount
    currency
    benefits
    isActive
    position
  }
}
    `;
export type CreateDonationTierMutationFn = ApolloReactCommon.MutationFunction<CreateDonationTierMutation, CreateDonationTierMutationVariables>;

/**
 * __useCreateDonationTierMutation__
 *
 * To run a mutation, you first call `useCreateDonationTierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDonationTierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDonationTierMutation, { data, loading, error }] = useCreateDonationTierMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateDonationTierMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateDonationTierMutation, CreateDonationTierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateDonationTierMutation, CreateDonationTierMutationVariables>(CreateDonationTierDocument, options);
      }
export type CreateDonationTierMutationHookResult = ReturnType<typeof useCreateDonationTierMutation>;
export type CreateDonationTierMutationResult = ApolloReactCommon.MutationResult<CreateDonationTierMutation>;
export type CreateDonationTierMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateDonationTierMutation, CreateDonationTierMutationVariables>;
export const CreateDraftProjectDocument = gql`
    mutation CreateDraftProject($albumId: String!) {
  createDraftProject(albumId: $albumId)
}
    `;
export type CreateDraftProjectMutationFn = ApolloReactCommon.MutationFunction<CreateDraftProjectMutation, CreateDraftProjectMutationVariables>;

/**
 * __useCreateDraftProjectMutation__
 *
 * To run a mutation, you first call `useCreateDraftProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDraftProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDraftProjectMutation, { data, loading, error }] = useCreateDraftProjectMutation({
 *   variables: {
 *      albumId: // value for 'albumId'
 *   },
 * });
 */
export function useCreateDraftProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateDraftProjectMutation, CreateDraftProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateDraftProjectMutation, CreateDraftProjectMutationVariables>(CreateDraftProjectDocument, options);
      }
export type CreateDraftProjectMutationHookResult = ReturnType<typeof useCreateDraftProjectMutation>;
export type CreateDraftProjectMutationResult = ApolloReactCommon.MutationResult<CreateDraftProjectMutation>;
export type CreateDraftProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateDraftProjectMutation, CreateDraftProjectMutationVariables>;
export const CreatePaymentDocument = gql`
    mutation CreatePayment($data: CreatePaymentInput!) {
  createPayment(data: $data) {
    paymentId
    paymentUrl
    amount
    method
    expiresAt
    qrCode
    webUrl
  }
}
    `;
export type CreatePaymentMutationFn = ApolloReactCommon.MutationFunction<CreatePaymentMutation, CreatePaymentMutationVariables>;

/**
 * __useCreatePaymentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMutation, { data, loading, error }] = useCreatePaymentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePaymentMutation, CreatePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(CreatePaymentDocument, options);
      }
export type CreatePaymentMutationHookResult = ReturnType<typeof useCreatePaymentMutation>;
export type CreatePaymentMutationResult = ApolloReactCommon.MutationResult<CreatePaymentMutation>;
export type CreatePaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePaymentMutation, CreatePaymentMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($data: CreateProjectInput!) {
  createProject(data: $data) {
    albumId
    tags
    title
    description
    createdAt
    id
    likes
    commentsCount
    views
    media {
      mediaType
      projectId
      url
    }
  }
}
    `;
export type CreateProjectMutationFn = ApolloReactCommon.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = ApolloReactCommon.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateProjectCommentDocument = gql`
    mutation createProjectComment($data: CreateCommentInput!) {
  createComment(data: $data) {
    id
    text
    createdAt
    user {
      id
      username
      avatar
    }
  }
}
    `;
export type CreateProjectCommentMutationFn = ApolloReactCommon.MutationFunction<CreateProjectCommentMutation, CreateProjectCommentMutationVariables>;

/**
 * __useCreateProjectCommentMutation__
 *
 * To run a mutation, you first call `useCreateProjectCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectCommentMutation, { data, loading, error }] = useCreateProjectCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProjectCommentMutation, CreateProjectCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateProjectCommentMutation, CreateProjectCommentMutationVariables>(CreateProjectCommentDocument, options);
      }
export type CreateProjectCommentMutationHookResult = ReturnType<typeof useCreateProjectCommentMutation>;
export type CreateProjectCommentMutationResult = ApolloReactCommon.MutationResult<CreateProjectCommentMutation>;
export type CreateProjectCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProjectCommentMutation, CreateProjectCommentMutationVariables>;
export const CreateSocialLinkDocument = gql`
    mutation CreateSocialLink($data: SocialLinkInput!) {
  createSocialLink(data: $data)
}
    `;
export type CreateSocialLinkMutationFn = ApolloReactCommon.MutationFunction<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>;

/**
 * __useCreateSocialLinkMutation__
 *
 * To run a mutation, you first call `useCreateSocialLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSocialLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSocialLinkMutation, { data, loading, error }] = useCreateSocialLinkMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSocialLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>(CreateSocialLinkDocument, options);
      }
export type CreateSocialLinkMutationHookResult = ReturnType<typeof useCreateSocialLinkMutation>;
export type CreateSocialLinkMutationResult = ApolloReactCommon.MutationResult<CreateSocialLinkMutation>;
export type CreateSocialLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data) {
    username
    email
    password
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeactivateAccountDocument = gql`
    mutation DeactivateAccount($data: DeactivateAccountInput!) {
  deactivateAccount(data: $data) {
    user {
      username
      email
    }
  }
}
    `;
export type DeactivateAccountMutationFn = ApolloReactCommon.MutationFunction<DeactivateAccountMutation, DeactivateAccountMutationVariables>;

/**
 * __useDeactivateAccountMutation__
 *
 * To run a mutation, you first call `useDeactivateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateAccountMutation, { data, loading, error }] = useDeactivateAccountMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeactivateAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeactivateAccountMutation, DeactivateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeactivateAccountMutation, DeactivateAccountMutationVariables>(DeactivateAccountDocument, options);
      }
export type DeactivateAccountMutationHookResult = ReturnType<typeof useDeactivateAccountMutation>;
export type DeactivateAccountMutationResult = ApolloReactCommon.MutationResult<DeactivateAccountMutation>;
export type DeactivateAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<DeactivateAccountMutation, DeactivateAccountMutationVariables>;
export const DeleteDonationTierDocument = gql`
    mutation DeleteDonationTier($tierId: String!) {
  deleteDonationTier(tierId: $tierId)
}
    `;
export type DeleteDonationTierMutationFn = ApolloReactCommon.MutationFunction<DeleteDonationTierMutation, DeleteDonationTierMutationVariables>;

/**
 * __useDeleteDonationTierMutation__
 *
 * To run a mutation, you first call `useDeleteDonationTierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDonationTierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDonationTierMutation, { data, loading, error }] = useDeleteDonationTierMutation({
 *   variables: {
 *      tierId: // value for 'tierId'
 *   },
 * });
 */
export function useDeleteDonationTierMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteDonationTierMutation, DeleteDonationTierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteDonationTierMutation, DeleteDonationTierMutationVariables>(DeleteDonationTierDocument, options);
      }
export type DeleteDonationTierMutationHookResult = ReturnType<typeof useDeleteDonationTierMutation>;
export type DeleteDonationTierMutationResult = ApolloReactCommon.MutationResult<DeleteDonationTierMutation>;
export type DeleteDonationTierMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteDonationTierMutation, DeleteDonationTierMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageId: String!) {
  deleteMessage(messageId: $messageId)
}
    `;
export type DeleteMessageMutationFn = ApolloReactCommon.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = ApolloReactCommon.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($projectId: String!) {
  deleteProject(projectId: $projectId)
}
    `;
export type DeleteProjectMutationFn = ApolloReactCommon.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = ApolloReactCommon.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const DisableTotpDocument = gql`
    mutation DisableTotp {
  disableTotp
}
    `;
export type DisableTotpMutationFn = ApolloReactCommon.MutationFunction<DisableTotpMutation, DisableTotpMutationVariables>;

/**
 * __useDisableTotpMutation__
 *
 * To run a mutation, you first call `useDisableTotpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableTotpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableTotpMutation, { data, loading, error }] = useDisableTotpMutation({
 *   variables: {
 *   },
 * });
 */
export function useDisableTotpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DisableTotpMutation, DisableTotpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DisableTotpMutation, DisableTotpMutationVariables>(DisableTotpDocument, options);
      }
export type DisableTotpMutationHookResult = ReturnType<typeof useDisableTotpMutation>;
export type DisableTotpMutationResult = ApolloReactCommon.MutationResult<DisableTotpMutation>;
export type DisableTotpMutationOptions = ApolloReactCommon.BaseMutationOptions<DisableTotpMutation, DisableTotpMutationVariables>;
export const EditMessageDocument = gql`
    mutation EditMessage($data: EditMessageInput!) {
  editMessage(data: $data) {
    id
    text
    isEdited
  }
}
    `;
export type EditMessageMutationFn = ApolloReactCommon.MutationFunction<EditMessageMutation, EditMessageMutationVariables>;

/**
 * __useEditMessageMutation__
 *
 * To run a mutation, you first call `useEditMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMessageMutation, { data, loading, error }] = useEditMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditMessageMutation, EditMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EditMessageMutation, EditMessageMutationVariables>(EditMessageDocument, options);
      }
export type EditMessageMutationHookResult = ReturnType<typeof useEditMessageMutation>;
export type EditMessageMutationResult = ApolloReactCommon.MutationResult<EditMessageMutation>;
export type EditMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<EditMessageMutation, EditMessageMutationVariables>;
export const EnableTotpDocument = gql`
    mutation EnableTotp($data: EnableTotpInput!) {
  enableTotp(data: $data)
}
    `;
export type EnableTotpMutationFn = ApolloReactCommon.MutationFunction<EnableTotpMutation, EnableTotpMutationVariables>;

/**
 * __useEnableTotpMutation__
 *
 * To run a mutation, you first call `useEnableTotpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableTotpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableTotpMutation, { data, loading, error }] = useEnableTotpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEnableTotpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EnableTotpMutation, EnableTotpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EnableTotpMutation, EnableTotpMutationVariables>(EnableTotpDocument, options);
      }
export type EnableTotpMutationHookResult = ReturnType<typeof useEnableTotpMutation>;
export type EnableTotpMutationResult = ApolloReactCommon.MutationResult<EnableTotpMutation>;
export type EnableTotpMutationOptions = ApolloReactCommon.BaseMutationOptions<EnableTotpMutation, EnableTotpMutationVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($channelId: String!) {
  followUser(channelId: $channelId)
}
    `;
export type FollowUserMutationFn = ApolloReactCommon.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = ApolloReactCommon.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = ApolloReactCommon.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const GetOrCreateChatDocument = gql`
    mutation GetOrCreateChat($userId: String!) {
  getOrCreateChat(userId: $userId) {
    id
    chatMembers {
      user {
        id
        username
        displayName
        avatar
        lastSeenAt
      }
    }
    messages {
      id
      chatId
      senderId
      text
      isRead
      isEdited
      createdAt
      sender {
        id
        username
        displayName
        avatar
      }
    }
  }
}
    `;
export type GetOrCreateChatMutationFn = ApolloReactCommon.MutationFunction<GetOrCreateChatMutation, GetOrCreateChatMutationVariables>;

/**
 * __useGetOrCreateChatMutation__
 *
 * To run a mutation, you first call `useGetOrCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetOrCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getOrCreateChatMutation, { data, loading, error }] = useGetOrCreateChatMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetOrCreateChatMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetOrCreateChatMutation, GetOrCreateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<GetOrCreateChatMutation, GetOrCreateChatMutationVariables>(GetOrCreateChatDocument, options);
      }
export type GetOrCreateChatMutationHookResult = ReturnType<typeof useGetOrCreateChatMutation>;
export type GetOrCreateChatMutationResult = ApolloReactCommon.MutationResult<GetOrCreateChatMutation>;
export type GetOrCreateChatMutationOptions = ApolloReactCommon.BaseMutationOptions<GetOrCreateChatMutation, GetOrCreateChatMutationVariables>;
export const IncrementProjectViewDocument = gql`
    mutation incrementProjectView($projectId: String!) {
  incrementProjectView(projectId: $projectId)
}
    `;
export type IncrementProjectViewMutationFn = ApolloReactCommon.MutationFunction<IncrementProjectViewMutation, IncrementProjectViewMutationVariables>;

/**
 * __useIncrementProjectViewMutation__
 *
 * To run a mutation, you first call `useIncrementProjectViewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncrementProjectViewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [incrementProjectViewMutation, { data, loading, error }] = useIncrementProjectViewMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useIncrementProjectViewMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<IncrementProjectViewMutation, IncrementProjectViewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<IncrementProjectViewMutation, IncrementProjectViewMutationVariables>(IncrementProjectViewDocument, options);
      }
export type IncrementProjectViewMutationHookResult = ReturnType<typeof useIncrementProjectViewMutation>;
export type IncrementProjectViewMutationResult = ApolloReactCommon.MutationResult<IncrementProjectViewMutation>;
export type IncrementProjectViewMutationOptions = ApolloReactCommon.BaseMutationOptions<IncrementProjectViewMutation, IncrementProjectViewMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($data: LoginInput!) {
  loginUser(data: $data) {
    user {
      email
      username
    }
    message
  }
}
    `;
export type LoginUserMutationFn = ApolloReactCommon.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = ApolloReactCommon.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logoutUser
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MarkAllNotificationsAsReadDocument = gql`
    mutation MarkAllNotificationsAsRead {
  markAllNotificationAsRead
}
    `;
export type MarkAllNotificationsAsReadMutationFn = ApolloReactCommon.MutationFunction<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;

/**
 * __useMarkAllNotificationsAsReadMutation__
 *
 * To run a mutation, you first call `useMarkAllNotificationsAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAllNotificationsAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAllNotificationsAsReadMutation, { data, loading, error }] = useMarkAllNotificationsAsReadMutation({
 *   variables: {
 *   },
 * });
 */
export function useMarkAllNotificationsAsReadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>(MarkAllNotificationsAsReadDocument, options);
      }
export type MarkAllNotificationsAsReadMutationHookResult = ReturnType<typeof useMarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationResult = ApolloReactCommon.MutationResult<MarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationOptions = ApolloReactCommon.BaseMutationOptions<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;
export const MarkNotificationAsReadDocument = gql`
    mutation MarkNotificationAsRead($ids: [String!]!) {
  markNotificationAsRead(ids: $ids)
}
    `;
export type MarkNotificationAsReadMutationFn = ApolloReactCommon.MutationFunction<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;

/**
 * __useMarkNotificationAsReadMutation__
 *
 * To run a mutation, you first call `useMarkNotificationAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationAsReadMutation, { data, loading, error }] = useMarkNotificationAsReadMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useMarkNotificationAsReadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>(MarkNotificationAsReadDocument, options);
      }
export type MarkNotificationAsReadMutationHookResult = ReturnType<typeof useMarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationResult = ApolloReactCommon.MutationResult<MarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationOptions = ApolloReactCommon.BaseMutationOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export const NewEmailDocument = gql`
    mutation newEmail($data: NewEmailInput!) {
  newEmail(data: $data)
}
    `;
export type NewEmailMutationFn = ApolloReactCommon.MutationFunction<NewEmailMutation, NewEmailMutationVariables>;

/**
 * __useNewEmailMutation__
 *
 * To run a mutation, you first call `useNewEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newEmailMutation, { data, loading, error }] = useNewEmailMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useNewEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<NewEmailMutation, NewEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<NewEmailMutation, NewEmailMutationVariables>(NewEmailDocument, options);
      }
export type NewEmailMutationHookResult = ReturnType<typeof useNewEmailMutation>;
export type NewEmailMutationResult = ApolloReactCommon.MutationResult<NewEmailMutation>;
export type NewEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<NewEmailMutation, NewEmailMutationVariables>;
export const NewPasswordDocument = gql`
    mutation NewPassword($data: NewPasswordInput!) {
  newPassword(data: $data)
}
    `;
export type NewPasswordMutationFn = ApolloReactCommon.MutationFunction<NewPasswordMutation, NewPasswordMutationVariables>;

/**
 * __useNewPasswordMutation__
 *
 * To run a mutation, you first call `useNewPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newPasswordMutation, { data, loading, error }] = useNewPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useNewPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<NewPasswordMutation, NewPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<NewPasswordMutation, NewPasswordMutationVariables>(NewPasswordDocument, options);
      }
export type NewPasswordMutationHookResult = ReturnType<typeof useNewPasswordMutation>;
export type NewPasswordMutationResult = ApolloReactCommon.MutationResult<NewPasswordMutation>;
export type NewPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<NewPasswordMutation, NewPasswordMutationVariables>;
export const RegisterDeviceTokenDocument = gql`
    mutation RegisterDeviceToken($data: RegisterDeviceTokenInput!) {
  registerDeviceToken(data: $data)
}
    `;
export type RegisterDeviceTokenMutationFn = ApolloReactCommon.MutationFunction<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>;

/**
 * __useRegisterDeviceTokenMutation__
 *
 * To run a mutation, you first call `useRegisterDeviceTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterDeviceTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerDeviceTokenMutation, { data, loading, error }] = useRegisterDeviceTokenMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterDeviceTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>(RegisterDeviceTokenDocument, options);
      }
export type RegisterDeviceTokenMutationHookResult = ReturnType<typeof useRegisterDeviceTokenMutation>;
export type RegisterDeviceTokenMutationResult = ApolloReactCommon.MutationResult<RegisterDeviceTokenMutation>;
export type RegisterDeviceTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>;
export const RejectPayoutDocument = gql`
    mutation RejectPayout($payoutId: String!, $reason: String!) {
  rejectPayout(payoutId: $payoutId, reason: $reason)
}
    `;
export type RejectPayoutMutationFn = ApolloReactCommon.MutationFunction<RejectPayoutMutation, RejectPayoutMutationVariables>;

/**
 * __useRejectPayoutMutation__
 *
 * To run a mutation, you first call `useRejectPayoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectPayoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectPayoutMutation, { data, loading, error }] = useRejectPayoutMutation({
 *   variables: {
 *      payoutId: // value for 'payoutId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useRejectPayoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RejectPayoutMutation, RejectPayoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RejectPayoutMutation, RejectPayoutMutationVariables>(RejectPayoutDocument, options);
      }
export type RejectPayoutMutationHookResult = ReturnType<typeof useRejectPayoutMutation>;
export type RejectPayoutMutationResult = ApolloReactCommon.MutationResult<RejectPayoutMutation>;
export type RejectPayoutMutationOptions = ApolloReactCommon.BaseMutationOptions<RejectPayoutMutation, RejectPayoutMutationVariables>;
export const RemoveAlbumDocument = gql`
    mutation removeAlbum($id: String!) {
  removeAlbum(id: $id)
}
    `;
export type RemoveAlbumMutationFn = ApolloReactCommon.MutationFunction<RemoveAlbumMutation, RemoveAlbumMutationVariables>;

/**
 * __useRemoveAlbumMutation__
 *
 * To run a mutation, you first call `useRemoveAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAlbumMutation, { data, loading, error }] = useRemoveAlbumMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveAlbumMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveAlbumMutation, RemoveAlbumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveAlbumMutation, RemoveAlbumMutationVariables>(RemoveAlbumDocument, options);
      }
export type RemoveAlbumMutationHookResult = ReturnType<typeof useRemoveAlbumMutation>;
export type RemoveAlbumMutationResult = ApolloReactCommon.MutationResult<RemoveAlbumMutation>;
export type RemoveAlbumMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveAlbumMutation, RemoveAlbumMutationVariables>;
export const RemoveDeviceTokenDocument = gql`
    mutation RemoveDeviceToken($token: String!) {
  removeDeviceToken(token: $token)
}
    `;
export type RemoveDeviceTokenMutationFn = ApolloReactCommon.MutationFunction<RemoveDeviceTokenMutation, RemoveDeviceTokenMutationVariables>;

/**
 * __useRemoveDeviceTokenMutation__
 *
 * To run a mutation, you first call `useRemoveDeviceTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDeviceTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDeviceTokenMutation, { data, loading, error }] = useRemoveDeviceTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRemoveDeviceTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveDeviceTokenMutation, RemoveDeviceTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveDeviceTokenMutation, RemoveDeviceTokenMutationVariables>(RemoveDeviceTokenDocument, options);
      }
export type RemoveDeviceTokenMutationHookResult = ReturnType<typeof useRemoveDeviceTokenMutation>;
export type RemoveDeviceTokenMutationResult = ApolloReactCommon.MutationResult<RemoveDeviceTokenMutation>;
export type RemoveDeviceTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveDeviceTokenMutation, RemoveDeviceTokenMutationVariables>;
export const RemovePayoutMethodDocument = gql`
    mutation RemovePayoutMethod {
  removePayoutMethod
}
    `;
export type RemovePayoutMethodMutationFn = ApolloReactCommon.MutationFunction<RemovePayoutMethodMutation, RemovePayoutMethodMutationVariables>;

/**
 * __useRemovePayoutMethodMutation__
 *
 * To run a mutation, you first call `useRemovePayoutMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePayoutMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePayoutMethodMutation, { data, loading, error }] = useRemovePayoutMethodMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemovePayoutMethodMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemovePayoutMethodMutation, RemovePayoutMethodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemovePayoutMethodMutation, RemovePayoutMethodMutationVariables>(RemovePayoutMethodDocument, options);
      }
export type RemovePayoutMethodMutationHookResult = ReturnType<typeof useRemovePayoutMethodMutation>;
export type RemovePayoutMethodMutationResult = ApolloReactCommon.MutationResult<RemovePayoutMethodMutation>;
export type RemovePayoutMethodMutationOptions = ApolloReactCommon.BaseMutationOptions<RemovePayoutMethodMutation, RemovePayoutMethodMutationVariables>;
export const RemoveProjectCommentDocument = gql`
    mutation removeProjectComment($id: String!) {
  removeComment(id: $id)
}
    `;
export type RemoveProjectCommentMutationFn = ApolloReactCommon.MutationFunction<RemoveProjectCommentMutation, RemoveProjectCommentMutationVariables>;

/**
 * __useRemoveProjectCommentMutation__
 *
 * To run a mutation, you first call `useRemoveProjectCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectCommentMutation, { data, loading, error }] = useRemoveProjectCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveProjectCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveProjectCommentMutation, RemoveProjectCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveProjectCommentMutation, RemoveProjectCommentMutationVariables>(RemoveProjectCommentDocument, options);
      }
export type RemoveProjectCommentMutationHookResult = ReturnType<typeof useRemoveProjectCommentMutation>;
export type RemoveProjectCommentMutationResult = ApolloReactCommon.MutationResult<RemoveProjectCommentMutation>;
export type RemoveProjectCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveProjectCommentMutation, RemoveProjectCommentMutationVariables>;
export const RemoveSessionDocument = gql`
    mutation RemoveSession($id: String!) {
  removeSession(id: $id)
}
    `;
export type RemoveSessionMutationFn = ApolloReactCommon.MutationFunction<RemoveSessionMutation, RemoveSessionMutationVariables>;

/**
 * __useRemoveSessionMutation__
 *
 * To run a mutation, you first call `useRemoveSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSessionMutation, { data, loading, error }] = useRemoveSessionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSessionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveSessionMutation, RemoveSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveSessionMutation, RemoveSessionMutationVariables>(RemoveSessionDocument, options);
      }
export type RemoveSessionMutationHookResult = ReturnType<typeof useRemoveSessionMutation>;
export type RemoveSessionMutationResult = ApolloReactCommon.MutationResult<RemoveSessionMutation>;
export type RemoveSessionMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveSessionMutation, RemoveSessionMutationVariables>;
export const RemoveSocialLinkDocument = gql`
    mutation RemoveSocialLink($id: String!) {
  removeSocialLink(id: $id)
}
    `;
export type RemoveSocialLinkMutationFn = ApolloReactCommon.MutationFunction<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>;

/**
 * __useRemoveSocialLinkMutation__
 *
 * To run a mutation, you first call `useRemoveSocialLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSocialLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSocialLinkMutation, { data, loading, error }] = useRemoveSocialLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSocialLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>(RemoveSocialLinkDocument, options);
      }
export type RemoveSocialLinkMutationHookResult = ReturnType<typeof useRemoveSocialLinkMutation>;
export type RemoveSocialLinkMutationResult = ApolloReactCommon.MutationResult<RemoveSocialLinkMutation>;
export type RemoveSocialLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>;
export const RemoveTagDocument = gql`
    mutation removeTag($data: RemoveTagInput!) {
  removeTag(data: $data)
}
    `;
export type RemoveTagMutationFn = ApolloReactCommon.MutationFunction<RemoveTagMutation, RemoveTagMutationVariables>;

/**
 * __useRemoveTagMutation__
 *
 * To run a mutation, you first call `useRemoveTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTagMutation, { data, loading, error }] = useRemoveTagMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRemoveTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveTagMutation, RemoveTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveTagMutation, RemoveTagMutationVariables>(RemoveTagDocument, options);
      }
export type RemoveTagMutationHookResult = ReturnType<typeof useRemoveTagMutation>;
export type RemoveTagMutationResult = ApolloReactCommon.MutationResult<RemoveTagMutation>;
export type RemoveTagMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveTagMutation, RemoveTagMutationVariables>;
export const ReorderSocialLinksDocument = gql`
    mutation ReorderSocialLinks($list: [SocialLinkOrderInput!]!) {
  reorderSocialLinks(list: $list)
}
    `;
export type ReorderSocialLinksMutationFn = ApolloReactCommon.MutationFunction<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>;

/**
 * __useReorderSocialLinksMutation__
 *
 * To run a mutation, you first call `useReorderSocialLinksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReorderSocialLinksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reorderSocialLinksMutation, { data, loading, error }] = useReorderSocialLinksMutation({
 *   variables: {
 *      list: // value for 'list'
 *   },
 * });
 */
export function useReorderSocialLinksMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>(ReorderSocialLinksDocument, options);
      }
export type ReorderSocialLinksMutationHookResult = ReturnType<typeof useReorderSocialLinksMutation>;
export type ReorderSocialLinksMutationResult = ApolloReactCommon.MutationResult<ReorderSocialLinksMutation>;
export type ReorderSocialLinksMutationOptions = ApolloReactCommon.BaseMutationOptions<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>;
export const RequestPayoutDocument = gql`
    mutation RequestPayout {
  requestPayout {
    payoutId
    amount
    method
    status
    message
  }
}
    `;
export type RequestPayoutMutationFn = ApolloReactCommon.MutationFunction<RequestPayoutMutation, RequestPayoutMutationVariables>;

/**
 * __useRequestPayoutMutation__
 *
 * To run a mutation, you first call `useRequestPayoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestPayoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestPayoutMutation, { data, loading, error }] = useRequestPayoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useRequestPayoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RequestPayoutMutation, RequestPayoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RequestPayoutMutation, RequestPayoutMutationVariables>(RequestPayoutDocument, options);
      }
export type RequestPayoutMutationHookResult = ReturnType<typeof useRequestPayoutMutation>;
export type RequestPayoutMutationResult = ApolloReactCommon.MutationResult<RequestPayoutMutation>;
export type RequestPayoutMutationOptions = ApolloReactCommon.BaseMutationOptions<RequestPayoutMutation, RequestPayoutMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($data: ResetPasswordInput!) {
  resetPassword(data: $data)
}
    `;
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SetupPayoutMethodDocument = gql`
    mutation SetupPayoutMethod($data: SetupPayoutInput!) {
  setupPayoutMethod(data: $data) {
    method
    success
  }
}
    `;
export type SetupPayoutMethodMutationFn = ApolloReactCommon.MutationFunction<SetupPayoutMethodMutation, SetupPayoutMethodMutationVariables>;

/**
 * __useSetupPayoutMethodMutation__
 *
 * To run a mutation, you first call `useSetupPayoutMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetupPayoutMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setupPayoutMethodMutation, { data, loading, error }] = useSetupPayoutMethodMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSetupPayoutMethodMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetupPayoutMethodMutation, SetupPayoutMethodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetupPayoutMethodMutation, SetupPayoutMethodMutationVariables>(SetupPayoutMethodDocument, options);
      }
export type SetupPayoutMethodMutationHookResult = ReturnType<typeof useSetupPayoutMethodMutation>;
export type SetupPayoutMethodMutationResult = ApolloReactCommon.MutationResult<SetupPayoutMethodMutation>;
export type SetupPayoutMethodMutationOptions = ApolloReactCommon.BaseMutationOptions<SetupPayoutMethodMutation, SetupPayoutMethodMutationVariables>;
export const StartProcessingPayoutDocument = gql`
    mutation StartProcessingPayout($payoutId: String!) {
  startProcessingPayout(payoutId: $payoutId) {
    status
    success
  }
}
    `;
export type StartProcessingPayoutMutationFn = ApolloReactCommon.MutationFunction<StartProcessingPayoutMutation, StartProcessingPayoutMutationVariables>;

/**
 * __useStartProcessingPayoutMutation__
 *
 * To run a mutation, you first call `useStartProcessingPayoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartProcessingPayoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startProcessingPayoutMutation, { data, loading, error }] = useStartProcessingPayoutMutation({
 *   variables: {
 *      payoutId: // value for 'payoutId'
 *   },
 * });
 */
export function useStartProcessingPayoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StartProcessingPayoutMutation, StartProcessingPayoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<StartProcessingPayoutMutation, StartProcessingPayoutMutationVariables>(StartProcessingPayoutDocument, options);
      }
export type StartProcessingPayoutMutationHookResult = ReturnType<typeof useStartProcessingPayoutMutation>;
export type StartProcessingPayoutMutationResult = ApolloReactCommon.MutationResult<StartProcessingPayoutMutation>;
export type StartProcessingPayoutMutationOptions = ApolloReactCommon.BaseMutationOptions<StartProcessingPayoutMutation, StartProcessingPayoutMutationVariables>;
export const ToggleLikeProjectDocument = gql`
    mutation toggleLikeProject($projectId: String!) {
  toggleLike(projectId: $projectId) {
    id
    likes
    isLiked
    likedBy {
      id
      createdAt
      user {
        id
        displayName
        username
        avatar
      }
    }
  }
}
    `;
export type ToggleLikeProjectMutationFn = ApolloReactCommon.MutationFunction<ToggleLikeProjectMutation, ToggleLikeProjectMutationVariables>;

/**
 * __useToggleLikeProjectMutation__
 *
 * To run a mutation, you first call `useToggleLikeProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikeProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikeProjectMutation, { data, loading, error }] = useToggleLikeProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useToggleLikeProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToggleLikeProjectMutation, ToggleLikeProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ToggleLikeProjectMutation, ToggleLikeProjectMutationVariables>(ToggleLikeProjectDocument, options);
      }
export type ToggleLikeProjectMutationHookResult = ReturnType<typeof useToggleLikeProjectMutation>;
export type ToggleLikeProjectMutationResult = ApolloReactCommon.MutationResult<ToggleLikeProjectMutation>;
export type ToggleLikeProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<ToggleLikeProjectMutation, ToggleLikeProjectMutationVariables>;
export const UnfollowUserDocument = gql`
    mutation unfollowUser($channelId: String!) {
  unfollowUser(channelId: $channelId)
}
    `;
export type UnfollowUserMutationFn = ApolloReactCommon.MutationFunction<UnfollowUserMutation, UnfollowUserMutationVariables>;

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useUnfollowUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, options);
      }
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>;
export type UnfollowUserMutationResult = ApolloReactCommon.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const UpdateAlbumDocument = gql`
    mutation UpdateAlbum($data: UpdateAlbumInput!) {
  updateAlbum(data: $data) {
    thumbnailUrl
    title
    isPublic
    id
  }
}
    `;
export type UpdateAlbumMutationFn = ApolloReactCommon.MutationFunction<UpdateAlbumMutation, UpdateAlbumMutationVariables>;

/**
 * __useUpdateAlbumMutation__
 *
 * To run a mutation, you first call `useUpdateAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAlbumMutation, { data, loading, error }] = useUpdateAlbumMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateAlbumMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAlbumMutation, UpdateAlbumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateAlbumMutation, UpdateAlbumMutationVariables>(UpdateAlbumDocument, options);
      }
export type UpdateAlbumMutationHookResult = ReturnType<typeof useUpdateAlbumMutation>;
export type UpdateAlbumMutationResult = ApolloReactCommon.MutationResult<UpdateAlbumMutation>;
export type UpdateAlbumMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateAlbumMutation, UpdateAlbumMutationVariables>;
export const UpdateDonationTierDocument = gql`
    mutation UpdateDonationTier($data: UpdateDonationTierInput!) {
  updateDonationTier(data: $data) {
    id
    title
    description
    amount
    currency
    benefits
    isActive
    position
  }
}
    `;
export type UpdateDonationTierMutationFn = ApolloReactCommon.MutationFunction<UpdateDonationTierMutation, UpdateDonationTierMutationVariables>;

/**
 * __useUpdateDonationTierMutation__
 *
 * To run a mutation, you first call `useUpdateDonationTierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDonationTierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDonationTierMutation, { data, loading, error }] = useUpdateDonationTierMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateDonationTierMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateDonationTierMutation, UpdateDonationTierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateDonationTierMutation, UpdateDonationTierMutationVariables>(UpdateDonationTierDocument, options);
      }
export type UpdateDonationTierMutationHookResult = ReturnType<typeof useUpdateDonationTierMutation>;
export type UpdateDonationTierMutationResult = ApolloReactCommon.MutationResult<UpdateDonationTierMutation>;
export type UpdateDonationTierMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateDonationTierMutation, UpdateDonationTierMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($data: UpdateProjectInput!) {
  updateProject(data: $data) {
    albumId
    tags
    title
    description
    id
    views
    commentsCount
    likes
    media {
      mediaType
      projectId
      url
    }
    views
  }
}
    `;
export type UpdateProjectMutationFn = ApolloReactCommon.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = ApolloReactCommon.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const UpdateProjectCommentDocument = gql`
    mutation updateProjectComment($data: UpdateCommentInput!) {
  updateComment(data: $data) {
    id
    text
    updatedAt
  }
}
    `;
export type UpdateProjectCommentMutationFn = ApolloReactCommon.MutationFunction<UpdateProjectCommentMutation, UpdateProjectCommentMutationVariables>;

/**
 * __useUpdateProjectCommentMutation__
 *
 * To run a mutation, you first call `useUpdateProjectCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectCommentMutation, { data, loading, error }] = useUpdateProjectCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProjectCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProjectCommentMutation, UpdateProjectCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateProjectCommentMutation, UpdateProjectCommentMutationVariables>(UpdateProjectCommentDocument, options);
      }
export type UpdateProjectCommentMutationHookResult = ReturnType<typeof useUpdateProjectCommentMutation>;
export type UpdateProjectCommentMutationResult = ApolloReactCommon.MutationResult<UpdateProjectCommentMutation>;
export type UpdateProjectCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProjectCommentMutation, UpdateProjectCommentMutationVariables>;
export const UpdateSocialLinkDocument = gql`
    mutation UpdateSocialLink($id: String!, $data: SocialLinkInput!) {
  updateSocialLink(id: $id, data: $data)
}
    `;
export type UpdateSocialLinkMutationFn = ApolloReactCommon.MutationFunction<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>;

/**
 * __useUpdateSocialLinkMutation__
 *
 * To run a mutation, you first call `useUpdateSocialLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSocialLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSocialLinkMutation, { data, loading, error }] = useUpdateSocialLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSocialLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>(UpdateSocialLinkDocument, options);
      }
export type UpdateSocialLinkMutationHookResult = ReturnType<typeof useUpdateSocialLinkMutation>;
export type UpdateSocialLinkMutationResult = ApolloReactCommon.MutationResult<UpdateSocialLinkMutation>;
export type UpdateSocialLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>;
export const VerifyAccountDocument = gql`
    mutation VerifyAccount($data: VerificationInput!) {
  verifyAccount(data: $data) {
    email
    username
  }
}
    `;
export type VerifyAccountMutationFn = ApolloReactCommon.MutationFunction<VerifyAccountMutation, VerifyAccountMutationVariables>;

/**
 * __useVerifyAccountMutation__
 *
 * To run a mutation, you first call `useVerifyAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyAccountMutation, { data, loading, error }] = useVerifyAccountMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useVerifyAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyAccountMutation, VerifyAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<VerifyAccountMutation, VerifyAccountMutationVariables>(VerifyAccountDocument, options);
      }
export type VerifyAccountMutationHookResult = ReturnType<typeof useVerifyAccountMutation>;
export type VerifyAccountMutationResult = ApolloReactCommon.MutationResult<VerifyAccountMutation>;
export type VerifyAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<VerifyAccountMutation, VerifyAccountMutationVariables>;
export const SetProjectLikeDocument = gql`
    mutation setProjectLike($projectId: String!, $like: Boolean!) {
  setProjectLike(projectId: $projectId, like: $like) {
    id
    likes
    isLiked
    likedBy {
      id
      createdAt
      user {
        id
        username
        displayName
        avatar
      }
    }
  }
}
    `;
export type SetProjectLikeMutationFn = ApolloReactCommon.MutationFunction<SetProjectLikeMutation, SetProjectLikeMutationVariables>;

/**
 * __useSetProjectLikeMutation__
 *
 * To run a mutation, you first call `useSetProjectLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetProjectLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setProjectLikeMutation, { data, loading, error }] = useSetProjectLikeMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      like: // value for 'like'
 *   },
 * });
 */
export function useSetProjectLikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetProjectLikeMutation, SetProjectLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetProjectLikeMutation, SetProjectLikeMutationVariables>(SetProjectLikeDocument, options);
      }
export type SetProjectLikeMutationHookResult = ReturnType<typeof useSetProjectLikeMutation>;
export type SetProjectLikeMutationResult = ApolloReactCommon.MutationResult<SetProjectLikeMutation>;
export type SetProjectLikeMutationOptions = ApolloReactCommon.BaseMutationOptions<SetProjectLikeMutation, SetProjectLikeMutationVariables>;
export const FindAllAlbumsDocument = gql`
    query findAllAlbums($filter: FilterAlbumInput!) {
  findAllAlbums(filter: $filter) {
    data {
      id
      title
      projectCount
      thumbnailUrl
      isPublic
      user {
        avatar
        id
        username
      }
    }
    meta {
      limit
      page
      totalPages
      total
    }
  }
}
    `;

/**
 * __useFindAllAlbumsQuery__
 *
 * To run a query within a React component, call `useFindAllAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllAlbumsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFindAllAlbumsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<FindAllAlbumsQuery, FindAllAlbumsQueryVariables> & ({ variables: FindAllAlbumsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindAllAlbumsQuery, FindAllAlbumsQueryVariables>(FindAllAlbumsDocument, options);
      }
export function useFindAllAlbumsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindAllAlbumsQuery, FindAllAlbumsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindAllAlbumsQuery, FindAllAlbumsQueryVariables>(FindAllAlbumsDocument, options);
        }
// @ts-ignore
export function useFindAllAlbumsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindAllAlbumsQuery, FindAllAlbumsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindAllAlbumsQuery, FindAllAlbumsQueryVariables>;
export function useFindAllAlbumsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindAllAlbumsQuery, FindAllAlbumsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindAllAlbumsQuery | undefined, FindAllAlbumsQueryVariables>;
export function useFindAllAlbumsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindAllAlbumsQuery, FindAllAlbumsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindAllAlbumsQuery, FindAllAlbumsQueryVariables>(FindAllAlbumsDocument, options);
        }
export type FindAllAlbumsQueryHookResult = ReturnType<typeof useFindAllAlbumsQuery>;
export type FindAllAlbumsLazyQueryHookResult = ReturnType<typeof useFindAllAlbumsLazyQuery>;
export type FindAllAlbumsSuspenseQueryHookResult = ReturnType<typeof useFindAllAlbumsSuspenseQuery>;
export type FindAllAlbumsQueryResult = ApolloReactCommon.QueryResult<FindAllAlbumsQuery, FindAllAlbumsQueryVariables>;
export const FindAllProjectsDocument = gql`
    query findAllProjects($filter: FilterProjectInput!) {
  findAllProject(filter: $filter) {
    data {
      id
      title
      description
      likes
      views
      tags
      media {
        id
        url
        mediaType
      }
    }
    meta {
      limit
      page
      total
      totalPages
    }
  }
}
    `;

/**
 * __useFindAllProjectsQuery__
 *
 * To run a query within a React component, call `useFindAllProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllProjectsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFindAllProjectsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<FindAllProjectsQuery, FindAllProjectsQueryVariables> & ({ variables: FindAllProjectsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindAllProjectsQuery, FindAllProjectsQueryVariables>(FindAllProjectsDocument, options);
      }
export function useFindAllProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindAllProjectsQuery, FindAllProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindAllProjectsQuery, FindAllProjectsQueryVariables>(FindAllProjectsDocument, options);
        }
// @ts-ignore
export function useFindAllProjectsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindAllProjectsQuery, FindAllProjectsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindAllProjectsQuery, FindAllProjectsQueryVariables>;
export function useFindAllProjectsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindAllProjectsQuery, FindAllProjectsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindAllProjectsQuery | undefined, FindAllProjectsQueryVariables>;
export function useFindAllProjectsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindAllProjectsQuery, FindAllProjectsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindAllProjectsQuery, FindAllProjectsQueryVariables>(FindAllProjectsDocument, options);
        }
export type FindAllProjectsQueryHookResult = ReturnType<typeof useFindAllProjectsQuery>;
export type FindAllProjectsLazyQueryHookResult = ReturnType<typeof useFindAllProjectsLazyQuery>;
export type FindAllProjectsSuspenseQueryHookResult = ReturnType<typeof useFindAllProjectsSuspenseQuery>;
export type FindAllProjectsQueryResult = ApolloReactCommon.QueryResult<FindAllProjectsQuery, FindAllProjectsQueryVariables>;
export const FindCommentsByProjectDocument = gql`
    query findCommentsByProject($projectId: String!, $page: Int!, $limit: Int!) {
  findCommentByProject(
    filter: {projectId: $projectId, page: $page, limit: $limit}
  ) {
    data {
      id
      text
      createdAt
      repliesCount
      user {
        id
        username
        avatar
      }
    }
    meta {
      page
      limit
      total
      totalPages
    }
  }
}
    `;

/**
 * __useFindCommentsByProjectQuery__
 *
 * To run a query within a React component, call `useFindCommentsByProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCommentsByProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCommentsByProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFindCommentsByProjectQuery(baseOptions: ApolloReactHooks.QueryHookOptions<FindCommentsByProjectQuery, FindCommentsByProjectQueryVariables> & ({ variables: FindCommentsByProjectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindCommentsByProjectQuery, FindCommentsByProjectQueryVariables>(FindCommentsByProjectDocument, options);
      }
export function useFindCommentsByProjectLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindCommentsByProjectQuery, FindCommentsByProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindCommentsByProjectQuery, FindCommentsByProjectQueryVariables>(FindCommentsByProjectDocument, options);
        }
// @ts-ignore
export function useFindCommentsByProjectSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindCommentsByProjectQuery, FindCommentsByProjectQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindCommentsByProjectQuery, FindCommentsByProjectQueryVariables>;
export function useFindCommentsByProjectSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindCommentsByProjectQuery, FindCommentsByProjectQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindCommentsByProjectQuery | undefined, FindCommentsByProjectQueryVariables>;
export function useFindCommentsByProjectSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindCommentsByProjectQuery, FindCommentsByProjectQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindCommentsByProjectQuery, FindCommentsByProjectQueryVariables>(FindCommentsByProjectDocument, options);
        }
export type FindCommentsByProjectQueryHookResult = ReturnType<typeof useFindCommentsByProjectQuery>;
export type FindCommentsByProjectLazyQueryHookResult = ReturnType<typeof useFindCommentsByProjectLazyQuery>;
export type FindCommentsByProjectSuspenseQueryHookResult = ReturnType<typeof useFindCommentsByProjectSuspenseQuery>;
export type FindCommentsByProjectQueryResult = ApolloReactCommon.QueryResult<FindCommentsByProjectQuery, FindCommentsByProjectQueryVariables>;
export const FindFollowersDocument = gql`
    query findFollowers($data: FindFollowers!) {
  findFollowers(data: $data) {
    data {
      follower {
        id
        username
        avatar
      }
      followerId
    }
    meta {
      limit
      page
      total
      totalPages
    }
  }
}
    `;

/**
 * __useFindFollowersQuery__
 *
 * To run a query within a React component, call `useFindFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFollowersQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFindFollowersQuery(baseOptions: ApolloReactHooks.QueryHookOptions<FindFollowersQuery, FindFollowersQueryVariables> & ({ variables: FindFollowersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindFollowersQuery, FindFollowersQueryVariables>(FindFollowersDocument, options);
      }
export function useFindFollowersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindFollowersQuery, FindFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindFollowersQuery, FindFollowersQueryVariables>(FindFollowersDocument, options);
        }
// @ts-ignore
export function useFindFollowersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindFollowersQuery, FindFollowersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindFollowersQuery, FindFollowersQueryVariables>;
export function useFindFollowersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindFollowersQuery, FindFollowersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindFollowersQuery | undefined, FindFollowersQueryVariables>;
export function useFindFollowersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindFollowersQuery, FindFollowersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindFollowersQuery, FindFollowersQueryVariables>(FindFollowersDocument, options);
        }
export type FindFollowersQueryHookResult = ReturnType<typeof useFindFollowersQuery>;
export type FindFollowersLazyQueryHookResult = ReturnType<typeof useFindFollowersLazyQuery>;
export type FindFollowersSuspenseQueryHookResult = ReturnType<typeof useFindFollowersSuspenseQuery>;
export type FindFollowersQueryResult = ApolloReactCommon.QueryResult<FindFollowersQuery, FindFollowersQueryVariables>;
export const FindFollowingsDocument = gql`
    query findFollowings($data: FindFollowings!) {
  findFollowings(data: $data) {
    data {
      following {
        id
        avatar
        username
      }
      followingId
    }
    meta {
      limit
      page
      total
      totalPages
    }
  }
}
    `;

/**
 * __useFindFollowingsQuery__
 *
 * To run a query within a React component, call `useFindFollowingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFollowingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFollowingsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFindFollowingsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<FindFollowingsQuery, FindFollowingsQueryVariables> & ({ variables: FindFollowingsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindFollowingsQuery, FindFollowingsQueryVariables>(FindFollowingsDocument, options);
      }
export function useFindFollowingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindFollowingsQuery, FindFollowingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindFollowingsQuery, FindFollowingsQueryVariables>(FindFollowingsDocument, options);
        }
// @ts-ignore
export function useFindFollowingsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindFollowingsQuery, FindFollowingsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindFollowingsQuery, FindFollowingsQueryVariables>;
export function useFindFollowingsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindFollowingsQuery, FindFollowingsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindFollowingsQuery | undefined, FindFollowingsQueryVariables>;
export function useFindFollowingsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindFollowingsQuery, FindFollowingsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindFollowingsQuery, FindFollowingsQueryVariables>(FindFollowingsDocument, options);
        }
export type FindFollowingsQueryHookResult = ReturnType<typeof useFindFollowingsQuery>;
export type FindFollowingsLazyQueryHookResult = ReturnType<typeof useFindFollowingsLazyQuery>;
export type FindFollowingsSuspenseQueryHookResult = ReturnType<typeof useFindFollowingsSuspenseQuery>;
export type FindFollowingsQueryResult = ApolloReactCommon.QueryResult<FindFollowingsQuery, FindFollowingsQueryVariables>;
export const FindNotificationsByUserDocument = gql`
    query FindNotificationsByUser($page: Int, $limit: Int) {
  findNotificationsByUser(data: {page: $page, limit: $limit}) {
    data {
      id
      message
      type
      isRead
      createdAt
      actorId
      albumId
      projectId
      commentId
    }
    meta {
      page
      limit
      total
      totalPages
    }
  }
}
    `;

/**
 * __useFindNotificationsByUserQuery__
 *
 * To run a query within a React component, call `useFindNotificationsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindNotificationsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindNotificationsByUserQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFindNotificationsByUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>(FindNotificationsByUserDocument, options);
      }
export function useFindNotificationsByUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>(FindNotificationsByUserDocument, options);
        }
// @ts-ignore
export function useFindNotificationsByUserSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>;
export function useFindNotificationsByUserSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindNotificationsByUserQuery | undefined, FindNotificationsByUserQueryVariables>;
export function useFindNotificationsByUserSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>(FindNotificationsByUserDocument, options);
        }
export type FindNotificationsByUserQueryHookResult = ReturnType<typeof useFindNotificationsByUserQuery>;
export type FindNotificationsByUserLazyQueryHookResult = ReturnType<typeof useFindNotificationsByUserLazyQuery>;
export type FindNotificationsByUserSuspenseQueryHookResult = ReturnType<typeof useFindNotificationsByUserSuspenseQuery>;
export type FindNotificationsByUserQueryResult = ApolloReactCommon.QueryResult<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>;
export const FindOneAlbumDocument = gql`
    query findOneAlbum($id: String!) {
  findOne(id: $id) {
    id
    title
    thumbnailUrl
    isPublic
    projects {
      id
      title
      isPublic
      likes
      commentsCount
      tags
      media {
        id
        mediaType
        url
      }
    }
    user {
      id
      username
      avatar
    }
  }
}
    `;

/**
 * __useFindOneAlbumQuery__
 *
 * To run a query within a React component, call `useFindOneAlbumQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneAlbumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneAlbumQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneAlbumQuery(baseOptions: ApolloReactHooks.QueryHookOptions<FindOneAlbumQuery, FindOneAlbumQueryVariables> & ({ variables: FindOneAlbumQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindOneAlbumQuery, FindOneAlbumQueryVariables>(FindOneAlbumDocument, options);
      }
export function useFindOneAlbumLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindOneAlbumQuery, FindOneAlbumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindOneAlbumQuery, FindOneAlbumQueryVariables>(FindOneAlbumDocument, options);
        }
// @ts-ignore
export function useFindOneAlbumSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindOneAlbumQuery, FindOneAlbumQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindOneAlbumQuery, FindOneAlbumQueryVariables>;
export function useFindOneAlbumSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindOneAlbumQuery, FindOneAlbumQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindOneAlbumQuery | undefined, FindOneAlbumQueryVariables>;
export function useFindOneAlbumSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindOneAlbumQuery, FindOneAlbumQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindOneAlbumQuery, FindOneAlbumQueryVariables>(FindOneAlbumDocument, options);
        }
export type FindOneAlbumQueryHookResult = ReturnType<typeof useFindOneAlbumQuery>;
export type FindOneAlbumLazyQueryHookResult = ReturnType<typeof useFindOneAlbumLazyQuery>;
export type FindOneAlbumSuspenseQueryHookResult = ReturnType<typeof useFindOneAlbumSuspenseQuery>;
export type FindOneAlbumQueryResult = ApolloReactCommon.QueryResult<FindOneAlbumQuery, FindOneAlbumQueryVariables>;
export const FindOneProjectDocument = gql`
    query findOneProject($projectId: String!) {
  findOneProject(projectId: $projectId) {
    id
    title
    description
    likes
    album {
      id
      title
      user {
        avatar
        id
        username
        isFollowing
        followers
      }
    }
    albumId
    isLiked
    likedBy {
      id
      createdAt
      user {
        id
        displayName
        username
        avatar
      }
    }
    views
    tags
    media {
      id
      url
      mediaType
    }
  }
}
    `;

/**
 * __useFindOneProjectQuery__
 *
 * To run a query within a React component, call `useFindOneProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useFindOneProjectQuery(baseOptions: ApolloReactHooks.QueryHookOptions<FindOneProjectQuery, FindOneProjectQueryVariables> & ({ variables: FindOneProjectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindOneProjectQuery, FindOneProjectQueryVariables>(FindOneProjectDocument, options);
      }
export function useFindOneProjectLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindOneProjectQuery, FindOneProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindOneProjectQuery, FindOneProjectQueryVariables>(FindOneProjectDocument, options);
        }
// @ts-ignore
export function useFindOneProjectSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindOneProjectQuery, FindOneProjectQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindOneProjectQuery, FindOneProjectQueryVariables>;
export function useFindOneProjectSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindOneProjectQuery, FindOneProjectQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindOneProjectQuery | undefined, FindOneProjectQueryVariables>;
export function useFindOneProjectSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindOneProjectQuery, FindOneProjectQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindOneProjectQuery, FindOneProjectQueryVariables>(FindOneProjectDocument, options);
        }
export type FindOneProjectQueryHookResult = ReturnType<typeof useFindOneProjectQuery>;
export type FindOneProjectLazyQueryHookResult = ReturnType<typeof useFindOneProjectLazyQuery>;
export type FindOneProjectSuspenseQueryHookResult = ReturnType<typeof useFindOneProjectSuspenseQuery>;
export type FindOneProjectQueryResult = ApolloReactCommon.QueryResult<FindOneProjectQuery, FindOneProjectQueryVariables>;
export const PopularTagsDocument = gql`
    query popularTags($limit: Int!) {
  popularTags(limit: $limit) {
    count
    tag
  }
}
    `;

/**
 * __usePopularTagsQuery__
 *
 * To run a query within a React component, call `usePopularTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePopularTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePopularTagsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePopularTagsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<PopularTagsQuery, PopularTagsQueryVariables> & ({ variables: PopularTagsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PopularTagsQuery, PopularTagsQueryVariables>(PopularTagsDocument, options);
      }
export function usePopularTagsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PopularTagsQuery, PopularTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PopularTagsQuery, PopularTagsQueryVariables>(PopularTagsDocument, options);
        }
// @ts-ignore
export function usePopularTagsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PopularTagsQuery, PopularTagsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PopularTagsQuery, PopularTagsQueryVariables>;
export function usePopularTagsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PopularTagsQuery, PopularTagsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PopularTagsQuery | undefined, PopularTagsQueryVariables>;
export function usePopularTagsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PopularTagsQuery, PopularTagsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PopularTagsQuery, PopularTagsQueryVariables>(PopularTagsDocument, options);
        }
export type PopularTagsQueryHookResult = ReturnType<typeof usePopularTagsQuery>;
export type PopularTagsLazyQueryHookResult = ReturnType<typeof usePopularTagsLazyQuery>;
export type PopularTagsSuspenseQueryHookResult = ReturnType<typeof usePopularTagsSuspenseQuery>;
export type PopularTagsQueryResult = ApolloReactCommon.QueryResult<PopularTagsQuery, PopularTagsQueryVariables>;
export const FindProfileDocument = gql`
    query FindProfile {
  findProfile {
    username
    email
    isVerified
    avatar
    bio
    displayName
    id
    isEmailVerified
    notificationsSettings {
      siteNotifications
      pushNotifications
    }
    isTotpEnabled
    projectLikes
    socialLink {
      id
      title
      url
      position
    }
  }
}
    `;

/**
 * __useFindProfileQuery__
 *
 * To run a query within a React component, call `useFindProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindProfileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
      }
export function useFindProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
        }
// @ts-ignore
export function useFindProfileSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindProfileQuery, FindProfileQueryVariables>;
export function useFindProfileSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindProfileQuery | undefined, FindProfileQueryVariables>;
export function useFindProfileSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
        }
export type FindProfileQueryHookResult = ReturnType<typeof useFindProfileQuery>;
export type FindProfileLazyQueryHookResult = ReturnType<typeof useFindProfileLazyQuery>;
export type FindProfileSuspenseQueryHookResult = ReturnType<typeof useFindProfileSuspenseQuery>;
export type FindProfileQueryResult = ApolloReactCommon.QueryResult<FindProfileQuery, FindProfileQueryVariables>;
export const FindSessionsByUserDocument = gql`
    query FindSessionsByUser {
  findSessionByUser {
    id
    createdAt
    isCurrent
    metadata {
      ip
      device {
        browser
        os
        type
      }
      location {
        country
        city
      }
    }
  }
}
    `;

/**
 * __useFindSessionsByUserQuery__
 *
 * To run a query within a React component, call `useFindSessionsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSessionsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSessionsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindSessionsByUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
      }
export function useFindSessionsByUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
        }
// @ts-ignore
export function useFindSessionsByUserSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>;
export function useFindSessionsByUserSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindSessionsByUserQuery | undefined, FindSessionsByUserQueryVariables>;
export function useFindSessionsByUserSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
        }
export type FindSessionsByUserQueryHookResult = ReturnType<typeof useFindSessionsByUserQuery>;
export type FindSessionsByUserLazyQueryHookResult = ReturnType<typeof useFindSessionsByUserLazyQuery>;
export type FindSessionsByUserSuspenseQueryHookResult = ReturnType<typeof useFindSessionsByUserSuspenseQuery>;
export type FindSessionsByUserQueryResult = ApolloReactCommon.QueryResult<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>;
export const FindSocialMediaDocument = gql`
    query findSocialMedia {
  findSocialMedia {
    title
    url
    position
    id
  }
}
    `;

/**
 * __useFindSocialMediaQuery__
 *
 * To run a query within a React component, call `useFindSocialMediaQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSocialMediaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSocialMediaQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindSocialMediaQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindSocialMediaQuery, FindSocialMediaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindSocialMediaQuery, FindSocialMediaQueryVariables>(FindSocialMediaDocument, options);
      }
export function useFindSocialMediaLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindSocialMediaQuery, FindSocialMediaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindSocialMediaQuery, FindSocialMediaQueryVariables>(FindSocialMediaDocument, options);
        }
// @ts-ignore
export function useFindSocialMediaSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindSocialMediaQuery, FindSocialMediaQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindSocialMediaQuery, FindSocialMediaQueryVariables>;
export function useFindSocialMediaSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindSocialMediaQuery, FindSocialMediaQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindSocialMediaQuery | undefined, FindSocialMediaQueryVariables>;
export function useFindSocialMediaSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindSocialMediaQuery, FindSocialMediaQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindSocialMediaQuery, FindSocialMediaQueryVariables>(FindSocialMediaDocument, options);
        }
export type FindSocialMediaQueryHookResult = ReturnType<typeof useFindSocialMediaQuery>;
export type FindSocialMediaLazyQueryHookResult = ReturnType<typeof useFindSocialMediaLazyQuery>;
export type FindSocialMediaSuspenseQueryHookResult = ReturnType<typeof useFindSocialMediaSuspenseQuery>;
export type FindSocialMediaQueryResult = ApolloReactCommon.QueryResult<FindSocialMediaQuery, FindSocialMediaQueryVariables>;
export const FindNotificationsUnreadCountDocument = gql`
    query findNotificationsUnreadCount {
  findNotificationsUnreadCount
}
    `;

/**
 * __useFindNotificationsUnreadCountQuery__
 *
 * To run a query within a React component, call `useFindNotificationsUnreadCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindNotificationsUnreadCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindNotificationsUnreadCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindNotificationsUnreadCountQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>(FindNotificationsUnreadCountDocument, options);
      }
export function useFindNotificationsUnreadCountLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>(FindNotificationsUnreadCountDocument, options);
        }
// @ts-ignore
export function useFindNotificationsUnreadCountSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>;
export function useFindNotificationsUnreadCountSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindNotificationsUnreadCountQuery | undefined, FindNotificationsUnreadCountQueryVariables>;
export function useFindNotificationsUnreadCountSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>(FindNotificationsUnreadCountDocument, options);
        }
export type FindNotificationsUnreadCountQueryHookResult = ReturnType<typeof useFindNotificationsUnreadCountQuery>;
export type FindNotificationsUnreadCountLazyQueryHookResult = ReturnType<typeof useFindNotificationsUnreadCountLazyQuery>;
export type FindNotificationsUnreadCountSuspenseQueryHookResult = ReturnType<typeof useFindNotificationsUnreadCountSuspenseQuery>;
export type FindNotificationsUnreadCountQueryResult = ApolloReactCommon.QueryResult<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>;
export const GenerateTotpSecretDocument = gql`
    query GenerateTotpSecret {
  generateTotpSecret {
    qrcodeUrl
    secret
  }
}
    `;

/**
 * __useGenerateTotpSecretQuery__
 *
 * To run a query within a React component, call `useGenerateTotpSecretQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateTotpSecretQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateTotpSecretQuery({
 *   variables: {
 *   },
 * });
 */
export function useGenerateTotpSecretQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
      }
export function useGenerateTotpSecretLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
        }
// @ts-ignore
export function useGenerateTotpSecretSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>;
export function useGenerateTotpSecretSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GenerateTotpSecretQuery | undefined, GenerateTotpSecretQueryVariables>;
export function useGenerateTotpSecretSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
        }
export type GenerateTotpSecretQueryHookResult = ReturnType<typeof useGenerateTotpSecretQuery>;
export type GenerateTotpSecretLazyQueryHookResult = ReturnType<typeof useGenerateTotpSecretLazyQuery>;
export type GenerateTotpSecretSuspenseQueryHookResult = ReturnType<typeof useGenerateTotpSecretSuspenseQuery>;
export type GenerateTotpSecretQueryResult = ApolloReactCommon.QueryResult<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>;
export const GetAllPayoutsDocument = gql`
    query GetAllPayouts($data: HistoryPaymentInput!) {
  getAllPayouts(data: $data) {
    data {
      id
      amount
      status
      createdAt
      user {
        id
        username
      }
      payoutDetails {
        method
        phone
        card
        iban
      }
    }
    meta {
      page
      limit
      total
      totalPages
    }
  }
}
    `;

/**
 * __useGetAllPayoutsQuery__
 *
 * To run a query within a React component, call `useGetAllPayoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPayoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPayoutsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetAllPayoutsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetAllPayoutsQuery, GetAllPayoutsQueryVariables> & ({ variables: GetAllPayoutsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllPayoutsQuery, GetAllPayoutsQueryVariables>(GetAllPayoutsDocument, options);
      }
export function useGetAllPayoutsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllPayoutsQuery, GetAllPayoutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllPayoutsQuery, GetAllPayoutsQueryVariables>(GetAllPayoutsDocument, options);
        }
// @ts-ignore
export function useGetAllPayoutsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetAllPayoutsQuery, GetAllPayoutsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetAllPayoutsQuery, GetAllPayoutsQueryVariables>;
export function useGetAllPayoutsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllPayoutsQuery, GetAllPayoutsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetAllPayoutsQuery | undefined, GetAllPayoutsQueryVariables>;
export function useGetAllPayoutsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllPayoutsQuery, GetAllPayoutsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAllPayoutsQuery, GetAllPayoutsQueryVariables>(GetAllPayoutsDocument, options);
        }
export type GetAllPayoutsQueryHookResult = ReturnType<typeof useGetAllPayoutsQuery>;
export type GetAllPayoutsLazyQueryHookResult = ReturnType<typeof useGetAllPayoutsLazyQuery>;
export type GetAllPayoutsSuspenseQueryHookResult = ReturnType<typeof useGetAllPayoutsSuspenseQuery>;
export type GetAllPayoutsQueryResult = ApolloReactCommon.QueryResult<GetAllPayoutsQuery, GetAllPayoutsQueryVariables>;
export const GetBalanceDocument = gql`
    query GetBalance {
  getBalance {
    availableBalance
    totalPaidOut
    totalReceived
  }
}
    `;

/**
 * __useGetBalanceQuery__
 *
 * To run a query within a React component, call `useGetBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBalanceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBalanceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBalanceQuery, GetBalanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBalanceQuery, GetBalanceQueryVariables>(GetBalanceDocument, options);
      }
export function useGetBalanceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBalanceQuery, GetBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBalanceQuery, GetBalanceQueryVariables>(GetBalanceDocument, options);
        }
// @ts-ignore
export function useGetBalanceSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetBalanceQuery, GetBalanceQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetBalanceQuery, GetBalanceQueryVariables>;
export function useGetBalanceSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetBalanceQuery, GetBalanceQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetBalanceQuery | undefined, GetBalanceQueryVariables>;
export function useGetBalanceSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetBalanceQuery, GetBalanceQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetBalanceQuery, GetBalanceQueryVariables>(GetBalanceDocument, options);
        }
export type GetBalanceQueryHookResult = ReturnType<typeof useGetBalanceQuery>;
export type GetBalanceLazyQueryHookResult = ReturnType<typeof useGetBalanceLazyQuery>;
export type GetBalanceSuspenseQueryHookResult = ReturnType<typeof useGetBalanceSuspenseQuery>;
export type GetBalanceQueryResult = ApolloReactCommon.QueryResult<GetBalanceQuery, GetBalanceQueryVariables>;
export const GetChannelDocument = gql`
    query getChannel($username: String!) {
  getChannel(username: $username) {
    avatar
    id
    username
    bio
    displayName
    createdAt
    isFollowing
    socialLinks {
      id
      title
      url
      position
    }
    stats {
      albumsCount
      followersCount
      followingCount
      projectsCount
      totalLikes
      totalViews
    }
    albums {
      id
      isPublic
      projectsCount
      thumbnailUrl
      title
    }
    projects {
      id
      title
      description
      isPublic
      tags
      commentsCount
      thumbnailUrl
      views
      likes
      media {
        id
        url
        mediaType
      }
    }
  }
}
    `;

/**
 * __useGetChannelQuery__
 *
 * To run a query within a React component, call `useGetChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetChannelQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetChannelQuery, GetChannelQueryVariables> & ({ variables: GetChannelQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetChannelQuery, GetChannelQueryVariables>(GetChannelDocument, options);
      }
export function useGetChannelLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetChannelQuery, GetChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetChannelQuery, GetChannelQueryVariables>(GetChannelDocument, options);
        }
// @ts-ignore
export function useGetChannelSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetChannelQuery, GetChannelQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetChannelQuery, GetChannelQueryVariables>;
export function useGetChannelSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetChannelQuery, GetChannelQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetChannelQuery | undefined, GetChannelQueryVariables>;
export function useGetChannelSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetChannelQuery, GetChannelQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetChannelQuery, GetChannelQueryVariables>(GetChannelDocument, options);
        }
export type GetChannelQueryHookResult = ReturnType<typeof useGetChannelQuery>;
export type GetChannelLazyQueryHookResult = ReturnType<typeof useGetChannelLazyQuery>;
export type GetChannelSuspenseQueryHookResult = ReturnType<typeof useGetChannelSuspenseQuery>;
export type GetChannelQueryResult = ApolloReactCommon.QueryResult<GetChannelQuery, GetChannelQueryVariables>;
export const GetChatMessagesDocument = gql`
    query GetChatMessages($data: getChatMessagesInput!) {
  getChatMessages(data: $data) {
    data {
      id
      chatId
      senderId
      text
      isRead
      isEdited
      createdAt
      sender {
        id
        username
        displayName
        avatar
      }
    }
    meta {
      total
      totalPages
      page
      limit
    }
  }
}
    `;

/**
 * __useGetChatMessagesQuery__
 *
 * To run a query within a React component, call `useGetChatMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatMessagesQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetChatMessagesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables> & ({ variables: GetChatMessagesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, options);
      }
export function useGetChatMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, options);
        }
// @ts-ignore
export function useGetChatMessagesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetChatMessagesQuery, GetChatMessagesQueryVariables>;
export function useGetChatMessagesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetChatMessagesQuery | undefined, GetChatMessagesQueryVariables>;
export function useGetChatMessagesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, options);
        }
export type GetChatMessagesQueryHookResult = ReturnType<typeof useGetChatMessagesQuery>;
export type GetChatMessagesLazyQueryHookResult = ReturnType<typeof useGetChatMessagesLazyQuery>;
export type GetChatMessagesSuspenseQueryHookResult = ReturnType<typeof useGetChatMessagesSuspenseQuery>;
export type GetChatMessagesQueryResult = ApolloReactCommon.QueryResult<GetChatMessagesQuery, GetChatMessagesQueryVariables>;
export const GetDonationStatsDocument = gql`
    query GetDonationStats {
  getDonationStats {
    donationsGivenCount
    donationsReceivedCount
    totalGiven
    totalReceived
    uniqueDonorsCount
  }
}
    `;

/**
 * __useGetDonationStatsQuery__
 *
 * To run a query within a React component, call `useGetDonationStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDonationStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDonationStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDonationStatsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDonationStatsQuery, GetDonationStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetDonationStatsQuery, GetDonationStatsQueryVariables>(GetDonationStatsDocument, options);
      }
export function useGetDonationStatsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDonationStatsQuery, GetDonationStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetDonationStatsQuery, GetDonationStatsQueryVariables>(GetDonationStatsDocument, options);
        }
// @ts-ignore
export function useGetDonationStatsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetDonationStatsQuery, GetDonationStatsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetDonationStatsQuery, GetDonationStatsQueryVariables>;
export function useGetDonationStatsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetDonationStatsQuery, GetDonationStatsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetDonationStatsQuery | undefined, GetDonationStatsQueryVariables>;
export function useGetDonationStatsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetDonationStatsQuery, GetDonationStatsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetDonationStatsQuery, GetDonationStatsQueryVariables>(GetDonationStatsDocument, options);
        }
export type GetDonationStatsQueryHookResult = ReturnType<typeof useGetDonationStatsQuery>;
export type GetDonationStatsLazyQueryHookResult = ReturnType<typeof useGetDonationStatsLazyQuery>;
export type GetDonationStatsSuspenseQueryHookResult = ReturnType<typeof useGetDonationStatsSuspenseQuery>;
export type GetDonationStatsQueryResult = ApolloReactCommon.QueryResult<GetDonationStatsQuery, GetDonationStatsQueryVariables>;
export const GetEarnOnFeeDocument = gql`
    query GetEarnOnFee {
  getEarnOnFee {
    totalPlatformFee
    totalReceived
  }
}
    `;

/**
 * __useGetEarnOnFeeQuery__
 *
 * To run a query within a React component, call `useGetEarnOnFeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEarnOnFeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEarnOnFeeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEarnOnFeeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetEarnOnFeeQuery, GetEarnOnFeeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetEarnOnFeeQuery, GetEarnOnFeeQueryVariables>(GetEarnOnFeeDocument, options);
      }
export function useGetEarnOnFeeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEarnOnFeeQuery, GetEarnOnFeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetEarnOnFeeQuery, GetEarnOnFeeQueryVariables>(GetEarnOnFeeDocument, options);
        }
// @ts-ignore
export function useGetEarnOnFeeSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetEarnOnFeeQuery, GetEarnOnFeeQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetEarnOnFeeQuery, GetEarnOnFeeQueryVariables>;
export function useGetEarnOnFeeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetEarnOnFeeQuery, GetEarnOnFeeQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetEarnOnFeeQuery | undefined, GetEarnOnFeeQueryVariables>;
export function useGetEarnOnFeeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetEarnOnFeeQuery, GetEarnOnFeeQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetEarnOnFeeQuery, GetEarnOnFeeQueryVariables>(GetEarnOnFeeDocument, options);
        }
export type GetEarnOnFeeQueryHookResult = ReturnType<typeof useGetEarnOnFeeQuery>;
export type GetEarnOnFeeLazyQueryHookResult = ReturnType<typeof useGetEarnOnFeeLazyQuery>;
export type GetEarnOnFeeSuspenseQueryHookResult = ReturnType<typeof useGetEarnOnFeeSuspenseQuery>;
export type GetEarnOnFeeQueryResult = ApolloReactCommon.QueryResult<GetEarnOnFeeQuery, GetEarnOnFeeQueryVariables>;
export const GetMyChatsDocument = gql`
    query GetMyChats {
  getMyChats {
    id
    unreadCount
    updatedAt
    lastMessage {
      id
      text
      createdAt
      senderId
    }
    members {
      id
      username
      displayName
      avatar
      isOnline
      lastSeenAt
    }
  }
}
    `;

/**
 * __useGetMyChatsQuery__
 *
 * To run a query within a React component, call `useGetMyChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyChatsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyChatsQuery, GetMyChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMyChatsQuery, GetMyChatsQueryVariables>(GetMyChatsDocument, options);
      }
export function useGetMyChatsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyChatsQuery, GetMyChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMyChatsQuery, GetMyChatsQueryVariables>(GetMyChatsDocument, options);
        }
// @ts-ignore
export function useGetMyChatsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetMyChatsQuery, GetMyChatsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMyChatsQuery, GetMyChatsQueryVariables>;
export function useGetMyChatsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyChatsQuery, GetMyChatsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMyChatsQuery | undefined, GetMyChatsQueryVariables>;
export function useGetMyChatsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyChatsQuery, GetMyChatsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMyChatsQuery, GetMyChatsQueryVariables>(GetMyChatsDocument, options);
        }
export type GetMyChatsQueryHookResult = ReturnType<typeof useGetMyChatsQuery>;
export type GetMyChatsLazyQueryHookResult = ReturnType<typeof useGetMyChatsLazyQuery>;
export type GetMyChatsSuspenseQueryHookResult = ReturnType<typeof useGetMyChatsSuspenseQuery>;
export type GetMyChatsQueryResult = ApolloReactCommon.QueryResult<GetMyChatsQuery, GetMyChatsQueryVariables>;
export const GetPaymentHistoryDocument = gql`
    query GetPaymentHistory($data: HistoryPaymentInput!) {
  getPaymentHistory(data: $data) {
    data {
      id
      amount
      currency
      status
      paymentMethod
      isAnonymous
      message
      createdAt
      paidAt
      donor {
        id
        username
        displayName
        avatar
      }
      recipient {
        id
        username
        displayName
        avatar
      }
    }
    meta {
      total
      page
      limit
      totalPages
    }
  }
}
    `;

/**
 * __useGetPaymentHistoryQuery__
 *
 * To run a query within a React component, call `useGetPaymentHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentHistoryQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetPaymentHistoryQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPaymentHistoryQuery, GetPaymentHistoryQueryVariables> & ({ variables: GetPaymentHistoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPaymentHistoryQuery, GetPaymentHistoryQueryVariables>(GetPaymentHistoryDocument, options);
      }
export function useGetPaymentHistoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPaymentHistoryQuery, GetPaymentHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPaymentHistoryQuery, GetPaymentHistoryQueryVariables>(GetPaymentHistoryDocument, options);
        }
// @ts-ignore
export function useGetPaymentHistorySuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetPaymentHistoryQuery, GetPaymentHistoryQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetPaymentHistoryQuery, GetPaymentHistoryQueryVariables>;
export function useGetPaymentHistorySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetPaymentHistoryQuery, GetPaymentHistoryQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetPaymentHistoryQuery | undefined, GetPaymentHistoryQueryVariables>;
export function useGetPaymentHistorySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetPaymentHistoryQuery, GetPaymentHistoryQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPaymentHistoryQuery, GetPaymentHistoryQueryVariables>(GetPaymentHistoryDocument, options);
        }
export type GetPaymentHistoryQueryHookResult = ReturnType<typeof useGetPaymentHistoryQuery>;
export type GetPaymentHistoryLazyQueryHookResult = ReturnType<typeof useGetPaymentHistoryLazyQuery>;
export type GetPaymentHistorySuspenseQueryHookResult = ReturnType<typeof useGetPaymentHistorySuspenseQuery>;
export type GetPaymentHistoryQueryResult = ApolloReactCommon.QueryResult<GetPaymentHistoryQuery, GetPaymentHistoryQueryVariables>;
export const GetPayoutHistoryDocument = gql`
    query GetPayoutHistory($data: HistoryPaymentInput) {
  getPayoutHistory(data: $data) {
    data {
      id
      amount
      method
      status
      createdAt
      processedAt
      failureReason
      transactionId
    }
    meta {
      page
      limit
      total
      totalPages
    }
  }
}
    `;

/**
 * __useGetPayoutHistoryQuery__
 *
 * To run a query within a React component, call `useGetPayoutHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPayoutHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPayoutHistoryQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetPayoutHistoryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPayoutHistoryQuery, GetPayoutHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPayoutHistoryQuery, GetPayoutHistoryQueryVariables>(GetPayoutHistoryDocument, options);
      }
export function useGetPayoutHistoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPayoutHistoryQuery, GetPayoutHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPayoutHistoryQuery, GetPayoutHistoryQueryVariables>(GetPayoutHistoryDocument, options);
        }
// @ts-ignore
export function useGetPayoutHistorySuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetPayoutHistoryQuery, GetPayoutHistoryQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetPayoutHistoryQuery, GetPayoutHistoryQueryVariables>;
export function useGetPayoutHistorySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetPayoutHistoryQuery, GetPayoutHistoryQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetPayoutHistoryQuery | undefined, GetPayoutHistoryQueryVariables>;
export function useGetPayoutHistorySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetPayoutHistoryQuery, GetPayoutHistoryQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPayoutHistoryQuery, GetPayoutHistoryQueryVariables>(GetPayoutHistoryDocument, options);
        }
export type GetPayoutHistoryQueryHookResult = ReturnType<typeof useGetPayoutHistoryQuery>;
export type GetPayoutHistoryLazyQueryHookResult = ReturnType<typeof useGetPayoutHistoryLazyQuery>;
export type GetPayoutHistorySuspenseQueryHookResult = ReturnType<typeof useGetPayoutHistorySuspenseQuery>;
export type GetPayoutHistoryQueryResult = ApolloReactCommon.QueryResult<GetPayoutHistoryQuery, GetPayoutHistoryQueryVariables>;
export const GetPayoutSettingsDocument = gql`
    query GetPayoutSettings {
  getPayoutSettings {
    method
    kaspiPhone
    cardNumber
    cardHolder
    iban
  }
}
    `;

/**
 * __useGetPayoutSettingsQuery__
 *
 * To run a query within a React component, call `useGetPayoutSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPayoutSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPayoutSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPayoutSettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPayoutSettingsQuery, GetPayoutSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPayoutSettingsQuery, GetPayoutSettingsQueryVariables>(GetPayoutSettingsDocument, options);
      }
export function useGetPayoutSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPayoutSettingsQuery, GetPayoutSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPayoutSettingsQuery, GetPayoutSettingsQueryVariables>(GetPayoutSettingsDocument, options);
        }
// @ts-ignore
export function useGetPayoutSettingsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetPayoutSettingsQuery, GetPayoutSettingsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetPayoutSettingsQuery, GetPayoutSettingsQueryVariables>;
export function useGetPayoutSettingsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetPayoutSettingsQuery, GetPayoutSettingsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetPayoutSettingsQuery | undefined, GetPayoutSettingsQueryVariables>;
export function useGetPayoutSettingsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetPayoutSettingsQuery, GetPayoutSettingsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPayoutSettingsQuery, GetPayoutSettingsQueryVariables>(GetPayoutSettingsDocument, options);
        }
export type GetPayoutSettingsQueryHookResult = ReturnType<typeof useGetPayoutSettingsQuery>;
export type GetPayoutSettingsLazyQueryHookResult = ReturnType<typeof useGetPayoutSettingsLazyQuery>;
export type GetPayoutSettingsSuspenseQueryHookResult = ReturnType<typeof useGetPayoutSettingsSuspenseQuery>;
export type GetPayoutSettingsQueryResult = ApolloReactCommon.QueryResult<GetPayoutSettingsQuery, GetPayoutSettingsQueryVariables>;
export const GetPendingPayoutsDocument = gql`
    query GetPendingPayouts($data: HistoryPaymentInput) {
  getPendingPayouts(data: $data) {
    data {
      id
      amount
      status
      createdAt
      user {
        id
        username
      }
      payoutDetails {
        method
        phone
        card
        iban
      }
    }
    meta {
      page
      limit
      total
      totalPages
    }
  }
}
    `;

/**
 * __useGetPendingPayoutsQuery__
 *
 * To run a query within a React component, call `useGetPendingPayoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPendingPayoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPendingPayoutsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetPendingPayoutsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPendingPayoutsQuery, GetPendingPayoutsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPendingPayoutsQuery, GetPendingPayoutsQueryVariables>(GetPendingPayoutsDocument, options);
      }
export function useGetPendingPayoutsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPendingPayoutsQuery, GetPendingPayoutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPendingPayoutsQuery, GetPendingPayoutsQueryVariables>(GetPendingPayoutsDocument, options);
        }
// @ts-ignore
export function useGetPendingPayoutsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetPendingPayoutsQuery, GetPendingPayoutsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetPendingPayoutsQuery, GetPendingPayoutsQueryVariables>;
export function useGetPendingPayoutsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetPendingPayoutsQuery, GetPendingPayoutsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetPendingPayoutsQuery | undefined, GetPendingPayoutsQueryVariables>;
export function useGetPendingPayoutsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetPendingPayoutsQuery, GetPendingPayoutsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPendingPayoutsQuery, GetPendingPayoutsQueryVariables>(GetPendingPayoutsDocument, options);
        }
export type GetPendingPayoutsQueryHookResult = ReturnType<typeof useGetPendingPayoutsQuery>;
export type GetPendingPayoutsLazyQueryHookResult = ReturnType<typeof useGetPendingPayoutsLazyQuery>;
export type GetPendingPayoutsSuspenseQueryHookResult = ReturnType<typeof useGetPendingPayoutsSuspenseQuery>;
export type GetPendingPayoutsQueryResult = ApolloReactCommon.QueryResult<GetPendingPayoutsQuery, GetPendingPayoutsQueryVariables>;
export const GetCommentRepliesDocument = gql`
    query getCommentReplies($data: GetRepliesInput!) {
  getRepliesComment(data: $data) {
    data {
      text
      id
      user {
        id
        avatar
        username
      }
      replies {
        id
        text
        user {
          id
          username
        }
      }
      parentId
      createdAt
    }
  }
}
    `;

/**
 * __useGetCommentRepliesQuery__
 *
 * To run a query within a React component, call `useGetCommentRepliesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentRepliesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentRepliesQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetCommentRepliesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetCommentRepliesQuery, GetCommentRepliesQueryVariables> & ({ variables: GetCommentRepliesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCommentRepliesQuery, GetCommentRepliesQueryVariables>(GetCommentRepliesDocument, options);
      }
export function useGetCommentRepliesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCommentRepliesQuery, GetCommentRepliesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCommentRepliesQuery, GetCommentRepliesQueryVariables>(GetCommentRepliesDocument, options);
        }
// @ts-ignore
export function useGetCommentRepliesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetCommentRepliesQuery, GetCommentRepliesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetCommentRepliesQuery, GetCommentRepliesQueryVariables>;
export function useGetCommentRepliesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCommentRepliesQuery, GetCommentRepliesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetCommentRepliesQuery | undefined, GetCommentRepliesQueryVariables>;
export function useGetCommentRepliesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCommentRepliesQuery, GetCommentRepliesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCommentRepliesQuery, GetCommentRepliesQueryVariables>(GetCommentRepliesDocument, options);
        }
export type GetCommentRepliesQueryHookResult = ReturnType<typeof useGetCommentRepliesQuery>;
export type GetCommentRepliesLazyQueryHookResult = ReturnType<typeof useGetCommentRepliesLazyQuery>;
export type GetCommentRepliesSuspenseQueryHookResult = ReturnType<typeof useGetCommentRepliesSuspenseQuery>;
export type GetCommentRepliesQueryResult = ApolloReactCommon.QueryResult<GetCommentRepliesQuery, GetCommentRepliesQueryVariables>;
export const GetTiersByAuthorDocument = gql`
    query GetTiersByAuthor($username: String!) {
  getTiersByAuthor(username: $username) {
    id
    title
    description
    amount
    currency
    benefits
    isActive
    position
  }
}
    `;

/**
 * __useGetTiersByAuthorQuery__
 *
 * To run a query within a React component, call `useGetTiersByAuthorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTiersByAuthorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTiersByAuthorQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetTiersByAuthorQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetTiersByAuthorQuery, GetTiersByAuthorQueryVariables> & ({ variables: GetTiersByAuthorQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetTiersByAuthorQuery, GetTiersByAuthorQueryVariables>(GetTiersByAuthorDocument, options);
      }
export function useGetTiersByAuthorLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTiersByAuthorQuery, GetTiersByAuthorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetTiersByAuthorQuery, GetTiersByAuthorQueryVariables>(GetTiersByAuthorDocument, options);
        }
// @ts-ignore
export function useGetTiersByAuthorSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetTiersByAuthorQuery, GetTiersByAuthorQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetTiersByAuthorQuery, GetTiersByAuthorQueryVariables>;
export function useGetTiersByAuthorSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetTiersByAuthorQuery, GetTiersByAuthorQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetTiersByAuthorQuery | undefined, GetTiersByAuthorQueryVariables>;
export function useGetTiersByAuthorSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetTiersByAuthorQuery, GetTiersByAuthorQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetTiersByAuthorQuery, GetTiersByAuthorQueryVariables>(GetTiersByAuthorDocument, options);
        }
export type GetTiersByAuthorQueryHookResult = ReturnType<typeof useGetTiersByAuthorQuery>;
export type GetTiersByAuthorLazyQueryHookResult = ReturnType<typeof useGetTiersByAuthorLazyQuery>;
export type GetTiersByAuthorSuspenseQueryHookResult = ReturnType<typeof useGetTiersByAuthorSuspenseQuery>;
export type GetTiersByAuthorQueryResult = ApolloReactCommon.QueryResult<GetTiersByAuthorQuery, GetTiersByAuthorQueryVariables>;
export const ProjectLikesDocument = gql`
    query projectLikes($projectId: String!) {
  projectLikes(projectId: $projectId) {
    id
    createdAt
    user {
      id
      username
      displayName
      avatar
    }
  }
}
    `;

/**
 * __useProjectLikesQuery__
 *
 * To run a query within a React component, call `useProjectLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectLikesQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useProjectLikesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ProjectLikesQuery, ProjectLikesQueryVariables> & ({ variables: ProjectLikesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProjectLikesQuery, ProjectLikesQueryVariables>(ProjectLikesDocument, options);
      }
export function useProjectLikesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectLikesQuery, ProjectLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProjectLikesQuery, ProjectLikesQueryVariables>(ProjectLikesDocument, options);
        }
// @ts-ignore
export function useProjectLikesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ProjectLikesQuery, ProjectLikesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ProjectLikesQuery, ProjectLikesQueryVariables>;
export function useProjectLikesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ProjectLikesQuery, ProjectLikesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ProjectLikesQuery | undefined, ProjectLikesQueryVariables>;
export function useProjectLikesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ProjectLikesQuery, ProjectLikesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ProjectLikesQuery, ProjectLikesQueryVariables>(ProjectLikesDocument, options);
        }
export type ProjectLikesQueryHookResult = ReturnType<typeof useProjectLikesQuery>;
export type ProjectLikesLazyQueryHookResult = ReturnType<typeof useProjectLikesLazyQuery>;
export type ProjectLikesSuspenseQueryHookResult = ReturnType<typeof useProjectLikesSuspenseQuery>;
export type ProjectLikesQueryResult = ApolloReactCommon.QueryResult<ProjectLikesQuery, ProjectLikesQueryVariables>;