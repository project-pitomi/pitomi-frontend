import { Image } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const Manga = ({ id, src, isBookmarked, onBookmarkChanged }) => {
  const bookmarkIconStyle = {
    position: "absolute",
    right: 10,
    top: 10,
    fontSize: "32px",
    color: "grey",
  };

  const onBookmarkIconClicked = async () => {
    onBookmarkChanged(id, !isBookmarked);
  };

  return (
    <div style={{ position: "relative" }}>
      <Image
        src={src}
        style={{
          maxWidth: "512px",
          maxHeight: "512px",
          objectFit: "contain",
          backgroundColor: "#272733",
          border: "1px solid #663333",
        }}
      />
      {isBookmarked ? (
        <StarFilled style={bookmarkIconStyle} onClick={onBookmarkIconClicked} />
      ) : (
        <StarOutlined
          style={bookmarkIconStyle}
          onClick={onBookmarkIconClicked}
        />
      )}
    </div>
  );
};

export default Manga;
