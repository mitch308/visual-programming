interface Dict {
  readonly value: any;
  readonly label: string;
}

interface Dictionary {
  [x: string]: Dict[]
}