import moment from 'moment';

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
        //const array = str ? str.split(' ') : [];
        //const date: string = array[0];
        //const time: string = array[1];
        str = (str || '').trim();
        this.date = str ? moment(str, 'YYYY-MM-DD').toDate() : null;
        this.time = str ? moment(str, 'HH:mm').format('HH:mm') : null;
    }

}

export function getDisplayDate(time: string): string | null {
    return time?.trim() ? moment(time, 'YYYY-MM-DD HH:mm').format('DD-MM-YYYY HH:mm') : null;
}

export function format(date: any, format: string): string {
    return moment(date, format).format(format);
}
