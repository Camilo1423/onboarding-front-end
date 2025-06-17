import {
  Button,
  Modal,
  ModalContent,
  useDisclosure,
  Spinner,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ThemeBasic } from "@Theme";
import { cn, splitDateTime } from "@Utils";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { ServiceFindById } from "@Services";

const ViewCp = ({ collaborator, openModalCount }) => {
  const [collabData, setCollabData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fetchCollaboratorData = async () => {
    setIsLoading(true);
    try {
      const response = await ServiceFindById({ id: collaborator.id });
      console.log(response.data);
      setCollabData(response.data);
    } catch (error) {
      console.error("Error fetching collaborator data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (openModalCount > 0) {
      onOpen();
      fetchCollaboratorData();
    }
  }, [openModalCount]);

  const handleClose = (isOpen) => {
    onOpenChange(isOpen);
  };

  const renderOnboardingSection = (title, data, type) => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-4">
          <Spinner color="primary" />
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className="text-center py-4">
          <p className={cn(ThemeBasic.textGray)}>No hay {type} disponibles</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item[type].id} className="p-4 border rounded-lg">
            <h3 className={cn(ThemeBasic.text, "font-semibold")}>
              {item[type].name}
            </h3>
            <p className={cn(ThemeBasic.textGray, "text-sm mt-1")}>
              {item[type].description}
            </p>
            <div className="mt-2 space-y-1">
              <p className={cn(ThemeBasic.textGray, "text-sm")}>
                Fecha de inicio: {splitDateTime(item[type].startDate).date} -{" "}
                {splitDateTime(item[type].startDate).time}
              </p>
              <p className={cn(ThemeBasic.textGray, "text-sm")}>
                Fecha de fin: {splitDateTime(item[type].endDate).date} -{" "}
                {splitDateTime(item[type].endDate).time}
              </p>
              {item[type].meetingUrl && (
                <p className={cn(ThemeBasic.textGray, "text-sm")}>
                  URL de la reunión:{" "}
                  <a
                    href={item[type].meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Unirse a la reunión
                  </a>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
      hideCloseButton
      size="3xl"
      scrollBehavior="inside"
      motionProps={{
        variants: {
          enter: {
            y: [-30, 10, -5, 0],
            opacity: 1,
            scale: [0.8, 1.1, 0.95, 1],
            transition: {
              duration: 0.4,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-2">
              <h2 className={cn(ThemeBasic.text, "text-2xl font-bold")}>
                Detalles del Colaborador
              </h2>
              <p className={cn(ThemeBasic.textGray, "text-sm")}>
                Información detallada del colaborador y sus eventos
              </p>
            </ModalHeader>
            <ModalBody>
              <div className="px-6">
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <Spinner color="primary" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 border rounded-lg">
                      <h3 className={cn(ThemeBasic.text, "font-semibold mb-2")}>
                        Información Personal
                      </h3>
                      <div className="space-y-2">
                        <p className={cn(ThemeBasic.text)}>
                          <span className="font-medium">Nombre:</span>{" "}
                          {collabData?.name}
                        </p>
                        <p className={cn(ThemeBasic.text)}>
                          <span className="font-medium">Email:</span>{" "}
                          {collabData?.email}
                        </p>
                        <p className={cn(ThemeBasic.text)}>
                          <span className="font-medium">Fecha de ingreso:</span>{" "}
                          {new Date(
                            collabData?.entry_date
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className={cn(ThemeBasic.text, "font-semibold mb-4")}>
                        Onboarding Técnico
                      </h3>
                      {renderOnboardingSection(
                        "Onboarding Técnico",
                        collabData?.technical_onboarding,
                        "technicalOnboarding"
                      )}
                    </div>

                    <div>
                      <h3 className={cn(ThemeBasic.text, "font-semibold mb-4")}>
                        Onboarding de Bienvenida
                      </h3>
                      {renderOnboardingSection(
                        "Onboarding de Bienvenida",
                        collabData?.welcome_onboarding,
                        "welcomeOnboarding"
                      )}
                    </div>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

ViewCp.propTypes = {
  collaborator: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    entry_date: PropTypes.string,
    technical_onboarding_done: PropTypes.bool,
    welcome_onboarding_done: PropTypes.bool,
  }),
  openModalCount: PropTypes.number.isRequired,
};

export default ViewCp;
