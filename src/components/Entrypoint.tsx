import { useEffect, useState } from "react";
import { ListItem, useGetListData } from "../api/getListData";
import { Card } from "./Card.tsx";
import { Spinner } from "./Spinner";
import { useStore, setCards } from "../store.ts";

export const Entrypoint = () => {
  const [showDeletedCards, setShowDeletedCards] = useState(true);
  const deletedCards = useStore((state) => state.deletedCards);
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const listQuery = useGetListData();

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    setVisibleCards(listQuery.data?.filter((item) => item.isVisible && !deletedCards.some(deletedItem => item.id === deletedItem.id)) ?? []);
    listQuery.data && setCards(listQuery.data);
  }, [listQuery.data, listQuery.isLoading, deletedCards, listQuery.isFetching]);

  if (listQuery.isLoading || listQuery.isFetching) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <h2 className="mb-1 font-medium text-lg">My Awesome List ({visibleCards.length})</h2>
        <div className="flex flex-col gap-y-3">
          {visibleCards.map((card) => (
            <Card key={card.id} id={card.id} isVisible={card.isVisible} title={card.title} description={card.description} isExpanded={card.isExpanded} />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h2 className="mb-1 font-medium text-lg">Deleted Cards ({deletedCards.length})</h2>
          <div>
            <button
              disabled={deletedCards.length === 0}
              className="mr-2 text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
              onClick={() => setShowDeletedCards(!showDeletedCards)}
            >
              Reveal
            </button>
            <button
              className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
              onClick={() => listQuery.refetch()}
            >
              Refresh
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          {showDeletedCards && deletedCards.map((card) => (
            <Card key={card.id} id={card.id} isVisible={card.isVisible} title={card.title} isExpanded={false} isDeleted={true} />
          ))}
        </div>
      </div>
    </div>
  );
};
