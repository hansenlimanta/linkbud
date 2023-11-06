import { DropResult } from "@hello-pangea/dnd";
import { create } from "zustand";

export type Link = {
  id: string;
  name: string;
  url: string;
};

type State = {
  links: Link[];
  order: string[];
};

type Action = {
  updateOrders: (result: DropResult) => void;
  addLink: (link: Link) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  links: [
    {
      id: "link-1",
      name: "Portfolio",
      url: "https://www.hansenlimanta.com",
    },
    {
      id: "link-2",
      name: "Instagram",
      url: "https://www.hansenlimanta.com",
    },
    {
      id: "link-3",
      name: "LinkedIn",
      url: "https://www.hansenlimanta.com",
    },
    {
      id: "link-4",
      name: "Tiktok",
      url: "https://www.hansenlimanta.com",
    },
  ],
  order: ["link-1", "link-2", "link-3", "link-4"],
  updateOrders: (result) =>
    set((state) => {
      const { destination, source, draggableId } = result;
      if (!destination) return { ...state };
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return { ...state };
      }
      const newOrder: string[] = [...state.order];
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, draggableId);

      const newLinks: Link[] = newOrder.map((taskId: string) => {
        return state.links.find((task) => task.id === taskId) as Link;
      });

      return { links: newLinks, order: newOrder };
    }),
  addLink: (link) =>
    set((state) => ({
      links: [link, ...state.links],
      order: [link.id, ...state.order],
    })),
}));
