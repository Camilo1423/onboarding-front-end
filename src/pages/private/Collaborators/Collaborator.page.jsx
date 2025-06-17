import { cn } from "@Utils";
import TableCollaborators from "./TableCollaborators.cp";
import { ThemeBasic } from "@Theme";
import { CaracteristicasModulo } from "@CptPrivate";
import { caracteristicas } from "./config/caracteristicas";

const CollaboratorPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-5 mb-5">
        <div className="w-full my-5">
          <h2
            className={cn(
              "text-4xl font-medium leading-tight",
              ThemeBasic.title
            )}
          >
            Colaboradores
          </h2>
          <p className={cn("font-normal leading-tight")}>
            Permite asignar y gestionar los colaboradores vinculados a procesos
            de onboarding, ya sea para sesiones técnicas o de bienvenida.
            Facilita el control, actualización y validación de la información de
            los empleados participantes en cada proceso.
          </p>
        </div>
        <CaracteristicasModulo
          caracteristicas={caracteristicas.caracteristicas}
          title={caracteristicas.title}
        />
      </div>
      <TableCollaborators />
    </div>
  );
};

export default CollaboratorPage;
