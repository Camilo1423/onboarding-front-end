import { Http } from "@Http";

export const ServiceUpdateOnboarding = async ({
  id,
  type,
  name_onboarding,
  description_onboarding,
  start_date,
  end_date,
  new_collaborator_ids,
  deleted_collaborator_ids,
}) => {
  try {
    const resp = await Http(
      {
        id_onboarding: id,
        type,
        name_onboarding,
        description_onboarding,
        start_date,
        end_date,
        new_collaborator_ids,
        removed_collaborator_ids: deleted_collaborator_ids,
      },
      {
        base: "onboarding",
        entry: "update-onboarding",
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
