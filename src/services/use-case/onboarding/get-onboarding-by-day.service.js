import { Http } from "@Http";

export const ServiceGetOnboardingByDay = async ({ date }) => {
  try {
    const resp = await Http(
      {},
      {
        base: "onboarding",
        entry: "get-onboarding-by-day",
        method: "GET",
        id: `?day=${date}`,
      }
    );
    return {
      status: resp.status,
      message: resp.message,
      data: resp.data.map((item) => {
        const formatTime = (timeString) => {
          if (!timeString) return "";

          // If the time is already in HH:mm format, return it as is
          if (/^\d{2}:\d{2}$/.test(timeString)) {
            return timeString;
          }

          // If it's in HH:mm:ss format, remove the seconds
          if (/^\d{2}:\d{2}:\d{2}$/.test(timeString)) {
            return timeString.substring(0, 5);
          }

          // Handle AM/PM format
          if (timeString.includes("AM") || timeString.includes("PM")) {
            try {
              const [time, period] = timeString.split(" ");
              let [hours, minutes] = time.split(":");
              hours = parseInt(hours);

              // Convert to 24-hour format
              if (period === "PM" && hours !== 12) {
                hours += 12;
              } else if (period === "AM" && hours === 12) {
                hours = 0;
              }

              return `${hours.toString().padStart(2, "0")}:${minutes}`;
            } catch (err) {
              console.error("Error formatting time:", err);
              return "";
            }
          }

          // If it's in a different format, try to parse it
          try {
            const [hours, minutes] = timeString.split(":");
            return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
          } catch (err) {
            console.error("Error formatting time:", err);
            return "";
          }
        };

        return {
          id: item.id,
          title: item.title,
          description: item.description,
          startTime: formatTime(item.startTime),
          endTime: formatTime(item.endTime),
          normalStartTime: item.startTime,
          normalEndTime: item.endTime,
          meetingType: item.meetingType,
        };
      }),
    };
  } catch (error) {
    throw error.response.data;
  }
};
