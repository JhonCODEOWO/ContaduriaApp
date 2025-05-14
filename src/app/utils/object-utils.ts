export class ObjectUtils {
    static getIndex(data: any[], value: string){
        const index = data.findIndex(element => element.id === value);
        return index;
    }

    static deleteFrom(data: any[], index: number){
        return data.splice(index, 1);
    }
}