import moment from 'moment';

export enum Peirod {
    Daily = 'daily',
    Weekly = 'weekly',
    Monthly = 'monthly',
}

export interface TimeRange {
    start: any; // start time
    end: any; // end time
}

export class TimeInput {

    date: string;

    time: string;

    get value(): string {
        return (this.date && this.time) ? `${this.date} ${this.time}` : '';
    }

    constructor(t: TimeInput) {
        this.date = t.date ? moment(t.date, 'MM-DD-YYYY').format('YYYY-MM-DD') : '';
        this.time = t.time ? moment(t.time, 'HH:mm').format('HH:mm') : '';
    }

}

export class DateTime {

    date: Date | null;

    time: string | null;

    constructor(str: string) {
        const array = str ? str.split(' ') : [];
        const date: string = array[0];
        const time: string = array[1];
        this.date = date ? moment(date, 'YYYY-MM-DD').toDate() : null;
        this.time = time ? moment(time, 'HH:mm').format('HH:mm') : null;
    }

}

export function getDisplayDate(time: string): string | null {
    return time?.trim() ? moment(time, 'YYYY-MM-DD HH:mm').format('DD-MM-YYYY HH:mm') : null;
}

export function format(date: any, format: string): string {
    return moment(date, format).format(format);
}
