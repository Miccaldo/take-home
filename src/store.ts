import { create } from "zustand";
import { DeletedListItem, ListItem } from "./api/getListData.ts";

type State = {
    cards: ListItem[];
    deletedCards: DeletedListItem[];
};

type Actions = {
    deleteCard: (card: DeletedListItem) => void,
    setCards: (cards: ListItem[]) => void,
    expandCard: (cardId: number, expand: boolean) => void
};

export const useStore = create<State & Actions>((set) => ({
    cards: [],
    deletedCards: [],
    deleteCard: (card) => {
        set((state) => ({ deletedCards: [ ...state.deletedCards, card ]}))
    },
    setCards: (cards: ListItem[]) => {
        set((_) => ({cards}));
    },
    expandCard: (cardId, expand) => {
        set((state) => {
            const cardToExpand = state.cards.find(item => item.id === cardId);
            if(cardToExpand){
                cardToExpand.isExpanded = expand;
            }
            return { cards: [ ...state.cards]};
        })
    }
}));

export const { deleteCard, setCards, expandCard } = useStore.getState();
