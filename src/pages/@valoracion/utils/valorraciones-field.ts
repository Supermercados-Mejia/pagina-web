import { Field } from "@/utils/types/interfaces";

export function ValoracionesField(): Field[] {
  return [
    {
      type: "RATING",
      name: "valor",
      label: "Calificación",
      stars: [1, 2, 3, 4, 5],
      require: true,
    },
    {
      id: 0,
      type: "TEXT_AREA",
      name: "comment",
      label: "Comentario",
      placeholder: "aquí puedes dejar tu comentario",
      require: false,
    },
  ];
}
