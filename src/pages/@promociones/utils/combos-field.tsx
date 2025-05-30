import { Field } from "@/utils/types/interfaces";
export function combosField(): Field[] {
  return [
    {
      type: "INPUT",
      require: true,
      name: "Articulo",
      placeholder: "Articulo en promocion",
    },
    {
      type: "INPUT",
      require: true,
      name: "Unidad",
      placeholder: "Unidad en promocion",
    },
    {
      type: "INPUT",
      require: true,
      name: "Precio",
      placeholder: "Precio en promocion",
    },
  ];
}
