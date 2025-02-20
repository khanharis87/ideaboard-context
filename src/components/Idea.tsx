import { useContext } from "react";
import type { IdeaType } from "../App";
import NewIdeaForm from "./NewIdeaFrom";
import { IdeaContext } from "../state/IdeaContext";

export default function Idea({ idea }: { idea: IdeaType }) {
  const { submitEditItem } = useContext(IdeaContext);

  return (
    <div className="flex flex-co;" key={idea?.id}>
      {idea?.editing ? (
        <NewIdeaForm idea={idea} onSubmit={submitEditItem} />
      ) : (
        <div className="flex flex-col items-start">
          <h2 className="text-3xl">{idea?.title}</h2>
          <time className="text-xs font-extralight">
            <span className="pr-1">Created at:</span>
            {idea?.created_at}
          </time>
          {idea?.updated_at && (
            <>
              <time className="text-xs font-extralight">
                <span className="pr-1">Updated at:</span>
                {idea.updated_at}
              </time>
            </>
          )}
          <p className="text-xl mt-2 font-extralight">{idea?.description}</p>
        </div>
      )}
    </div>
  );
}
