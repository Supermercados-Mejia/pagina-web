import { Field } from "@/utils/types/interfaces";

export function ValoracionesField(): Field[] {
  return [
    {
      type: "RATING",
      name: "rating",
      label: "Datos personales",
      stars: [1, 2, 3, 4, 5],
      require: true,
    },
    {
      type: "Flex",
      name: "flex",
      label: "Información Personal",
      require: false,
      elements: [
        {
          id: 0,
          type: "INPUT",
          name: "nombre",
          label: "Nombre",
          placeholder: "Nombre",
          require: false,
        },
        {
          id: 1,
          type: "INPUT",
          name: "apellido_paterno",
          label: "Apellido Paterno",
          placeholder: "Apellido Paterno",
          require: false,
        },
        {
          id: 2,
          type: "INPUT",
          name: "apellido_materno",
          label: "Apellido Materno",
          placeholder: "Apellido Materno",
          require: false,
        },
      ],
    },
    {
      id: 6,
      type: "PHONE",
      name: "numero_telefono",
      label: "Número de Teléfono",
      placeholder: "Número de Teléfono",
      require: false,
    },
  ];
}
