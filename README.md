#Token Command API

There are many different kinds of tokens. The following is a list of tokens with their pros and cons.

## Stateful Tokens

- JWT
- PASETO

### Plain Text
Is a stateful token containing plain text. Should not be used for sensitive information.

### Encrypted Body
Is a stateful token with an encrypted body. Sensitive information may be passed into the payload of this body.

## Stateless Tokens

## Detached token
Is a stateless token but can store data in the db when validated and queried for the data. May be useful to store semi-sensitive information when a token does not need to have internal state. May work well for service authentication.
