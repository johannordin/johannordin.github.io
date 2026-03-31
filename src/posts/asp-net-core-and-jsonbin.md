---
title: 'Mocking API dependencies with jsonbin.io and ASP.NET Core'
description: "Use jsonbin.io as a lightweight JSON store to mock external API responses during development."
date: '2023-04-21'
author: 'Johan Nordin'
published: true
tags: ['dotnet', 'aspnet', 'api', 'testing', 'mocking']
---

When building against external APIs during development, you often hit rate limits, flaky responses, or simply don't want real side effects while testing. I've started reaching for [jsonbin.io](https://jsonbin.io) as a dead-simple JSON mock store.

## Why jsonbin?

- Free tier is generous for dev/test usage
- Each "bin" is just a JSON document accessible via REST
- You can validate bins against a JSON schema
- No infra to maintain

## Workflow

**1. Generate example data with ChatGPT**

Give it your JSON schema and ask for a realistic example document. Paste the result as your bin content.

**2. Create a bin**

```bash
curl -v \
  -H "Content-Type: application/json" \
  -H "X-Master-Key: <YOUR_API_KEY>" \
  --request POST \
  --data '{"sample": "Hello World"}' \
  https://api.jsonbin.io/v3/b
```

The response gives you a bin ID — save it. Your mock endpoint is now `https://api.jsonbin.io/v3/b/{BIN_ID}`.

**3. Wire up the HTTP client in ASP.NET Core**

Register a typed `HttpClient` that points at jsonbin and sets the required headers:

```csharp
services.AddHttpClient<IMyHttpClient, MyHttpClient>(options =>
{
    options.BaseAddress = new Uri("https://api.jsonbin.io/");
    options.DefaultRequestHeaders.Add("X-Bin-Meta", new[] { "false" });
});
```

The `X-Bin-Meta: false` header strips jsonbin's metadata wrapper so you get your raw JSON back.

**4. Swap base addresses per environment**

In `appsettings.Development.json`, point the base address at jsonbin. In `appsettings.Production.json`, point it at the real API. Your `IMyHttpClient` code doesn't change — just the config.

> Keep your `X-Master-Key` in user secrets or environment variables, not in source code. `dotnet user-secrets set "JsonBin:ApiKey" "your-key"` is the right move.
