export interface Limit {
	max?: number;
	min?: number;
}

export const FormLimit = {
	Budget: {
		min: 0,
		max: 1000000000
	},
	Description: {
		max: 1000
	},
	Name: {
		min: 3,
		max: 256
	},
	Location: {
		min: 1,
		max: 256
	},
	Password: {
		min: 8,
		max: 50
	},
	Task: {
		min: 3,
		max: 256
	},
	Username: {
		min: 6,
		max: 50
	},
	Year: {
		min: 1985,
		max: 10000000000
	}
}