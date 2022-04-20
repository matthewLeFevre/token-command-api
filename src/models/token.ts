export enum TokenType {
  Plain,
  Encrypted,
  Stateless,
}

export interface Token {
  type: TokenType;
  appId?: string;
  userId?: string;
  token: string;
  expireTime: number;
}

export interface StatelessToken extends Token {
  data: any;
}
