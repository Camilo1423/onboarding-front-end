import { Http } from "@Http";

export const ServiceCreateOnboarding = async ({
  type,
  name_onboarding,
  description_onboarding,
  start_date,
  end_date,
  collaborator_ids,
}) => {
  try {
    const resp = await Http(
      {
        type,
        name_onboarding,
        description_onboarding,
        start_date,
        end_date,
        collaborator_ids,
      },
      {
        base: "onboarding",
        entry: "create-onboarding",
        method: "POST",
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
