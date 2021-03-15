export interface SearchResponsePaginationDataType {
  total: number,
  perPage: number,
  currentPage: number,
  totalPages: number
}
export interface SearchResponseMetaType {
  pagination: SearchResponsePaginationDataType
}

export interface SearchResponseType {
  causes?: {
    meta: SearchResponseMetaType
    data: CauseDataType[]
  }
}

export interface CauseDataType {
	objectClass: "cause"
	uuid: string
	name: string
	officialName: string
	hasRelated: number
	focus: string
	tagline: string
	website: string
	urlPath: string
	images: ImageType
	logo: {
		data: ImageDataType
	}
	problem: string
	mission: string
	intervention: string
	certificates: {
		data: CauseCertificateType[]
	}
	publishedAt?: string
	status: CauseStatusType
	shareImage: {
		data: ImageDataType
	}
	categories?: {
		data: CauseCategoryType[]
	},
	hasPassedPreliminary?: boolean
}

export interface ImageType {
  data: ImageDataType[]
  meta: {
    ranks: ImageMetaType[]
  }
}

export interface ImageDataType {
  objectClass: string
  id: number
  name: string
  description: string
  type: number
  focus: any
  fileName: string
  files: {
    data: ImageFileType[]
  }
}

export interface ImageMetaType {
  id: number
  rank: number
}

export interface ImageFileType {
  objectClass: string
  id: number,
  fileName: string
  type: string
  url: string
  mimeType: string
  width: number,
  height: number
}

export enum CauseStatusType {
  DRAFT = 0,
  PUBLISHED = 10,
  PRELIMINARY = 20,
  NONDONATABLE = 30,
	CONVERTING = 40
}

export interface CauseAreaType {
  id: number
  name: string
  iconImage: any
  iconImageName: string
}

export interface CauseCategoryType {
	objectClass: "causeCategory",
	id: number,
	number: number,
	name: "Community development",
	description: string
}

export interface CauseCertificateType {
	objectClass: "causeCertificate"
	id: number
	name: string
	description: string
	isRegistration: number
	website: string
	source: string
}
