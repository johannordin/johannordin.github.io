---
title: 'Jsonbin.io and Asp.net Core'
description: "A simple way to mock your dependencies"
date: '2023-04-21'
published: true
---
I've started using [jsonbin](https://jsonbin.io) to mock some simple api calls. I'm impressed with the simplicity and the possibility to validate `bins` to a `JSON schema`. 
1. Ask chatgpt to write a example `JSON` given the `schema` that I provide.
2. Add a `bin` using their rest endpoint
```curl
curl -v\
  -H "Content-Type: application/json" \
  -H "X-Master-key: <YOUR_API_KEY>" \
  --request POST \
  --data '{"sample": "Hello World"}' \
    https://api.jsonbin.io/v3/b
```
3. In your ASP.net Core app add the http client and specify `X-Bin-Meta: false` to skip the extra wrapper.
```c#
.AddHttpClient<IMyHttpClient, MyHttpClient>(options =>
{
    options.BaseAddress = new Uri("https://api.jsonbin.io/");
    options.DefaultRequestHeaders.Add("X-Bin-Meta", new [] { "false" });
});
```
