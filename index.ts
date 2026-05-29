import { Mascota } from "./Mascota";
import { Perro } from "./Perro";
import { Gato } from "./Gato";

const perroMax = new Perro("Max", 3, "Labrador");
const gatoLuna = new Gato("Luna", 2, "gris");

console.log(perroMax.describir());
console.log(perroMax.emitirSonido());
console.log(gatoLuna.describir());
console.log(gatoLuna.emitirSonido());

const mascotas: Mascota[] = [];

mascotas.push(perroMax);
mascotas.push(gatoLuna);

console.log("\n--- Polimorfismo: recorriendo la lista de Mascota ---\n");

mascotas.forEach((mascota) => {
  console.log(mascota.describir());
  console.log(mascota.emitirSonido());
  console.log("---");
});
