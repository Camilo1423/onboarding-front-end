import { Http } from "@Http";
import { transformOnboardingData } from "@Utils/transform-onboarding-data";

export const ServiceGetDetailedOnboarding = async ({ id }) => {
  try {
    const resp = await Http(
      {},
      {
        base: "onboarding",
        entry: "get-detailed-onboarding",
        method: "GET",
        id: `?id=${id}`,
      }
    );
    return {
      status: resp.status,
      message: resp.message,
      data: transformOnboardingData(resp.data),
    };
  } catch (error) {
    throw error.response.data;
  }
};
