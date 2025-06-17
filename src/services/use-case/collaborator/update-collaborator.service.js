import { Http } from "@Http";

export const ServiceUpdateCollaborator = async ({
  id,
  name,
  email,
  entryDate,
  technicalOnboardingDone,
  welcomeOnboardingDone,
}) => {
  try {
    const resp = await Http(
      {
        id,
        name_collaborator: name,
        email_collaborator: email,
        entry_date: entryDate,
        technical_onboarding_done: technicalOnboardingDone,
        welcome_onboarding_done: welcomeOnboardingDone,
      },
      {
        base: "collaborator",
        entry: "update",
        method: "PUT",
      }
    );
    return {
      status: resp.status,
      message: resp.message,
    };
  } catch (error) {
    throw error.response.data;
  }
};
