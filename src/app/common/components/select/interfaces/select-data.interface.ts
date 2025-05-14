/**
 *  Interface to insert data into a select-component
 *  id is used like the value of option and option text the text to show in each option
 */

export interface SelectData {
    id: string | number;
    optionText: string;
}