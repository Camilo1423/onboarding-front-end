import { Http } from "@Http";

export const ServiceGetAllCollaborators = async ({
  page,
  itemsPerPage,
  filterValue,
}) => {
  try {
    console.log("Me ejecuto")
    const resp = await Http(
      {},
      {
        base: "collaborator",
        entry: "getAll",
        method: "GET",
        id: `?page=${page}&limit=${itemsPerPage}&search=${filterValue}`,
      }
    );
    return {
      status: resp.status,
      message: resp.message,
      data: {
        page: resp.data.page_number,
        totalItems: resp.data.total_items,
        itemsPerPage: resp.data.page_size,
        items: resp.data.collaborators.map((collab) => ({
          id: collab.id,
          name: collab.name,
          email: collab.email,
          entry_date: collab.entry_date,
          technical_onboarding_done: collab.technical_onboarding_done,
          welcome_onboarding_done: collab.welcome_onboarding_done,
        })),
      },
    };
  } catch (error) {
    throw error.response.data;
  }
};
