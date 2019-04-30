# Handlerbars.js helpers for Pattern Lab

Registers additional Handlebars helper in Pattern Lab Node version.

## slugify helper

Based on [handlebars-helper-slugify](https://github.com/helpers/handlebars-helper-slugify)

The `slugify` helper takes 1 argument: str
 
### Example

```
{{ slugify "I am a Title" }}
```

Renders to:

```
i-am-a-title
```
