import { Field } from "@/utils/types/interfaces";
import { Package, Box, Tag } from "lucide-react"; // Importa los íconos

export function promocionesField(): Field[] {
  return [
    {
      type: "INPUT",
      require: true,
      name: "Articulo",
      label: "Artículo",
      placeholder: "Artículo en promoción",
      icon: <Package className="text-blue-500" />,
      maxLength: 50,
    },
    {
      type: "INPUT",
      require: true,
      name: "Unidad",
      label: "Unidad de medida",
      placeholder: "Unidad en promoción",
      icon: <Box className="text-green-500" />,
      maxLength: 20,
    },
    {
      type: "INPUT",
      require: true,
      name: "Precio",
      label: "Precio especial",
      placeholder: "Precio en promoción",
      maxLength: 10,
    },
    {
      type: "INPUT",
      require: false,
      name: "Porcentaje",
      label: "Porcentaje de descuento",
      placeholder: "Ej: 15%",
      icon: <Tag className="text-red-500" />,
      maxLength: 3,
    },
  ];
}
