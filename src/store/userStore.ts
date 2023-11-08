import { DropResult } from "@hello-pangea/dnd";
import { create } from "zustand";

export enum LinkType {
  Header = "HEADER",
  Link = "LINK",
}

export type Link = {
  id: string;
  title: string;
  url: string;
  isActive: boolean;
  type: LinkType;
};

type State = {
  links: Link[];
  order: string[];
};

type Action = {
  updateOrders: (result: DropResult) => void;
  addLink: (link: Link) => void;
  removeLink: (id: string) => void;
  updateLink: (link: Link) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  links: [
    {
      id: "link-1",
      title: "Portfolio",
      url: "https://www.hansenlimanta.com",
      isActive: true,
      type: LinkType.Link,
    },
    {
      id: "link-2",
      title: "Instagram",
      url: "https://www.hansenlimanta.com",
      isActive: true,
      type: LinkType.Link,
    },
    {
      id: "link-3",
      title: "LinkedIn",
      url: "https://www.hansenlimanta.com",
      isActive: true,
      type: LinkType.Link,
    },
    {
      id: "link-4",
      title: "Tiktok",
      url: "https://www.hansenlimanta.com",
      isActive: true,
      type: LinkType.Link,
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
  removeLink: (id) =>
    set((state) => {
      const newLinks = state.links.filter((link) => link.id !== id);
      const newOrder = state.order.filter((linkId) => linkId !== id);
      return { links: newLinks, order: newOrder };
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
