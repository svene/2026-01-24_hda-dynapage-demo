export type EvtPersonTableRowModel = {
	id: number,
	firstName: string,
	lastName: string,
	streetName: string,
	_detailsLink: string,
}

export type EvtPersonTableModel = {
	people: EvtPersonTableRowModel[],
	total: number,
}
export type EvtPersonPageModel = {
	table: EvtPersonTableModel,
	_tableLink: string,
}

export type EvtPersonDetailModel = {
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
	_editLink: string,
}

export type EvtPersonEditModel = {
	id: number,
	firstName: string,
	lastName: string,
	streetName: string,
	_editBackLink: string,
}

