import { make_list_graph } from "./makelistgraph";
import { list } from "./lib/list";
import { lg_new } from "./lib/graphs";

const ppl_arr = [{
    name: 'Matilda',
    id: 0, 
    friend_name: 'Tyra',
    friend_id: 1}, 
    {
    name: 'Tyra',
    id: 1, 
    friend_name: 'Engla',
    friend_id: 3}, 
    {
    name: 'A',
    id: 2, 
    friend_name: 'B',
    friend_id: 4}, 
    {
    name: 'Engla',
    id: 3, 
    friend_name: 'Tyra',
    friend_id: 1}, 
    {
    name: 'B',
    id: 4, 
    friend_name: 'A',
    friend_id: 2}, 
    {
    name: 'C',
    id: 5,
    friend_name: 'D',
    friend_id: 6
    }
];

const lg_ex = make_list_graph(ppl_arr);

const adj_ex = [list(1), list(3), list(4), list(1), list(2), null];

test('Is it correct size?', () => {
    expect(lg_ex.size).toBe(6);
})

test('Does it generate correct graph', () => {
    expect(lg_ex.adj).toStrictEqual(adj_ex);
})

test('Lookup', () => {
    expect(lg_ex.adj[0]).toStrictEqual(list(1));
})

test('Empty argument returns empty lg', () => {
    expect(make_list_graph([])).toStrictEqual(lg_new(0));
})