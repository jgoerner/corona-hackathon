# 8. E-Signature

Date: 2020-03-20

## Status

Accepted

## Context

We have to make a decision, how we support e-signatures for work contracts.

## Decision

We use [Signature Pad](https://github.com/szimek/signature_pad) to implement HTML5 canvas-based e-signatures.

## Consequences

We will need to add this library `signature_pad` to our `npm` dependencies and probably create a wrapper in our frontend framework.
