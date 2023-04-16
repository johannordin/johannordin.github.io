---
title: 'Custom Domains in GH-Pages'
description: "So simple!"
date: '2023-04-17'
published: true
---
Okay, you have a site on gh-pages. Now lets fix your custom domain. 

1. buy a domain name
2. create a CNAME record to point to the addresses specified in [github docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)
3. create a `CNAME` file in your `static` folder
```text
nordin.work
```
4. go to your repo's settings/pages and specify your domain
   - dont forget to enforce HTTPS 💪.
5. deploy, magic! 🪄