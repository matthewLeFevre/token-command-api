export enum TokenType {
  JWT,
  PASETO,
  Stateless,
}

export interface Token {
  id?: string,
  type: TokenType;
  appId?: string;
  userId?: string;
  token: string;
  expireTime: number;
}

export interface StatelessToken extends Token {
  data: any;
}

export interface StatefulToken extends Token {
  encrypted: boolean;
}