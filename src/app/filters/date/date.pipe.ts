import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'customDate'
})
export class DatePipe implements PipeTransform {
	transform(items, date1, date2): any {
		function parseDate(input) {
			const date = new Date(input);
			const month = '' + (date.getMonth() + 1);
			const day = '' + date.getDate();
			const year = date.getFullYear();
			return ([year, month, day].join('-'));
		}

		if (date1 && !date2) {
			const dt = parseDate(date1);
			const arrayToReturn = [];
			items.forEach(function (element) {
				const tf = parseDate(element.date);
				if (tf >= dt) {
					arrayToReturn.push(element);
				}
			})
			return arrayToReturn;
		} else if (date2 && !date1) {
			const dt = parseDate(date2);
			const arrayToReturn = [];
			items.forEach(function (element) {
				const tf = parseDate(element.date);
				if (tf >= dt) {
					arrayToReturn.push(element);
				}
			})
			return arrayToReturn;
		} else if (date1 && date2) {
			const dt1 = parseDate(date1);
			const dt2 = parseDate(date2);
			const arrayToReturn = [];
			items.forEach(function (element) {
				const tf = parseDate(element.date);
				if (tf >= dt1 && tf <= dt2) {
					arrayToReturn.push(element);
				}
			})
			return arrayToReturn;
		}
		return items;
	}



}
