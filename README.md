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
| uws | node | 94,135.207 | 108,961 | 104,857.81 | 68,586.81 |
| bun | bun | 75,196.647 | 84,920.74 | 75,184.43 | 65,484.77 |
| vixeny | bun | 72,819.313 | 85,189.09 | 71,676.31 | 61,592.54 |
| elysia | bun | 71,849.673 | 83,518.96 | 70,817.41 | 61,212.65 |
| byte | bun | 71,120.757 | 83,272.13 | 70,303.56 | 59,786.58 |
| bun-web-standard | bun | 69,687.757 | 78,701.13 | 66,588.43 | 63,773.71 |
| nhttp | bun | 69,417.993 | 83,093.19 | 61,491.05 | 63,669.74 |
| hyper-express | node | 67,637.837 | 82,575.66 | 71,127.63 | 49,210.22 |
| wobe | bun | 64,567.38 | 69,329.76 | 66,220.95 | 58,151.43 |
| hono | bun | 64,192.243 | 74,746.94 | 62,819.65 | 55,010.14 |
| **ultimate-express** | **node** | **57,343.813** | **64,608.03** | **60,234.78** | **47,188.63** |
| nbit | bun | 54,839.187 | 67,106.95 | 53,893.66 | 43,516.95 |
| hono | deno | 52,615.757 | 62,573.52 | 53,574.59 | 41,699.16 |
| h3 | node | 34,927.437 | 40,980.33 | 33,821.71 | 29,980.27 |
| oak | bun | 33,070.503 | 35,651.11 | 32,609.97 | 30,950.43 |
| fastify | node | 32,612.637 | 40,044.42 | 38,820.81 | 18,972.68 |
| express | bun | 31,680.667 | 36,498.43 | 31,016.54 | 27,527.03 |
| oak | deno | 28,366.15 | 31,179.62 | 28,365.83 | 25,553 |
| hono | node | 26,979.683 | 36,282.69 | 35,602.13 | 9,054.23 |
| acorn | deno | 24,567.693 | 30,052.24 | 22,519.36 | 21,131.48 |
| koa | node | 24,060.217 | 28,017.14 | 24,869.2 | 19,294.31 |
| express | node | 9,199.313 | 10,141.68 | 9,181.4 | 8,274.86 |

See more detail in [results](https://github.com/SaltyAom/bun-http-framework-benchmark/tree/main/results)

## Notice

I highly recommended testing this benchmark on your machine yourself as performance in likely to vary between machine.
