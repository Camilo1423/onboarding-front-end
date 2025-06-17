import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import { forwardRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import CreateMeetingModal from "./CreateMeetingModal";
import EditMeetingModal from "./EditMeetingModal";

// Array de colores pastel para las reuniones
const PASTEL_COLORS = [
  "bg-blue-100 border-blue-200",
  "bg-green-100 border-green-200",
  "bg-purple-100 border-purple-200",
  "bg-pink-100 border-pink-200",
  "bg-yellow-100 border-yellow-200",
  "bg-orange-100 border-orange-200",
  "bg-teal-100 border-teal-200",
  "bg-indigo-100 border-indigo-200",
  "bg-rose-100 border-rose-200",
  "bg-cyan-100 border-cyan-200",
];

// Función para generar un color basado en el ID de la reunión
const getColorForMeetingId = (id) => {
  // Usar el ID como semilla para generar un índice consistente
  const hash = id.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  const index = Math.abs(hash) % PASTEL_COLORS.length;
  return PASTEL_COLORS[index];
};

const TimeSlot = forwardRef(
  ({ hour, meetings, onTimeSlotClick, selectedDate }, ref) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMeetingId, setSelectedMeetingId] = useState(null);

    const formatHour = (hour) => {
      return `${hour}:00`;
    };

    const timeKey = formatHour(hour);

    // Find all meetings that include this hour
    const slotMeetings = meetings.filter((meeting) => {
      const startHour = parseInt(meeting.startTime.split(":")[0]);
      const endHour = parseInt(meeting.endTime.split(":")[0]);
      return hour >= startHour && hour < endHour;
    });

    // Calculate if this is the start of a meeting
    const isMeetingStart = (meeting) => {
      return parseInt(meeting.startTime.split(":")[0]) === hour;
    };

    // Calculate meeting duration in hours
    const getMeetingDuration = (meeting) => {
      const start = parseInt(meeting.startTime.split(":")[0]);
      const end = parseInt(meeting.endTime.split(":")[0]);
      return end - start;
    };

    const handleCreateMeeting = (newMeeting) => {
      onTimeSlotClick(newMeeting);
    };

    const handleUpdateMeeting = (updatedMeeting) => {
      onTimeSlotClick(updatedMeeting, true);
    };

    const handleOpenEditModal = (meeting) => {
      setSelectedMeetingId(meeting.id);
      setIsEditModalOpen(true);
    };

    return (
      <>
        <div
          ref={ref}
          className="relative p-4 border rounded-lg transition-colors hover:bg-gray-50"
          style={{
            height: "80px",
            position: "relative",
          }}
        >
          <div className="flex items-center h-full gap-4">
            <span className="font-medium w-16">{timeKey}</span>
            <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-2">
              {slotMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEditModal(meeting);
                  }}
                  className={`p-2 rounded-md cursor-pointer min-w-[200px] ${getColorForMeetingId(
                    meeting.id
                  )}`}
                >
                  {isMeetingStart(meeting) && (
                    <>
                      <div className="text-sm font-medium">{meeting.title}</div>
                      <div className="text-xs">
                        {meeting.normalStartTime} - {meeting.normalEndTime} (
                        {getMeetingDuration(meeting)}h)
                      </div>
                      <div className="text-xs mt-1">
                        {meeting.meetingType === "technical"
                          ? "Técnico"
                          : "Administrativo"}
                      </div>
                    </>
                  )}
                  {!isMeetingStart(meeting) && (
                    <div className="text-xs">Reunión en curso</div>
                  )}
                </div>
              ))}
              <Button
                isIconOnly
                color="primary"
                variant="light"
                className="min-w-[40px] h-[40px]"
                onPress={() => setIsCreateModalOpen(true)}
              >
                <PlusIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <CreateMeetingModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateMeeting={handleCreateMeeting}
          selectedDate={selectedDate}
          selectedHour={hour}
        />

        <EditMeetingModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedMeetingId(null);
          }}
          onUpdateMeeting={handleUpdateMeeting}
          meetingId={selectedMeetingId}
          meetings={meetings}
        />
      </>
    );
  }
);

TimeSlot.displayName = "TimeSlot";

TimeSlot.propTypes = {
  hour: PropTypes.number.isRequired,
  meetings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      meetingType: PropTypes.string.isRequired,
    })
  ).isRequired,
  onTimeSlotClick: PropTypes.func.isRequired,
  selectedDate: PropTypes.object.isRequired,
};

export default TimeSlot;
