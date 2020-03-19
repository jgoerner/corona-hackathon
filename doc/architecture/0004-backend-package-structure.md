# 4. Backend Package Structure

Date: 2020-03-19

## Status

Accepted

## Context

We have to decide how to structure our backend code.

## Decision

For each [bounded context](https://codeburst.io/ddd-strategic-patterns-how-to-define-bounded-contexts-2dc70927976e) we stick to the structure as proposed by [T. Homberg outstanding book](https://reflectoring.io/book/):
```
.
|-- adapter
|   |-- in
|   `-- out
|-- application
|   |-- port
|   |   |-- in
|   |   `-- out
|   `-- service
`-- domain

```
## Consequences

Sync between code and architecture leads to a  [screaming architecture](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html).