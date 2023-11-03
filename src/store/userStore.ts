import { DropResult } from "@hello-pangea/dnd";
import { create } from "zustand";

type Link = {
  id: string;
  content: string;
  url: string;
};

type State = {
  links: Link[];
  order: string[];
};

type Action = {
  updateOrders: (result: DropResult) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  links: [
    {
      id: "task-1",
      content: "Take out the garbage",
      url: "https://www.hansenlimanta.com",
    },
    {
      id: "task-2",
      content: "Watch my favorite show",
      url: "https://www.hansenlimanta.com",
    },
    {
      id: "task-3",
      content: "Charge my phone",
      url: "https://www.hansenlimanta.com",
    },
    {
      id: "task-4",
      content: "Cook dinner",
      url: "https://www.hansenlimanta.com",
    },
  ],
  order: ["task-1", "task-2", "task-3", "task-4"],
  updateOrders: (result) =>
    set((state: State) => {
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
}));
