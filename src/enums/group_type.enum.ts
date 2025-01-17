export enum GroupType {
  A00 = 'A00',
  A01 = 'A01',
  B00 = 'B00',
  C00 = 'C00',
  D01 = 'D01',
}

export const GroupValue: { [key: string]: string[] } = {
  A00: ['math', 'physics', 'chemistry'],
  A01: ['math', 'language', 'physics'],
  B00: ['math', 'biology', 'chemistry'],
  C00: ['literature', 'history', 'geography'],
  D01: ['math', 'literature', 'language'],
};
