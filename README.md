# Handlerbars.js helpers for Pattern Lab

Registers additional Handlebars helper in Pattern Lab Node version.

## slugify helper

Based on [handlebars-helper-slugify](https://github.com/helpers/handlebars-helper-slugify)

The `slugify` helper takes 1 argument: str
 
### Example

```
{{ slugify 'I am a title' }}
```

Renders to:

```
i-am-a-title
```

## bemModfier helper

The `bemModfier` helper takes 2 arguments: block, modifier

### Example

```
{{ bemModifier 'block' [ 'modifier-1', 'modifier-2' ] }}
```

Renders to:

```
block block--modifier-1 block--modifier-2
```

## bemElementOf helper

The `bemElementOf` helper takes 2 arguments: block, element
### Example

```
{{ bemElementOf 'block' 'element' }}
```

Renders to:

```
block__element
```
