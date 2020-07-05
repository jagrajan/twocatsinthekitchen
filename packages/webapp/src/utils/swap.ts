import { List } from 'immutable';

function fixSwapPositions(
  indices: [number, number],
  count: number,
): [number, number] {
  const [a, b] = indices;
  return [(a + count) % count, (b + count) % count];
}

function swap<T>(indices_: [number, number], list: List<T>): List<T> {
  const indices = fixSwapPositions(indices_, list.count());
  const a = list.get(indices[0]);
  const b = list.get(indices[1]);
  let ret = list;
  if (a && b) {
    ret = list.set(indices[0], b);
    ret = ret.set(indices[1], a);
  }
  return ret;
}

export default swap;
