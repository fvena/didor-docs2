# Repositorio orginal MMF-FE/svgicon Rama 3.x

[repositorio](https://github.com/MMF-FE/svgicon/tree/3.x);

- Crear plugin de Vite que lea automáticamente todos los svg de una ruta y genere un archivo virtual, como hacía con el plugin de las traducciones. En este directorio está el script original, ya que requiere cierta transformación.

Script para generar los iconos, con vite no haría falta

```json
{
  "scripts": {
    "svg": "node node_modules/vue-svgicon/dist/lib/index.js -s ./src/assets/svg -t ./src/components/icons"
  }
}
```

- Crear plugin para Vue3

- Posibilidad de cargar bajo demanda los iconos??

Scripts para generar y desarrollar la librería

```json
{
  "bin": {
    "vsvg": "./dist/lib/index.js"
  },
  "scripts": {
    "serve": "vue-cli-service serve",
    "serve:lib": "tsc -w -p ./lib/tsconfig.json",
    "build": "APP_ENV=lib vue-cli-service build --target lib --name svgicon ./src/components/SvgIcon.vue",
    "build:lib": "rm -rf dist/lib && tsc -p ./lib/tsconfig.json",
    "build:polyfill": "APP_ENV=lib webpack",
    "build:demo": "vue-cli-service build",
    "test": "vue-cli-service test:unit",
    "svg": "node ./dist/lib/index.js -s ./src/assets/svg -t ./src/components/icons",
    "svg:async": "node ./dist/lib/index.js -s ./src/assets/svg-async -t ./src/components/icons-async --ext ts --es6",
    "svg:ts": "node ./dist/lib/index.js -s ./src/assets/svg -t ./src/components/icons --ext ts --es6",
    "debug": "node --nolazy --inspect-brk=5858 ./dist/lib/index.js -s ./src/assets/svg -t ./src/components/icons"
  }
}
```
