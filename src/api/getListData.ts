import { useQuery } from "@tanstack/react-query";
import { useStore } from "../store";
import mockJson from "./mock.json";

export type ListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
  isExpanded: boolean
};

export type DeletedListItem = Omit<ListItem, "description" | "isExpanded">;

export const useGetListData = () => {
  const currentCards = useStore((state) => state.cards);
  const query = useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      await sleep(1000);

      if (getRandom() > 85) {
        console.error("An unexpected error occurred!");
        throw new Error("👀");
      }

      const mockData = mockJson as Omit<ListItem, "isVisible">[];

      return shuffle(mockData).map((item) => {
        const currentItem = currentCards.find(currentCard => currentCard.id === item.id);
        const isExpanded = currentItem ? currentItem.isExpanded : false;
        return { ...item, isVisible: getRandom() > 50 ? true : true, isExpanded };
      });
    },
  });

  return query;
};

const getRandom = () => Math.floor(Math.random() * 100);

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffle = <T extends any[]>(array: T): T => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
