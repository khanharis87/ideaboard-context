import { createContext, useReducer } from "react";
import { IdeaType } from "../App";

type ActionType = "ADD_IDEA" | "EDIT_IDEA" | "DELETE_IDEA" | "START_EDIT_IDEA";
type IdeaAction = {
  type: ActionType;
  payload: IdeaType;
};

interface IdeaContextProps {
  ideas: IdeaType[];
  dispatch: React.Dispatch<IdeaAction>;
  addIdea: (idea: IdeaType) => void;
  submitEditItem: (idea: IdeaType) => void;
  startEditItem: (idea: IdeaType) => void;
  deleteIdea: (idea: IdeaType) => void;
}

const reducer = (state: IdeaType[], action: IdeaAction) => {
  switch (action.type) {
    case "ADD_IDEA":
      return [action.payload, ...state];
    case "EDIT_IDEA":
      return state.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
    case "START_EDIT_IDEA":
      return state.map((i) =>
        i.id === action.payload.id ? { ...i, editing: true } : i
      );
    case "DELETE_IDEA":
      return state.filter((i) => i.id !== action.payload.id);
    default:
      return state;
  }
};

export const IdeaContext = createContext<IdeaContextProps>({
  ideas: [] as IdeaType[],
  dispatch: (action: IdeaAction) => {},
  addIdea: () => {},
  submitEditItem: () => {},
  startEditItem: () => {},
  deleteIdea: () => {},
});

export function IdeaProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [ideas, dispatch] = useReducer(reducer, []);

  const addIdea = (idea: IdeaType) => {
    dispatch({ type: "ADD_IDEA", payload: idea });
  };

  const submitEditItem = (idea: IdeaType) => {
    dispatch({ type: "EDIT_IDEA", payload: idea });
  };

  const startEditItem = (idea: IdeaType) => {
    dispatch({ type: "START_EDIT_IDEA", payload: idea });
  };

  const deleteIdea = (idea: IdeaType) => {
    dispatch({ type: "DELETE_IDEA", payload: idea });
  };

  return (
    <IdeaContext.Provider
      value={{
        ideas,
        dispatch,
        addIdea,
        submitEditItem,
        startEditItem,
        deleteIdea,
      }}
    >
      {children}
    </IdeaContext.Provider>
  );
}
