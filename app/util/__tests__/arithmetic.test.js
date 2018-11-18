import {accSub, accDiv} from '../arithmetic'

test('accSub 4 - 2 to equal 2', ()=> {
    expect(accSub(4, 2)).toBe('2');
});

test('accDiv 4 / 2 to equal 2', ()=> {
    expect(accDiv(4, 2)).toBe('2');
});

