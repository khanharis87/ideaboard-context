import "./App.css";

import IdeaBoard from "./components/IdeaBoard";
import NewIdeaForm from "./components/NewIdeaFrom";
import Idea from "./components/Idea";
import Button from "./components/Button";
import { useContext } from "react";
import { IdeaContext } from "./state/IdeaContext";
export type IdeaType = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at?: string;
  editing?: boolean;
};

function App() {
  const { ideas, addIdea, startEditItem, deleteIdea } = useContext(IdeaContext);
  return (
    <>
      <h1 className="text-5xl mb-8">Idea Board</h1>
      <NewIdeaForm onSubmit={addIdea} />
      <IdeaBoard>
        {ideas.map((idea) => (
          <li key={idea?.id} className="flex flex-col">
            <Idea idea={idea} />
            {!idea?.editing && (
              <div className="flex gap-2">
                <Button
                  className="bg-blue-400 text-white"
                  onClick={() => startEditItem(idea)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-600 text-white"
                  onClick={() => deleteIdea(idea)}
                >
                  Delete
                </Button>
              </div>
            )}
          </li>
        ))}
      </IdeaBoard>
    </>
  );
}

export default App;
