import { useStore, expandCard } from "../store";
import { DeletedListItem } from "../api/getListData";

export const useCard = (cardId: number, isExpanded:boolean) => {
    const deleteCard = useStore((state) => state.deleteCard);

    const handleExpand = () => {
        expandCard(cardId, !isExpanded);
    }

    const handleDelete = (card: DeletedListItem) => {
        deleteCard(card);
    }

    return {
        handleExpand,
        handleDelete
    }
}