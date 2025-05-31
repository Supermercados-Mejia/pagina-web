import { Field } from "@/utils/types/interfaces";
import { Package } from "lucide-react";
export function combosField(): Field[] {
  return [
    {
      type: "INPUT",
      require: true,
      name: "Articulo",
      label: "Artículo",
      placeholder: "Artículo en promoción",
      icon: <Package className="text-blue-500" />,
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
