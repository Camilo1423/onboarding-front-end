import {
  Button,
  Input,
  Modal,
  ModalContent,
  Select,
  SelectItem,
  Textarea,
  DatePicker,
} from "@nextui-org/react";
import { ThemeBasic } from "@Theme";
import { cn } from "@Utils";
import PropTypes from "prop-types";
import { useState } from "react";
import CollaboratorAutocomplete from "./CollaboratorAutocomplete";

const HOURS = Array.from({ length: 23 }, (_, i) => i + 8); // 08 a 18
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);

const padHour = (h) => String(h).padStart(2, "0");

const CreateMeetingModal = ({
  isOpen,
  onClose,
  onCreateMeeting,
  selectedDate,
  selectedHour,
}) => {
  const [meetingData, setMeetingData] = useState({
    name_onboarding: "",
    description_onboarding: "",
    date: selectedDate,
    startHour: Number(selectedHour),
    startMinute: "00",
    endHour: Number(selectedHour) + 1,
    endMinute: "00",
    type: "technical",
  });
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!meetingData.name_onboarding.trim()) {
      newErrors.name_onboarding = "El título es requerido";
    }
    if (!meetingData.description_onboarding.trim()) {
      newErrors.description_onboarding = "La descripción es requerida";
    }
    if (!meetingData.date) {
      newErrors.date = "La fecha es requerida";
    }
    if (meetingData.startHour === undefined) {
      newErrors.startHour = "La hora de inicio es requerida";
    }
    if (meetingData.startMinute === undefined) {
      newErrors.startMinute = "Los minutos de inicio son requeridos";
    }
    if (meetingData.endHour === undefined) {
      newErrors.endHour = "La hora de fin es requerida";
    }
    if (meetingData.endMinute === undefined) {
      newErrors.endMinute = "Los minutos de fin son requeridos";
    } else {
      const startTime =
        Number(meetingData.startHour) + Number(meetingData.startMinute) / 60;
      const endTime =
        Number(meetingData.endHour) + Number(meetingData.endMinute) / 60;
      if (endTime <= startTime) {
        newErrors.endHour = "La hora de fin debe ser posterior a la de inicio";
      }
    }
    if (!meetingData.type) {
      newErrors.type = "El tipo de reunión es requerido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateMeeting = () => {
    if (!validateForm()) return;
    const dateStr = meetingData.date;
    const tz = "-05:00"; // Ajusta si es necesario
    const start_date = `${dateStr}T${padHour(meetingData.startHour)}:${
      meetingData.startMinute
    }:00${tz}`;
    const end_date = `${dateStr}T${padHour(meetingData.endHour)}:${
      meetingData.endMinute
    }:00${tz}`;
    const newMeeting = {
      type: meetingData.type,
      name_onboarding: meetingData.name_onboarding,
      description_onboarding: meetingData.description_onboarding,
      start_date,
      end_date,
      collaborator_ids: selectedCollaborators.map((c) => c.id),
    };
    onCreateMeeting(newMeeting);
    handleClose();
  };

  const handleClose = () => {
    setMeetingData({
      name_onboarding: "",
      description_onboarding: "",
      date: selectedDate,
      startHour: selectedHour,
      startMinute: "00",
      endHour: selectedHour + 1,
      endMinute: "00",
      type: "technical",
    });
    setSelectedCollaborators([]);
    setErrors({});
    onClose();
  };

  const handleCollaboratorSelect = (collaborator, isRemove = false) => {
    setSelectedCollaborators((prev) => {
      if (isRemove) {
        return prev.filter((c) => c.id !== collaborator.id);
      }
      const exists = prev.find((c) => c.id === collaborator.id);
      if (exists) {
        return prev;
      }
      return [...prev, collaborator];
    });
    if (errors.collaborators) {
      setErrors((prev) => ({ ...prev, collaborators: "" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingData((prev) => ({
      ...prev,
      [name]:
        name === "startHour" || name === "endHour" ? Number(value) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name, value) => {
    setMeetingData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleMinuteChange = (name, value) => {
    setMeetingData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTypeChange = (value) => {
    setMeetingData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleDateChange = (date) => {
    setMeetingData((prev) => ({ ...prev, date: date.toString() }));
    if (errors.date) {
      setErrors((prev) => ({ ...prev, date: "" }));
    }
  };

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
        <div className="p-6">
          <h2 className={cn(ThemeBasic.text, "text-2xl font-semibold mb-2")}>
            Crear Nueva Reunión
          </h2>
          <p className={cn(ThemeBasic.textGray, "text-sm mb-6")}>
            Ingresa los detalles de la reunión y selecciona los participantes
          </p>
          <form
            className="space-y-6"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateMeeting();
            }}
          >
            <Input
              label="Título"
              name="name_onboarding"
              value={meetingData.name_onboarding}
              onChange={handleChange}
              isInvalid={!!errors.name_onboarding}
              errorMessage={errors.name_onboarding}
              variant="bordered"
              placeholder="Ej: Onboarding Q2 2024"
              classNames={{
                base: "w-full",
                inputWrapper: cn(
                  "border",
                  ThemeBasic.focusBorderData,
                  ThemeBasic.hoverBorderData
                ),
              }}
            />
            <Textarea
              label="Descripción"
              name="description_onboarding"
              value={meetingData.description_onboarding}
              onChange={handleChange}
              isInvalid={!!errors.description_onboarding}
              errorMessage={errors.description_onboarding}
              variant="bordered"
              placeholder="Describe el objetivo de la reunión..."
              classNames={{
                base: "w-full",
                inputWrapper: cn(
                  "border",
                  ThemeBasic.focusBorderData,
                  ThemeBasic.hoverBorderData
                ),
              }}
            />
            <DatePicker
              label="Fecha"
              name="date"
              value={meetingData.date}
              onChange={handleDateChange}
              variant="bordered"
              isInvalid={!!errors.date}
              errorMessage={errors.date}
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <Select
                  label="Hora inicio"
                  name="startHour"
                  selectedKeys={[String(meetingData.startHour)]}
                  onSelectionChange={(keys) =>
                    handleSelectChange("startHour", Array.from(keys)[0])
                  }
                  variant="bordered"
                  isInvalid={!!errors.startHour}
                  errorMessage={errors.startHour}
                  classNames={{
                    base: "w-full",
                    trigger: cn(
                      "border",
                      ThemeBasic.focusBorderData,
                      ThemeBasic.hoverBorderData
                    ),
                  }}
                >
                  {HOURS.map((h) => (
                    <SelectItem
                      key={String(h)}
                      value={String(h)}
                      textValue={`${padHour(h)}:00`}
                    >
                      {padHour(h)}:00
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <Select
                  label="Minutos inicio"
                  name="startMinute"
                  selectedKeys={[meetingData.startMinute]}
                  onSelectionChange={(keys) =>
                    handleMinuteChange("startMinute", Array.from(keys)[0])
                  }
                  variant="bordered"
                  isInvalid={!!errors.startMinute}
                  errorMessage={errors.startMinute}
                  classNames={{
                    base: "w-full",
                    trigger: cn(
                      "border",
                      ThemeBasic.focusBorderData,
                      ThemeBasic.hoverBorderData
                    ),
                  }}
                >
                  {MINUTES.map((m) => (
                    <SelectItem key={m} value={m} textValue={m}>
                      {m}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <Select
                  label="Hora fin"
                  name="endHour"
                  selectedKeys={[String(meetingData.endHour)]}
                  onSelectionChange={(keys) =>
                    handleSelectChange("endHour", Array.from(keys)[0])
                  }
                  variant="bordered"
                  isInvalid={!!errors.endHour}
                  errorMessage={errors.endHour}
                  classNames={{
                    base: "w-full",
                    trigger: cn(
                      "border",
                      ThemeBasic.focusBorderData,
                      ThemeBasic.hoverBorderData
                    ),
                  }}
                >
                  {HOURS.map((h) => (
                    <SelectItem
                      key={String(h)}
                      value={String(h)}
                      textValue={`${padHour(h)}:00`}
                    >
                      {padHour(h)}:00
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <Select
                  label="Minutos fin"
                  name="endMinute"
                  selectedKeys={[meetingData.endMinute]}
                  onSelectionChange={(keys) =>
                    handleMinuteChange("endMinute", Array.from(keys)[0])
                  }
                  variant="bordered"
                  isInvalid={!!errors.endMinute}
                  errorMessage={errors.endMinute}
                  classNames={{
                    base: "w-full",
                    trigger: cn(
                      "border",
                      ThemeBasic.focusBorderData,
                      ThemeBasic.hoverBorderData
                    ),
                  }}
                >
                  {MINUTES.map((m) => (
                    <SelectItem key={m} value={m} textValue={m}>
                      {m}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            <Select
              label="Tipo de Reunión"
              name="type"
              selectedKeys={[meetingData.type]}
              onSelectionChange={(keys) =>
                handleTypeChange(Array.from(keys)[0])
              }
              variant="bordered"
              isInvalid={!!errors.type}
              errorMessage={errors.type}
              classNames={{
                base: "w-full",
                trigger: cn(
                  "border",
                  ThemeBasic.focusBorderData,
                  ThemeBasic.hoverBorderData
                ),
              }}
            >
              <SelectItem
                key="technical"
                value="technical"
                textValue="OnBoarding Técnico"
              >
                OnBoarding Técnico
              </SelectItem>
              <SelectItem
                key="welcome"
                value="welcome"
                textValue="OnBoarding de Bienvenida"
              >
                OnBoarding de Bienvenida
              </SelectItem>
            </Select>
            <div>
              <CollaboratorAutocomplete
                onSelectCollaborator={handleCollaboratorSelect}
                selectedCollaborators={selectedCollaborators}
                onRemoveCollaborator={() => {}}
              />
              {errors.collaborators && (
                <p className="text-danger text-sm mt-2">
                  {errors.collaborators}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="flat" onPress={handleClose} type="button">
                Cancelar
              </Button>
              <Button
                className={cn(
                  ThemeBasic.backgroundPrimary,
                  ThemeBasic.textWhite
                )}
                type="submit"
              >
                Crear Reunión
              </Button>
            </div>
          </form>
        </div>
      </ModalContent>
    </Modal>
  );
};

CreateMeetingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreateMeeting: PropTypes.func.isRequired,
  selectedDate: PropTypes.object.isRequired,
  selectedHour: PropTypes.number.isRequired,
};

export default CreateMeetingModal;
