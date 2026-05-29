# Proyecto 5: Polimorfismo con Interfaces en TypeScript

Este es el quinto proyecto de la serie sobre **Programación Orientada a Objetos (POO)**. Aquí aprenderás a usar **interfaces** para definir un contrato común, implementar ese contrato en varias **clases**, y aprovechar el **polimorfismo** para tratar objetos distintos de forma uniforme mediante listas tipadas con la interfaz.

---

## Tabla de contenidos

1. [Requisitos previos](#1-requisitos-previos)
2. [Estructura del proyecto](#2-estructura-del-proyecto)
3. [¿Qué es TypeScript y por qué usarlo?](#3-qué-es-typescript-y-por-qué-usarlo)
4. [El archivo tsconfig.json](#4-el-archivo-tsconfigjson)
5. [¿Qué es una interfaz?](#5-qué-es-una-interfaz)
6. [¿Qué es una clase?](#6-qué-es-una-clase)
7. [¿Qué es una instancia (objeto)?](#7-qué-es-una-instancia-objeto)
8. [El constructor](#8-el-constructor)
9. [¿Por qué separar el código en varios archivos?](#9-por-qué-separar-el-código-en-varios-archivos)
10. [Implementar una interfaz en una clase](#10-implementar-una-interfaz-en-una-clase)
11. [Polimorfismo](#11-polimorfismo)
12. [Listas tipadas con la interfaz](#12-listas-tipadas-con-la-interfaz)
13. [El archivo index.ts (punto de entrada)](#13-el-archivo-indexts-punto-de-entrada)
14. [Cómo ejecutar el proyecto](#14-cómo-ejecutar-el-proyecto)
15. [Salida esperada en consola](#15-salida-esperada-en-consola)
16. [Resumen de conceptos](#16-resumen-de-conceptos)

---

## 1. Requisitos previos

Antes de continuar, asegúrate de tener instalado:

| Herramienta | Para qué sirve |
|-------------|----------------|
| **Node.js** | Entorno de ejecución de JavaScript en tu computadora |
| **npm** | Gestor de paquetes (viene con Node.js) |

Para comprobar que están instalados, abre una terminal y ejecuta:

```bash
node --version
npm --version
```

Si ambos comandos muestran un número de versión, puedes continuar.

---

## 2. Estructura del proyecto

```
5polomorfismointerfaces/
├── tsconfig.json    # Configuración del compilador TypeScript
├── package.json     # Dependencias y script de ejecución
├── Mascota.ts       # Interfaz: contrato común para todas las mascotas
├── Perro.ts         # Clase que implementa Mascota
├── Gato.ts          # Clase que implementa Mascota
├── index.ts         # Archivo principal: crea objetos y los ejecuta
└── README.md        # Esta documentación
```

Cada clase vive en su propio archivo con **PascalCase** (`Perro.ts`, `Gato.ts`). Los nombres de variables y métodos usan **camelCase** (`perroMax`, `emitirSonido`).

---

## 3. ¿Qué es TypeScript y por qué usarlo?

**TypeScript** es un lenguaje que se construye sobre JavaScript y añade **tipos estáticos**. Eso significa que puedes declarar explícitamente qué forma tienen tus datos (texto, números, objetos, interfaces) y el editor o el compilador te avisará si cometes errores antes de ejecutar el programa.

En este proyecto no generamos archivos `.js` en la carpeta del proyecto: ejecutamos el código directamente con **ts-node**, que interpreta TypeScript al vuelo.

---

## 4. El archivo tsconfig.json

El archivo `tsconfig.json` le dice al compilador de TypeScript **cómo** debe tratar tu código. Contenido relevante de este proyecto:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true
  },
  "include": ["*.ts"],
  "exclude": ["node_modules"]
}
```

### Propiedades importantes (explicadas desde cero)

| Propiedad | Significado |
|-----------|-------------|
| `target` | Versión de JavaScript a la que se “traduce” mentalmente el código (ES2020 = características modernas). |
| `module` | Sistema de módulos (`commonjs` es el que usa Node.js por defecto). |
| `strict` | Activa comprobaciones estrictas de tipos (recomendado para aprender bien). |
| `noEmit` | **Obligatorio en este proyecto.** Si es `true`, TypeScript **no crea** archivos `.js` en tu carpeta. Solo verifica tipos o dejas que `ts-node` ejecute sin emitir. |
| `include` | Qué archivos forman parte del proyecto (aquí, todos los `.ts` en la raíz). |

**¿Por qué `noEmit: true`?**  
Evitas llenar el workspace de archivos compilados duplicados. El flujo es: escribes `.ts` → ejecutas con `ts-node` → ves el resultado en consola, sin generar `.js` locales.

---

## 5. ¿Qué es una interfaz?

Una **interfaz** en TypeScript es un **contrato**: describe qué propiedades y métodos debe tener cualquier tipo que la “firme”, sin implementar la lógica por sí misma.

En este proyecto, `Mascota.ts` define la interfaz `Mascota`:

```typescript
export interface Mascota {
  nombre: string;
  edad: number;
  emitirSonido(): string;
  describir(): string;
}
```

**Interpretación en lenguaje natural:**

- Toda entidad que sea una `Mascota` debe tener `nombre` (texto) y `edad` (número).
- Debe poder `emitirSonido()` y `describir()`, y ambos devuelven un `string`.

La interfaz **no** crea objetos por sí sola. Solo dice: “si quieres ser considerado una Mascota, debes cumplir esto”.

**Analogía:** La interfaz es como la ficha de un trabajo: “necesitamos alguien que sepa presentarse y hacer un sonido”. No es la persona; es el listado de requisitos.

---

## 6. ¿Qué es una clase?

Una **clase** es una plantilla para crear objetos. Agrupa:

- **Propiedades** (datos): por ejemplo `nombre`, `edad`, `raza`.
- **Métodos** (comportamientos): funciones asociadas al objeto, como `describir()`.

En `Perro.ts`:

```typescript
export class Perro implements Mascota {
  nombre: string;
  edad: number;
  raza: string;
  // constructor y métodos...
}
```

La palabra clave `implements Mascota` significa: **esta clase se compromete a cumplir el contrato de la interfaz `Mascota`**. Si falta una propiedad o un método, TypeScript marcará error.

`Gato` hace lo mismo, pero con propiedades propias (`colorPelaje` en lugar de `raza`).

---

## 7. ¿Qué es una instancia (objeto)?

Una **instancia** es un objeto concreto creado a partir de una clase. Es la diferencia entre el plano (clase) y la casa ya construida (instancia).

En `index.ts`:

```typescript
const perroMax = new Perro("Max", 3, "Labrador");
const gatoLuna = new Gato("Luna", 2, "gris");
```

- `Perro` y `Gato` son las **clases**.
- `perroMax` y `gatoLuna` son **instancias** (objetos reales en memoria).
- `perroMax` es un `Perro`, pero también es una `Mascota` porque `Perro` implementa `Mascota`.

Cada instancia tiene su propio estado: Max tiene 3 años y raza Labrador; Luna tiene 2 años y pelaje gris.

---

## 8. El constructor

El **constructor** es un método especial que se ejecuta **automáticamente** cuando creas un objeto con `new`.

```typescript
constructor(nombre: string, edad: number, raza: string) {
  this.nombre = nombre;
  this.edad = edad;
  this.raza = raza;
}
```

**Propósito:**

1. Recibir valores iniciales (argumentos).
2. Asignarlos a las propiedades del objeto (`this.nombre = nombre`).

`this` se refiere a **la instancia actual**. Sin constructor tendrías que asignar cada propiedad manualmente después de crear el objeto, lo cual es más propenso a errores.

---

## 9. ¿Por qué separar el código en varios archivos?

| Razón | Explicación |
|-------|-------------|
| **Organización** | Cada archivo tiene una responsabilidad clara (interfaz, perro, gato, programa principal). |
| **Reutilización** | Puedes importar `Perro` en otro proyecto sin cargar todo `index.ts`. |
| **Mantenimiento** | Cambiar el comportamiento del gato solo toca `Gato.ts`. |
| **Convención POO** | Una clase por archivo y nombre de archivo = nombre de clase (PascalCase). |

**Exportar e importar:**

- `export class Perro` → el archivo expone la clase al resto del proyecto.
- `import { Perro } from "./Perro"` → otro archivo la usa.

La interfaz `Mascota` también se exporta para tipar listas y parámetros.

---

## 10. Implementar una interfaz en una clase

Sintaxis:

```typescript
export class Perro implements Mascota {
  // Debes incluir TODO lo que exige Mascota
}
```

TypeScript comprueba en tiempo de edición/compilación que:

- Existan `nombre` y `edad`.
- Existan los métodos `emitirSonido()` y `describir()` con las firmas correctas.

Cada clase puede tener **detalles propios** (`raza` en perros, `colorPelaje` en gatos), siempre que cumpla el contrato mínimo de `Mascota`.

Los métodos descriptivos usan **camelCase**, por convención en TypeScript/JavaScript:

- `emitirSonido()`
- `describir()`

---

## 11. Polimorfismo

**Polimorfismo** (“muchas formas”) significa que puedes tratar objetos de tipos concretos distintos (`Perro`, `Gato`) **a través de un tipo común** (`Mascota`) y llamar los mismos métodos sin saber de antemano cuál es cuál.

Ejemplo mental:

```typescript
const mascota: Mascota = perroMax; // un Perro visto como Mascota
mascota.emitirSonido(); // TypeScript sabe que existe emitirSonido()
```

En tiempo de ejecución, se llama la versión de `Perro` o `Gato` según el objeto real (**enlace dinámico**). El código que recorre la lista no necesita `if (es perro) ... else if (es gato) ...` para cada sonido: solo invoca `emitirSonido()` sobre la interfaz.

**Beneficio:** Puedes añadir una nueva clase `Conejo implements Mascota` y la lista `Mascota[]` seguirá funcionando sin cambiar el bucle que la recorre.

---

## 12. Listas tipadas con la interfaz

Una **lista** (arreglo) tipada con la interfaz solo acepta elementos que cumplan el contrato `Mascota`:

```typescript
const mascotas: Mascota[] = [];

mascotas.push(perroMax);  // Perro → válido como Mascota
mascotas.push(gatoLuna);  // Gato → válido como Mascota
```

`push` agrega al final del arreglo. Gracias al tipo `Mascota[]`, no puedes hacer por error `mascotas.push("texto")` ni un objeto que no implemente la interfaz.

Recorrido polimórfico:

```typescript
mascotas.forEach((mascota) => {
  console.log(mascota.describir());
  console.log(mascota.emitirSonido());
});
```

Aquí `mascota` es de tipo `Mascota` en cada iteración, aunque por dentro sea `Perro` o `Gato`. Eso es polimorfismo en acción.

---

## 13. El archivo index.ts (punto de entrada)

`index.ts` es el **programa principal**:

1. Importa la interfaz y las clases.
2. Crea al menos dos instancias en variables **camelCase**.
3. Llama a sus métodos e imprime con `console.log`.
4. Crea la lista `mascotas`, agrega instancias y demuestra el polimorfismo en un bucle.

Flujo de ejecución:

```
index.ts → crea objetos → imprime resultados directos
        → llena Mascota[] → recorre y llama métodos polimórficamente
```

---

## 14. Cómo ejecutar el proyecto

Desde la carpeta del proyecto:

```bash
# 1. Instalar dependencias (solo la primera vez)
npm install

# 2. Ejecutar la aplicación de consola
npx ts-node index.ts
```

También puedes usar el script definido en `package.json`:

```bash
npm start
```

Ambos comandos ejecutan `index.ts` con **ts-node** sin generar archivos `.js` gracias a `noEmit: true`.

---

## 15. Salida esperada en consola

Al ejecutar, deberías ver algo similar a:

```
Soy Max, un perro de raza Labrador con 3 año(s).
Max dice: ¡Guau guau!
Soy Luna, un gato de pelaje gris con 2 año(s).
Luna dice: ¡Miau miau!

--- Polimorfismo: recorriendo la lista de Mascota ---

Soy Max, un perro de raza Labrador con 3 año(s).
Max dice: ¡Guau guau!
---
Soy Luna, un gato de pelaje gris con 2 año(s).
Luna dice: ¡Miau miau!
---
```

La primera parte muestra el uso directo de cada instancia. La segunda parte muestra el mismo comportamiento obtenido **solo** a través del tipo `Mascota` en la lista.

---

## 16. Resumen de conceptos

| Concepto | En este proyecto |
|----------|------------------|
| **Interfaz** | `Mascota`: contrato con propiedades y métodos comunes |
| **Clase** | `Perro`, `Gato`: implementan `Mascota` con detalles propios |
| **Instancia** | `perroMax`, `gatoLuna`: objetos creados con `new` |
| **Constructor** | Inicializa `nombre`, `edad` y atributos específicos |
| **Export / import** | Módulos separados por archivo |
| **tsconfig / noEmit** | Verificación de tipos sin emitir `.js` |
| **Polimorfismo** | Tratar `Perro` y `Gato` como `Mascota` |
| **Lista tipada** | `Mascota[]` con `push` y `forEach` |

---

## Próximos pasos sugeridos

- Añade una clase `Conejo` que implemente `Mascota` y agrégala a la lista.
- Crea un método `presentarTodas(mascotas: Mascota[])` en un archivo aparte.
- Experimenta quitando un método de `Gato` y observa el error de TypeScript al no cumplir la interfaz.

¡Feliz aprendizaje de POO con TypeScript!
