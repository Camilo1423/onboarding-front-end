import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { useToast } from "@Providers";
import { ServiceDeleteCollaborator } from "@Services";
import { ThemeBasic } from "@Theme";
import { cn } from "@Utils";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const DeleteCp = ({ collaborator, reloadData, openModalCount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addToast } = useToast();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const resp = await ServiceDeleteCollaborator({ id: collaborator.id });
      addToast({
        type: "success",
        title: "Colaborador eliminado",
        content: resp.message,
        duration: 3000,
        persistent: false,
      });
      onOpenChange(false);
      reloadData(reloadData + 1);
    } catch (error) {
      console.log(error);
      return addToast({
        type: "destructive",
        title: error.error,
        content: error.message,
        duration: 3000,
        persistent: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = (isOpen) => {
    onOpenChange(isOpen);
  };

  useEffect(() => {
    if (openModalCount > 0) {
      onOpen();
    }
  }, [openModalCount]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
      hideCloseButton
      size="md"
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
          <div className="p-6">
            <h2 className={cn(ThemeBasic.text, "text-2xl font-semibold mb-2")}>
              Eliminar Colaborador
            </h2>
            <p className={cn(ThemeBasic.textGray, "text-sm mb-6")}>
              ¿Estás seguro que deseas eliminar al colaborador{" "}
              {collaborator?.name}? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="flat" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="danger"
                isLoading={isLoading}
                disabled={isLoading}
                onPress={handleDelete}
              >
                {isLoading ? "Eliminando..." : "Eliminar"}
              </Button>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

DeleteCp.propTypes = {
  collaborator: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    entry_date: PropTypes.string,
    technical_onboarding_done: PropTypes.bool,
    welcome_onboarding_done: PropTypes.bool,
  }),
  reloadData: PropTypes.func.isRequired,
  openModalCount: PropTypes.number.isRequired,
};

export default DeleteCp;
