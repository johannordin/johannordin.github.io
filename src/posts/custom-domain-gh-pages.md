---
title: 'Custom domains on GitHub Pages'
description: "Buy a domain, point DNS at GitHub, add a CNAME file — you're done."
date: '2023-04-17'
author: 'Johan Nordin'
published: true
tags: ['github-pages', 'dns', 'deployment']
---

You've got a site on GitHub Pages and want it at your own domain instead of `username.github.io`. Here's the short version.

## Steps

**1. Buy a domain** — I use [Namecheap](https://www.namecheap.com/) but any registrar works.

**2. Create DNS records** pointing to GitHub's IP addresses. GitHub documents the exact addresses [here](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain).

For an apex domain (`nordin.work` rather than `www.nordin.work`) you need four `A` records. For a `www` subdomain, use a `CNAME` record pointing to `{username}.github.io`.

**3. Add a `CNAME` file** to your `static/` folder:

```text
nordin.work
```

This gets copied into your build output and tells GitHub which domain to serve. The `gh-pages` deploy flag `-t true` ensures dotfiles like this aren't skipped.

**4. Configure in GitHub** — go to **Settings → Pages** and enter your custom domain. Tick **Enforce HTTPS** while you're there.

**5. Deploy** and wait a few minutes for DNS to propagate. Done 🪄

> DNS changes can take up to 48 hours to fully propagate, but in practice it's usually under 10 minutes with modern registrars.