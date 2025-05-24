import { Field } from "@/utils/types/interfaces";

export function VacantesField(): Field[] {
  return [
    {
      type: "H1",
      require: false,
      label: "Datos personales",
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
          name: "id_puesto",
          label: "Puesto",
          placeholder: "id del puesto",
          require: true,
        },
        {
          id: 1,
          type: "INPUT",
          name: "titulo",
          label: "Titulo",
          placeholder: "Titulo de la vacante",
          require: true,
        },
      ],
    },
    {
      id: 2,
      type: "TEXT_AREA",
      name: "description",
      label: "Descripcion",
      placeholder:
        "Descripcion breve de lo que se busca en el prospecto y lo que ofrece la vacante",
      require: false,
      maxLength: 140,
    },
    {
      id: 3,
      type: "INPUT",
      name: "beneficios",
      label: "Beneficios",
      placeholder: "Beneficios que ofrece la vacante",
      require: false,
      maxLength: 100,
    },
    {
      id: 4,
      type: "INPUT",
      name: "ubicacion",
      label: "Ubicacion",
      placeholder: "Ubicacion de la vacante (estado/municipio/direccion)",
      require: false,
      maxLength: 100,
    },
    {
      id: 4,
      type: "SELECT",
      name: "tipo",
      label: "Tipo",
      require: true,
      options: ["Remota", "Presencial"],
      placeholder: "Tipo de la vacante",
    },
  ];
}
