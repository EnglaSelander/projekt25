import { ListGraph } from "./lib/graphs";
import { list } from "./lib/list";
import { type person } from "./groupsort";

/**
 * Creates a listgraph showing the connecntions between the people and their friends
 * @param arr array of type person
 * @returns ListGraph of the connections between a person and their friend
 */
export function make_list_graph(arr: Array<person>): ListGraph {
    const len = arr.length;
    let peoplegraph = {adj: Array(len).fill(null), size: len};

    if (len === 0) {
        return peoplegraph;
    } else {
        for (let i = 0; i < len; i = i + 1) {
            if(arr[i].friend_id! < len) {
                peoplegraph.adj[arr[i].id] = list(arr[i].friend_id!);
            } else {
                peoplegraph.adj[arr[i].id] = null;
            }
        }
    }
    return peoplegraph;
}
