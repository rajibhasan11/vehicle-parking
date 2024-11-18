export class SelectOption {

    name: string;

    value: any;

    constructor(name: string, value?: any) {
        this.name = name.includes('_') ? name.replaceAll('_', ' ') : name; // removes underscores
        this.value = value;
    }
}
