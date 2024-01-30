import { DropResult } from "@hello-pangea/dnd";
import { Link } from "@prisma/client";
import { create } from "zustand";

export enum LinkType {
  Header = "HEADER",
  Classic = "CLASSIC",
}

type State = {
  links: Link[];
  order: string[];
  orderDbFormat: string;
};

type Action = {
  updateOrders: (result: DropResult) => void;
  addLink: (link: Link) => void;
  removeLink: (id: string) => void;
  updateLink: (link: Link) => void;
  setInitialLinksAndOrder: (links: Link[], order: string[]) => void;
};

export const useLinksStore = create<State & Action>((set) => ({
  links: [],
  order: [],
  orderDbFormat: "",
  setInitialLinksAndOrder: (initialLinks, initialOrder) =>
    set(() => ({
      links: [...initialLinks],
      order: [...initialOrder],
      orderDbFormat: initialOrder.join(","),
    })),
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
      const newOrder: string[] = state.links.map((link) => link.id);
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, draggableId);

      const newLinks: Link[] = newOrder.map((taskId: string, index) => {
        return {
          ...state.links.find((task) => task.id === taskId)!,
          position: newOrder.length - index - 1,
        };
      });

      return {
        links: newLinks,
        order: newOrder,
        orderDbFormat: newOrder.join(","),
      };
    }),
  addLink: (link) =>
    set((state) => ({
      links: [link, ...state.links],
      order: [link.id, ...state.order],
      orderDbFormat: [link.id, ...state.order].join(","),
    })),
  removeLink: (id) =>
    set((state) => {
      const newLinks = state.links.filter((link) => link.id !== id);
      return { links: newLinks };
    }),
  updateLink: (updatedLink) =>
    set((state) => {
      const newLinks: Link[] = state.links.map((link) => {
        if (link.id === updatedLink.id) {
          return updatedLink;
        } else {
          return link;
        }
      });
      return { links: newLinks };
    }),
}));
