import { Field } from "@/utils/types/interfaces";

export function EvaluacionField(): Field[] {
  return [
    {
      type: "RATING",
      name: "productividad",
      label: "Productividad",
      stars: [1, 2, 3, 4, 5],
      require: true,
    },
    {
      type: "RATING",
      name: "calidad",
      label: "Calidad",
      stars: [1, 2, 3, 4, 5],
      require: true,
    },
    {
      type: "Flex",
      name: "flex",
      label: "",
      require: false,
      elements: [
        {
          id: 6,
          type: "INPUT",
          name: "empleado",
          label: "Número de empleado",
          placeholder: "Número de empleado",
          require: false,
        },
        {
          id: 0,
          type: "INPUT",
          name: "area",
          label: "Area",
          placeholder: "Area",
          require: false,
        },
      ],
    },
    {
      id: 0,
      type: "INPUT",
      name: "nombre",
      label: "Nombre Completo",
      placeholder: "Nombre Completo",
      require: false,
    },
  ];
}
