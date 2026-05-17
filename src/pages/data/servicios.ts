import { BanknoteArrowUp, Rocket, Star } from "lucide-react";

interface ItemServicio {
  className?: string;
  title?: string;
  desc?: string;
  icon?: any; // Tipo correcto para componentes de Lucide
}

export const servicios: ItemServicio[] = [
  {
    icon: Star,
    title: "Calidad Premium",
    desc: "Los mejores productos",
  },
  {
    icon: BanknoteArrowUp,
    title: "Pago Seguro",
    desc: "Múltiples métodos",
  },
  {
    icon: Rocket,
    title: "Entrega a domicilio",
    desc: "Rápida en todo el Valle y alrededores.",
  },
];
