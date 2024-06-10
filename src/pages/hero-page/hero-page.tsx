import { Hero } from "@/@types/marvel-api-response.types";
import { useLoaderData } from "react-router-dom";

const INDEX_TO_LAST_ITEM = -1;
export function HeroPage() {
  const hero = useLoaderData() as Hero;

  return (
    <div>
      <main>
        <div>
          <h1>{hero?.name}</h1>

          <p>
            {hero?.description ||
              "Esse herói não tem descrição, mas é muito legal!"}
          </p>

          <div>
            <div id="contents-number">
              <span>
                Quadrinhos: <strong>{hero?.comics.available}</strong>
              </span>

              <span>
                Séries: <strong>{hero?.series.available}</strong>
              </span>

              <span>
                Histórias: <strong>{hero?.stories.available}</strong>
              </span>
            </div>

            <div>
              {/* Não encontrado na API */}
              Rating: <strong>{"algo"}</strong>
            </div>

            <div>
              ultimo quadrinho:{" "}
              <strong>
                {hero?.comics?.items.at(INDEX_TO_LAST_ITEM)?.name ??
                  "não tem quadrinhos"}
              </strong>
            </div>
          </div>
        </div>
        <div></div>
      </main>
    </div>
  );
}
