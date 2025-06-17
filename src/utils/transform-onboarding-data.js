import moment from "moment-timezone";

export const transformOnboardingData = (data) => {
  // Convert dates to Bogotá timezone (UTC-5)
  const startDate = moment(data.startDate).tz("America/Bogota");
  const endDate = moment(data.endDate).tz("America/Bogota");

  return {
    id: data.id,
    name_onboarding: data.name,
    description_onboarding: data.description,
    date: startDate.format("YYYY-MM-DD"),
    startHour: parseInt(startDate.format("H")),
    startMinute: startDate.format("mm"),
    endHour: parseInt(endDate.format("H")),
    endMinute: endDate.format("mm"),
    type: data.meetingType,
    collaborators: data.collaborators.map((collaborator) => ({
      ...collaborator,
      name: collaborator.fullName,
    })),
  };
};
