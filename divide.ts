
import { split_group_if_too_big } from "./bfs_split_groups";
/**
 * 
 * @param groups an array of groups
 * @param number_of_groups the number of groups
 * @param max_group_size the maximum size of a group
 * @returns an array of groups of the right length
 */
export function divide_if_too_many(groups: number[][], number_of_groups: number, max_group_size: number): number[][] {

    if(groups.length > number_of_groups) {
        const find_small = find_smallest(groups);
        const smallest_group = find_small.group; 
        const smallest_group_index: number = find_small.index;

        //create a new array of a set size making it shorter per iteration
        let groups_new = new Array<Array<number>>(groups.length-1);
        
        
        //put the groups in a new array shifting them back
        if(smallest_group_index === 0) {
            for(let i = smallest_group_index; i < groups_new.length; i = i + 1) { 
                groups_new[i] = groups[i + 1];
            }
        } else {
            for(let i = 0; i < smallest_group_index; i = i + 1) {
                groups_new[i] = groups[i];
            }
            for(let i = smallest_group_index; i < groups_new.length; i = i + 1) { 
                groups_new[i] = groups[i + 1];
            }
        }

        let merged = false;

        for(let i = 0; i < groups_new.length; i = i + 1) {
            if ((groups_new[i].length + smallest_group.length) <= max_group_size) { //if the smallest group can be merged with existing group
                groups_new[i] = [...groups_new[i], ...smallest_group];
                merged = true;
                break;          
            }
        }
        if (merged === false) { 
            const new_max_size = Math.ceil(smallest_group.length/2);    
            const split_groups = split_group_if_too_big(smallest_group, new_max_size);
            let new_group_array = [...groups_new, ...split_groups];
            groups_new = new_group_array;
        }
        return(divide_if_too_many(groups_new, number_of_groups, max_group_size));
    } else {
        return groups;
    }
}

/**
 * @param groups array av grupper
 * @returns an object with two properties, an index (the index of the firstcoming smallest group) and a group (the smallest group)
 */
export function find_smallest(groups: number[][]) {
    let current_small = groups[0].length;
    let current_small_index: number = 0;

    for(let i = 1; groups[i] !== undefined; i = i + 1) {
        if (current_small > groups[i].length) {
            current_small = groups[i].length;
            current_small_index = i;
        }
    }
    return {index: current_small_index, group: groups[current_small_index]};
}