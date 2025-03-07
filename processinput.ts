import { type person } from "./groupsort";
import * as PromptSync from "prompt-sync";

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

/**
 * Ask multiple users that want to apply for Group Sort for their name and a friend 
 * every person that applies is given a id. Convert the input data to a person 
 * @returns Array<person> to store every application and their wished friend
 * */ 

export function process_input(): Array<person> {
    let option = ("");
    let index = 0;
    const person_array = [];
    const temp_arr: Array<person> = [];

    while(option !== "STOP") {
        const name = prompt("Your name: ")?.trim();
        const friend = prompt("Your friends name: ")?.trim();
        const small_name = name.toLowerCase();
        const small_friend = friend.toLowerCase()
        let double_apply: boolean = false;

        //om en person anmäler sig igen
        for(let i = 0; temp_arr[i] !== undefined; i = i + 1) {
            if(temp_arr[i].name === small_name) {
                console.log("You have already applied for GroupSort")
                double_apply = true;
                
            } 
        } 
        if(double_apply === false) {
            const person: person = {
                name: small_name!,
                id: 0, 
                friend_name: small_friend!,
                friend_id: 0
            }

            temp_arr.push(person);
        }

        console.log(" ")
        option = prompt("Write STOP to quit (and make the goroups) or press ENTER to continue adding people: ")!;
        console.log(" ")
        const big_option = option.toUpperCase();
        option = big_option;
    }
    
    for(let i = 0; temp_arr[i] !== undefined; i = i + 1) {
        temp_arr[i].id = index;
        index++;
        person_array.push(temp_arr[i]);
    }

    for(let i = 0; temp_arr[i] !== undefined; i = i + 1) {
        let friend_is_main = false;
        for(let j = 0; temp_arr[j] !== undefined; j = j + 1) {
        //om en vän är anmäld får den sitt index
            if(temp_arr[i].friend_name === temp_arr[j].name) {
                person_array[i].friend_id = temp_arr[j].id;
                friend_is_main = true;
            } 
        }
        //vänner är ej anmäld, får index utanför array size
        if(friend_is_main === false) {
            person_array[i].friend_id = index;
            index++;
        }
    }
    console.log(person_array);
    return person_array;
}


/**
 * Convert an array to visual list of names that are stored by id and sorted by array index. 
 * @param group_arr the final groups as an array
 * @param person_array the array of persons
 * @returns display groups and names of members. 
 */

export function display_groups(group_arr : Array<Array<number>>, person_array : Array<person>) {
    for(let i = 0; group_arr[i] !== undefined; i = i + 1) {
        console.log(`GROUP ${[i + 1]}`); 
        for(let j = 0; group_arr[i][j] !== undefined; j = j + 1) {
            
            for(let k = 0; person_array[k] !== undefined; k = k + 1) {
                if(group_arr[i][j] === person_array[k].id) {
                    console.log(person_array[k].name);
                }
            }
        }
        console.log(" ");
    }
}

