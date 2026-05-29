import { Mascota } from "./Mascota";

export class Gato implements Mascota {
  nombre: string;
  edad: number;
  colorPelaje: string;

  constructor(nombre: string, edad: number, colorPelaje: string) {
    this.nombre = nombre;
    this.edad = edad;
    this.colorPelaje = colorPelaje;
  }

  emitirSonido(): string {
    return `${this.nombre} dice: ¡Miau miau!`;
  }

  describir(): string {
    return `Soy ${this.nombre}, un gato de pelaje ${this.colorPelaje} con ${this.edad} año(s).`;
  }
}
