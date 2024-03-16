import { isEmpty } from '@/utils/isEmpty';

describe('isEmpty', () => {
  it('should return true for an empty object', () => {
    const obj = {};
    expect(isEmpty(obj)).toBe(true);
  });

  it('should return false for a non-empty object', () => {
    const obj = { key: 'value' };
    expect(isEmpty(obj)).toBe(false);
  });

  it('should return true for an empty array', () => {
    const arr = [];
    expect(isEmpty(arr)).toBe(true);
  });

  it('should return false for a non-empty array', () => {
    const arr = [1, 2, 3];
    expect(isEmpty(arr)).toBe(false);
  });

  it('should return true when input is undefined', () => {
    const obj = undefined;
    expect(isEmpty(obj)).toBe(true);
  });
});
