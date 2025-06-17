import { Http } from "@Http";

export const ServiceDeleteOnboarding = async ({ id, type }) => {
  try {
    const resp = await Http(
      {},
      {
        base: "onboarding",
        entry: "delete-onboarding",
        method: "DELETE",
        id: `?id=${id}&type=${type}`,
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
