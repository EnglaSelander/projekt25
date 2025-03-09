import { extend_environment } from "../Homework11/mce-typed/src/mce";
import { divide_if_too_many } from "./divide";

const grps = [[1,2], [3,4], [5,6], [7], [8]];
const grn = 2;
const mgs = 4;

const divgrps = divide_if_too_many(grps, grn, mgs);
const expgrps = [[1,2,7,8], [5,6,3,4]];

const already_done_groups = [[1,2,3], [4,5,6], [7,8,9]];

test('Done groups are done', () => {
    expect(divide_if_too_many(already_done_groups, 3, 3)).toStrictEqual([[1,2,3], [4,5,6], [7,8,9]]);
})

test('Creates groups of right size', () => {
    expect(divide_if_too_many(divgrps, grn, mgs)).toStrictEqual(expgrps);
})

//om det ska vara tre grupper med max 3 i varje
const grps2 = [[1,2], [3,4], [5,6], [7,8], [9]];
const expgrps2 = [[1,2,9], [5,6,3], [7,8,4]];

test('When it has to split groups', () => {
    expect(divide_if_too_many(grps2, 3, 3)).toStrictEqual(expgrps2);
})

const grps3 = [[1], [2,3,4], [5,6], [7], [8]];
const expgrps3 = [[2,3,4], [5,6,1], [8,7]];

test('When first group is smallest', () => {
    expect(divide_if_too_many(grps3, 3, 3)).toStrictEqual(expgrps3);
})

