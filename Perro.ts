import { Mascota } from "./Mascota";

export class Perro implements Mascota {
  nombre: string;
  edad: number;
  raza: string;

  constructor(nombre: string, edad: number, raza: string) {
    this.nombre = nombre;
    this.edad = edad;
    this.raza = raza;
  }

  emitirSonido(): string {
    return `${this.nombre} dice: ¡Guau guau!`;
  }

  describir(): string {
    return `Soy ${this.nombre}, un perro de raza ${this.raza} con ${this.edad} año(s).`;
  }
}
