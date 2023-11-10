import { DropResult } from "@hello-pangea/dnd";
import { create } from "zustand";

export enum LinkType {
  Header = "HEADER",
  Classic = "CLASSIC",
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
};

type Action = {
  updateOrders: (result: DropResult) => void;
  addLink: (link: Link) => void;
  removeLink: (id: string) => void;
  updateLink: (link: Link) => void;
};

export const useLinksStore = create<State & Action>((set) => ({
  links: [
    {
      id: "header-1",
      title: "Portfolio",
      url: "",
      isActive: true,
      type: LinkType.Header,
    },
    {
      id: "link-1",
      title: "Portfolio",
      url: "https://www.hansenlimanta.com",
      isActive: true,
      type: LinkType.Classic,
    },
    {
      id: "link-2",
      title: "Instagram",
      url: "https://www.hansenlimanta.com",
      isActive: true,
      type: LinkType.Classic,
    },
    {
      id: "link-3",
      title: "LinkedIn",
      url: "https://www.hansenlimanta.com",
      isActive: true,
      type: LinkType.Classic,
    },
    {
      id: "link-4",
      title: "Tiktok",
      url: "https://www.hansenlimanta.com",
      isActive: true,
      type: LinkType.Classic,
    },
  ],
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

      const newLinks: Link[] = newOrder.map((taskId: string) => {
        return state.links.find((task) => task.id === taskId) as Link;
      });

      return { links: newLinks };
    }),
  addLink: (link) =>
    set((state) => ({
      links: [link, ...state.links],
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
