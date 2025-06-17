import { Http } from "@Http";

export const ServiceFindById = async ({ id }) => {
  try {
    console.log("Me ejecuto");
    const resp = await Http(
      {},
      {
        base: "collaborator",
        entry: "findById",
        method: "GET",
        id: `/${id}`,
      }
    );

    const tecnical = resp.data.technical_onboarding.map((item) => ({
      technicalOnboarding: {
        id: item.technicalOnboarding.id,
        name: item.technicalOnboarding.name,
        description: item.technicalOnboarding.description,
        startDate: item.technicalOnboarding.startDate,
        endDate: item.technicalOnboarding.endDate,
        meetingUrl: item.technicalOnboarding.meetingUrl,
        notificationSent: item.technicalOnboarding.notificationSent,
        createdAt: item.technicalOnboarding.createdAt,
        updatedAt: item.technicalOnboarding.updatedAt,
      },
      assignments: item.assignments.map((assignment) => ({
        id: assignment.id,
        collaboratorId: assignment.collaboratorId,
        onboardingId: assignment.onboardingId,
        completed: assignment.completed,
        createdAt: assignment.createdAt,
        updatedAt: assignment.updatedAt,
      })),
    }));

    const welcome = resp.data.welcome_onboarding.map((item) => ({
      welcomeOnboarding: {
        id: item.welcomeOnboarding.id,
        name: item.welcomeOnboarding.name,
        description: item.welcomeOnboarding.description,
        startDate: item.welcomeOnboarding.startDate,
        endDate: item.welcomeOnboarding.endDate,
        meetingUrl: item.welcomeOnboarding.meetingUrl,
        notificationSent: item.welcomeOnboarding.notificationSent,
        createdAt: item.welcomeOnboarding.createdAt,
        updatedAt: item.welcomeOnboarding.updatedAt,
      },
      assignments: item.assignments.map((assignment) => ({
        id: assignment.id,
        collaboratorId: assignment.collaboratorId,
        onboardingId: assignment.onboardingId,
        completed: assignment.completed,
        createdAt: assignment.createdAt,
        updatedAt: assignment.updatedAt,
      })),
    }));

    return {
      status: resp.status,
      message: resp.message,
      data: {
        id: resp.data.id,
        name: resp.data.name,
        email: resp.data.email,
        entry_date: resp.data.entry_date,
        technical_onboarding_done: resp.data.technical_onboarding_done,
        welcome_onboarding_done: resp.data.welcome_onboarding_done,
        technical_onboarding: tecnical,
        welcome_onboarding: welcome,
      },
    };
  } catch (error) {
    throw error.response.data;
  }
};
