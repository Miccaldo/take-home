import { FC } from "react";
import { ListItem } from "../api/getListData.ts";
import { DeleteButton, ToggleButton } from "./Buttons.tsx";
import { ChevronUpIcon } from "./icons.tsx";
import { useCard } from "../hooks/useCard.ts";

type CardProps = {
  id: ListItem['id'],
  isVisible: ListItem['isVisible'],
  title: ListItem["title"];
  description?: ListItem["description"];
  isExpanded: ListItem["isExpanded"];
  isDeleted?: boolean
};

export const Card: FC<CardProps> = ({ id, isVisible, title, description, isExpanded, isDeleted }) => {
  const { handleExpand, handleDelete } = useCard(id, isExpanded);

  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h3 className="font-medium">{title}</h3>
        <div className="flex">
          <ToggleButton onClick={handleExpand} className={`transition-all ${isExpanded ? 'rotate-180' : ''} ${isDeleted ? 'hidden' : 'block'}`}>
            <ChevronUpIcon />
          </ToggleButton>
          <DeleteButton onClick={() => {
            if(!isDeleted){
              handleDelete({ id, isVisible, title})
            }else{
              /*
                TODO

                Restoring cards logic.
              */
            }
          }} />
        </div>
      </div>
      <p className={`text-sm overflow-hidden transition-all ${!isExpanded ? 'max-h-0' : 'max-h-40'}`}>{description}</p>
    </div>
  );
};
