# 6. Web Controller

Date: 2020-03-19

## Status

Accepted

## Context

We have to decide for a framework for web controller / adapter.

## Decision

Utilize [Spring Reactive Web](https://docs.spring.io/spring-framework/docs/5.0.0.M1/spring-framework-reference/html/web-reactive.html). 

## Consequences

Get additional freedom to have [`Mono<T>`](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Mono.html) or [`Flux<T>`](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html) as return types and make (at least parts of the application) [reactive](https://www.reactivemanifesto.org/).

See [RxJSMarbles](https://rxmarbles.com/) for interactive guidance on observables and their operations.