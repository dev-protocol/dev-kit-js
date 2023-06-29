export type Image = {
	readonly src?: string
	readonly name?: string
	readonly description?: string
	readonly requiredETHAmount?: number | string
	readonly requiredETHFee?: number | string
	readonly gateway?: string
}
