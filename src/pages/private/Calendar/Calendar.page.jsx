import { parseDate } from "@internationalized/date";
import { DatePicker } from "@nextui-org/react";
import { useEffect, useState } from "react";
import TimeSlot from "./components/TimeSlot";
import { useToast } from "@Providers";
import {
  ServiceCreateOnboarding,
  ServiceGetOnboardingByDay,
  ServiceUpdateOnboarding,
} from "@Services";
import { cn } from "@Utils";
import { ThemeBasic } from "@Theme";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(
    parseDate(new Date().toISOString().split("T")[0])
  );
  const [refresh, setRefresh] = useState(0);
  const [currentMeetings, setCurrentMeetings] = useState([]);

  const { addToast } = useToast();

  // Generate hours from 8 AM to 6 PM
  const hours = Array.from({ length: 11 }, (_, i) => i + 8);

  const getMeetingsByDay = async () => {
    const response = await ServiceGetOnboardingByDay({
      date: selectedDate.toString(),
    });
    setCurrentMeetings(response.data);
  };

  useEffect(() => {
    getMeetingsByDay();
  }, [selectedDate, refresh]);

  const handleTimeSlotClick = async (
    newMeeting,
    isUpdate = false,
    isOnlyRefresh = false
  ) => {
    if (isOnlyRefresh) {
      setRefresh((prev) => prev + 1);
      return;
    }
    try {
      let response;
      if (isUpdate) {
        response = await ServiceUpdateOnboarding({
          id: newMeeting.id,
          type: newMeeting.type,
          name_onboarding: newMeeting.name_onboarding,
          description_onboarding: newMeeting.description_onboarding,
          start_date: newMeeting.start_date,
          end_date: newMeeting.end_date,
          new_collaborator_ids: newMeeting.new_collaborator_ids,
          deleted_collaborator_ids: newMeeting.deleted_collaborator_ids,
        });
      } else {
        response = await ServiceCreateOnboarding({
          type: newMeeting.type,
          name_onboarding: newMeeting.name_onboarding,
          description_onboarding: newMeeting.description_onboarding,
          start_date: newMeeting.start_date,
          end_date: newMeeting.end_date,
          collaborator_ids: newMeeting.collaborator_ids,
        });
      }
      addToast({
        type: "success",
        title: `Reunión ${newMeeting.name_onboarding} creada correctamente`,
        content: response.message,
        duration: 5000,
        persistent: false,
      });
      setRefresh((prev) => prev + 1);
    } catch (error) {
      return addToast({
        type: "destructive",
        title: error.error,
        content: error.message,
        duration: 3000,
        persistent: false,
      });
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className={cn("text-3xl font-bold mb-2", ThemeBasic.title)}>
          Calendario de Reuniones
        </h1>
        <p className="text-gray-600 mb-4">
          Selecciona una fecha y hora para programar tus reuniones
        </p>
        <div className="w-full max-w-xs">
          <DatePicker
            label="Seleccionar fecha"
            aria-label="Seleccionar fecha para ver las reuniones"
            value={selectedDate}
            onChange={handleDateChange}
            variant="bordered"
            classNames={{
              base: "w-full",
              popover: "w-full",
            }}
          />
        </div>
      </div>

      <div className="grid gap-4">
        {hours.map((hour) => (
          <TimeSlot
            key={hour}
            hour={hour}
            selectedDate={selectedDate}
            meetings={currentMeetings}
            onTimeSlotClick={handleTimeSlotClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;
