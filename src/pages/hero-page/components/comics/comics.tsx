import styles from "./comics.module.css";

import { ConditionalRender } from "@/components";

import { ComicCard } from "../comic-card";
import { ComicsProperties } from "./comics.types";

const VOID_ARRAY_LENGTH = 0;

export function Comics({ comics, hero }: ComicsProperties) {
  return (
    <div id="comics">
      <h2 className={styles.comics_title}>Últimos lançamentos</h2>
      <ConditionalRender
        condition={comics.length > VOID_ARRAY_LENGTH}
        Otherwise={<h3>Não há quadrinhos...</h3>}>
        <ul className={styles.comics_wrapper}>
          {comics.map(({ data: comic, isLoading }) => (
            <ConditionalRender
              condition={!isLoading && !!comic}
              key={`${comic?.title}-${hero?.name}`}>
              <li>
                <ComicCard comic={comic!} />
              </li>
            </ConditionalRender>
          ))}
        </ul>
      </ConditionalRender>
    </div>
  );
}
