export type PersonTableRowModel = {
	id: number,
	firstName: string,
	lastName: string,
	streetName: string,
	_detailsLink: string,
}

export type PersonTableModel = {
	people: PersonTableRowModel[],
	total: number,
}
export type PersonPageModel = {
	table: PersonTableModel,
}

export type PersonDetailModel = {
	id: number,
	firstName: string,
	lastName: string,
	streetName: string,
	streetNo: string,
	zipCode: string,
	city: string,
	country: string,
	mailBox: string,
	phoneNumber: string,
	cellPhone: string,
	_backLink: string,
}

export type PersonEditModel = {
	id: number,
	firstName: string,
	lastName: string,
	streetName: string,
}

