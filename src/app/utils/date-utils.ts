export class DateUtils {
    //Method that converts a string into a string with format YYYY-MM-DDTHH:mm
    static toDateLocal(dateISO: string){
        const date = new Date(dateISO);
        const pad = (n: number) => n.toString().padStart(2, '0');

        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${date.getHours()}:${pad(date.getMinutes())}`;
    }
}