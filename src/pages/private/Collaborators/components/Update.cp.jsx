import {
  Button,
  Modal,
  ModalContent,
  useDisclosure,
  Input,
  Switch,
} from "@nextui-org/react";
import { useToast } from "@Providers";
import { ServiceUpdateCollaborator } from "@Services";
import { ThemeBasic } from "@Theme";
import { cn, formatToYYYYMMDD } from "@Utils";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const UpdateCP = ({ collaborator, reloadData, openModalCount }) => {
  const [collabData, setCollabData] = useState({
    name: "",
    email: "",
    entryDate: "",
    technicalOnboardingDone: false,
    welcomeOnboardingDone: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addToast } = useToast();

  useEffect(() => {
    if (collaborator) {
      setCollabData({
        name: collaborator.name || "",
        email: collaborator.email || "",
        entryDate: formatToYYYYMMDD(collaborator.entry_date) || "",
        technicalOnboardingDone:
          collaborator.technical_onboarding_done ?? false,
        welcomeOnboardingDone: collaborator.welcome_onboarding_done ?? false,
      });
    }
  }, [collaborator]);

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
      const resp = await ServiceUpdateCollaborator({
        id: collaborator.id,
        name: collabData.name,
        email: collabData.email,
        entryDate: collabData.entryDate,
        technicalOnboardingDone: collabData.technicalOnboardingDone,
        welcomeOnboardingDone: collabData.welcomeOnboardingDone,
      });
      addToast({
        type: "success",
        title: "Colaborador actualizado",
        content: resp.message,
        duration: 3000,
        persistent: false,
      });
      onOpenChange(false);
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
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSwitchChange = (checked, name) => {
    setCollabData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleClose = (isOpen) => {
    setErrors({});
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
            <h2 className={cn(ThemeBasic.text, "text-2xl font-semibold mb-2")}>
              Actualizar Colaborador
            </h2>
            <p className={cn(ThemeBasic.textGray, "text-sm mb-6")}>
              Actualiza los datos del colaborador según sea necesario
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
              <div className="flex items-center gap-2">
                <Switch
                  isSelected={collabData.technicalOnboardingDone}
                  onValueChange={(checked) =>
                    handleSwitchChange(checked, "technicalOnboardingDone")
                  }
                  color="primary"
                />
                <span className={cn(ThemeBasic.text)}>
                  Estado de onboarding técnico
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  isSelected={collabData.welcomeOnboardingDone}
                  onValueChange={(checked) =>
                    handleSwitchChange(checked, "welcomeOnboardingDone")
                  }
                  color="primary"
                />
                <span className={cn(ThemeBasic.text)}>
                  Estado de onboarding de bienvenida
                </span>
              </div>
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
                  {isLoading ? "Actualizando..." : "Actualizar Colaborador"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

UpdateCP.propTypes = {
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

export default UpdateCP;
