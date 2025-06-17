import {
  Button,
  Modal,
  ModalContent,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useToast } from "@Providers";
import { ServiceCreateCollaborator } from "@Services";
import { ThemeBasic } from "@Theme";
import { cn } from "@Utils";
import { PlusIcon } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  entryDate: "",
};

const CreateCP = ({ reloadData }) => {
  const [collabData, setCollabData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addToast } = useToast();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!collabData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }
    if (!collabData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!emailRegex.test(collabData.email)) {
      newErrors.email = "Ingrese un email válido";
    }
    if (!collabData.entryDate) {
      newErrors.entryDate = "La fecha de ingreso es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!validateForm()) return;
      const resp = await ServiceCreateCollaborator(collabData);
      addToast({
        type: "success",
        title: "Colaborador creado",
        content: resp.message,
        duration: 3000,
        persistent: false,
      });
      onOpenChange(false);
      setCollabData(initialState);
      setErrors({});
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollabData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar el error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleClose = (isOpen) => {
    setCollabData(initialState);
    setErrors({});
    onOpenChange(isOpen);
  };

  return (
    <>
      <div className="flex gap-3">
        <Button
          className={cn(ThemeBasic.backgroundPrimary, ThemeBasic.textWhite)}
          endContent={<PlusIcon className={cn("w-5 h-5")} strokeWidth={1.5} />}
          size="sm"
          onPress={onOpen}
          type="button"
        >
          Crear colaborador
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={handleClose}
        hideCloseButton
        size="2xl"
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
              <h2
                className={cn(ThemeBasic.text, "text-2xl font-semibold mb-2")}
              >
                Crear Nuevo Colaborador
              </h2>
              <p className={cn(ThemeBasic.textGray, "text-sm mb-6")}>
                Ingresa los datos del colaborador para crearlo y así poder
                asignarlo a algún one-on-one o meeting
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Nombre"
                  name="name"
                  value={collabData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name}
                  variant="bordered"
                  classNames={{
                    base: "w-full",
                    inputWrapper: cn(
                      "border",
                      ThemeBasic.focusBorderData,
                      ThemeBasic.hoverBorderData
                    ),
                  }}
                />
                <Input
                  label="Email"
                  name="email"
                  type="text"
                  value={collabData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email}
                  variant="bordered"
                  classNames={{
                    base: "w-full",
                    inputWrapper: cn(
                      "border",
                      ThemeBasic.focusBorderData,
                      ThemeBasic.hoverBorderData
                    ),
                  }}
                />
                <Input
                  label="Fecha de Ingreso"
                  name="entryDate"
                  type="date"
                  value={collabData.entryDate}
                  onChange={handleChange}
                  isInvalid={!!errors.entryDate}
                  errorMessage={errors.entryDate}
                  variant="bordered"
                  classNames={{
                    base: "w-full",
                    inputWrapper: cn(
                      "border",
                      ThemeBasic.focusBorderData,
                      ThemeBasic.hoverBorderData
                    ),
                  }}
                />
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="flat" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    disabled={isLoading}
                    className={cn(
                      ThemeBasic.backgroundPrimary,
                      ThemeBasic.textWhite
                    )}
                  >
                    {isLoading ? "Creando..." : "Crear Colaborador"}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

CreateCP.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default CreateCP;
