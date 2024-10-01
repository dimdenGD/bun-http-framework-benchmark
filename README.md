# Bun HTTP Framework Benchmark

Compare throughput benchmarks from various JavaScript HTTP framework

Test method: Average throughput

1. Ping
    - Request to [GET] `/`
    - Return `hi`
    - Headers must contains text `Content-Type: text/plain`, additional context is acceptable eg. `Content-Type: text/plain; charset=utf-8`
2. Query
    - Request to [GET] `/id/:id`
    - Extract path parameter, query string and setting headers.
    - For this benchmark, the request URL will be send as: `/id/1?name=bun`
    - Headers must contains `x-powered-by` to `benchmark`
    - Expected response: **"1 bun"** (`${id} ${query}`)
        - You **MUST NOT use hardcode string or index** to extract querystring.
        - In a real-world situation, there's no enforcement that the request will follow the specification, using hardcode index to extract `name=bun` querystring will be prone to error.
        - To test if it pass the requirement, the implementation should be able to extract querystring **dynamically** (please treat the value of 'name=bun' can be any value beside 'bun', for example 'alice', 'hina'), which means that the same code should be able to extract querystring, for example:
        - `/id/1?name=bun&id=1` -> should return `1 bun` not `1 bun&id=1`
        - `/id/1?id=1` -> should return `1 `
        - Query beside `name` maybe not need to be extracted and is optional
    - Headers must contains text `Content-Type: text/plain`, additional context is acceptable eg. `Content-Type: text/plain; charset=utf-8`
3. Body
    - [POST] `/json`
    - Mirror body to response
    - Server **MUST parse body to JSON and serialize back to string**
    - For the benchmark, the request body will be sent as: `{ "hello": "world" }`
    - Expected response: `{ "hello": "world" }`
    - Headers must contains text `Content-Type: application/json`, additional context is acceptable eg. `Content-Type: application/json; charset=utf-8`.

## requirement

-   The framework must at-least has latest published in less than 9 month otherwise will be classified as unmaintained and removed unless is an industry standard (Express).

# Prerequistes

-   [bombardier](https://github.com/codesenberg/bombardier)
-   Nodejs
-   Deno
-   Bun

# Run Test

```typescript
bun benchmark
```

Dump result will be available at `results/[benchmark-name].txt`

## Benchmark Condition

This benchmark is tested under the following condition:

-   Ubuntu 22.04
-   AMD Ryzen 5 3600, 64GB RAM
-   Bun 1.1.27
-   Node 22.8.0
-   Deno 1.46.3

Tested on 8 Sep 2024 05:01 (GMT+7)

## Results

These results are measured in req/s:

|  Framework       | Runtime | Average | Ping       | Query      | Body       |
| ---------------- | ------- | ------- | ---------- | ---------- | ---------- |
| uws | node | 94,296.49 | 108,551.92 | 104,756.22 | 69,581.33 |
| bun | bun | 74,824.52 | 85,839.42 | 74,668.88 | 63,965.26 |
| vixeny | bun | 72,523.073 | 84,293.43 | 71,393.64 | 61,882.15 |
| elysia | bun | 72,112.447 | 82,589.71 | 69,356.08 | 64,391.55 |
| byte | bun | 71,588.5 | 82,975.14 | 71,765.71 | 60,024.65 |
| nhttp | bun | 69,541.163 | 83,418.08 | 61,484.65 | 63,720.76 |
| bun-web-standard | bun | 69,058.79 | 79,000.77 | 66,641.77 | 61,533.83 |
| wobe | bun | 66,739.42 | 71,421.94 | 67,999.92 | 60,796.4 |
| hyper-express | node | 66,356.707 | 80,002.53 | 69,953.76 | 49,113.83 |
| hono | bun | 63,944.627 | 74,550.47 | 62,810.28 | 54,473.13 |
| hono | deno | 59,320.857 | 83,164.64 | 53,206.94 | 41,590.99 |
| nbit | bun | 55,353.783 | 65,915.44 | 55,674.55 | 44,471.36 |
| **ultimate-express** | **node** | **52,275.677** | **58,756.34** | **55,038.4** | **43,032.29** |
| oak | deno | 40,878.467 | 68,429.24 | 28,541.99 | 25,664.17 |
| express | bun | 35,937.977 | 41,329.97 | 34,339.79 | 32,144.17 |
| h3 | node | 35,423.263 | 41,243.68 | 34,429.26 | 30,596.85 |
| fastify | node | 33,094.62 | 40,147.67 | 40,076.35 | 19,059.84 |
| oak | bun | 32,705.36 | 35,856.59 | 32,116.4 | 30,143.09 |
| hono | node | 26,576.02 | 36,215.35 | 34,656.12 | 8,856.59 |
| acorn | deno | 24,476.67 | 29,690.42 | 22,254.82 | 21,484.77 |
| koa | node | 24,045.08 | 28,202.12 | 24,590.84 | 19,342.28 |
| express | node | 10,411.313 | 11,245.57 | 10,598.74 | 9,389.63 |

See more detail in [results](https://github.com/SaltyAom/bun-http-framework-benchmark/tree/main/results)

## Notice

I highly recommended testing this benchmark on your machine yourself as performance in likely to vary between machine.
