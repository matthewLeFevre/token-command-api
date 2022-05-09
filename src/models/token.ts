export enum TokenType {
  JWT,
  PASETO,
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

export interface StatefulToken extends Token {
  encrypted: boolean;
}