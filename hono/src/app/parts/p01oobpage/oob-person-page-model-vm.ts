export type OOBPersonTableRowModel = {
	id: number,
	firstName: string,
	lastName: string,
	streetName: string,
}

export type OOBPersonTableModel = {
	people: OOBPersonTableRowModel[],
	total: number,
}
export type OOBPersonPageModel = {
	table: OOBPersonTableModel,
}

export type OOBPersonDetailModel = {
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
}

export type OOBPersonEditModel = {
	id: number,
	firstName: string,
	lastName: string,
	streetName: string,
}

