import Manga from "./Manga";
import MangaInfo from "./MangaInfo";

const Mangas = ({ mangas, prefetch, onBookmarkChanged }) => {
  return mangas.map((manga, i) => {
    return (
      <div key={i} style={{ display: "flex", flexWrap: "wrap", margin: "8px" }}>
        <Manga
          id={manga.id}
          src={manga.thumbnail_webp}
          isBookmarked={manga.isBookmarked}
          onBookmarkChanged={onBookmarkChanged}
        />
        <MangaInfo info={manga} prefetch={prefetch} />
      </div>
    );
  });
};

export default Mangas;
