import Link from "next/link";
import { Row, Col, Card, Tag } from "antd";
import { useRouter } from "next/router";

const MangaInfo = ({ info, prefetch }) => {
  const { id, title, artists, group, type, series, characters, tags } = info;

  return (
    <Card
      key={id}
      title={<Link href={`/viewer/${id}`}>{title}</Link>}
      style={{ flex: 1, maxWidth: "100%" }}
      bodyStyle={{ padding: "8px" }}
    >
      <Row style={{ minWidth: "200px" }}>
        <Col span={6}>Artists</Col>
        <Col span={18}>
          {(artists || ["N/A"]).map((artist, i) => (
            <div
              key={i}
              style={{ display: "inline-block", padding: "0 1em 0 0" }}
            >
              <Link
                href={{
                  pathname: "/",
                  query: {
                    filter: JSON.stringify({ artists: [artist] }),
                    selected: [`${artist}:artist`],
                  },
                }}
              >
                {artist}
              </Link>
            </div>
          ))}
        </Col>
      </Row>
      <Row style={{ minWidth: "200px" }}>
        <Col span={6}>Groups</Col>
        <Col span={18}>
          {group.map((g, i) => (
            <div
              key={i}
              style={{ display: "inline-block", padding: "0 1em 0 0" }}
            >
              <Link
                href={{
                  pathname: "/",
                  query: {
                    filter: JSON.stringify({ groups: [g] }),
                    selected: [`${g}:group`],
                  },
                }}
              >
                {g}
              </Link>
            </div>
          ))}
        </Col>
      </Row>
      <Row style={{ minWidth: "200px" }}>
        <Col span={6}>Type</Col>
        <Col span={18}>
          {/* <Link
            href={{
              pathname: "/",
              query: { filter: JSON.stringify({ types: [type] }), selected: [`${type}:type`] },
            }}
          > */}
          {type}
          {/* </Link> */}
        </Col>
      </Row>
      <Row style={{ minWidth: "200px" }}>
        <Col span={6}>Series</Col>
        <Col span={18}>
          {series.map((s, i) => (
            <div
              key={i}
              style={{ display: "inline-block", padding: "0 1em 0 0" }}
            >
              <Link
                href={{
                  pathname: "/",
                  query: {
                    filter: JSON.stringify({ series: [s] }),
                    selected: [`${s}:series`],
                  },
                }}
              >
                {s}
              </Link>
            </div>
          ))}
        </Col>
      </Row>
      <Row style={{ minWidth: "300px" }}>
        <Col span={6}>Characters</Col>
        <Col span={18}>
          {characters.map((character, i) => (
            <div
              key={i}
              style={{ display: "inline-block", padding: "0 1em 0 0" }}
            >
              {character}
            </div>
          ))}
        </Col>
      </Row>
      <Row style={{ minWidth: "200px" }}>
        <Col span={6}>Tags</Col>
        <Col span={18}>
          {(tags || []).map(({ tag, male, female }, i) => {
            let color = "";
            if (male) color = "blue";
            if (female) color = "magenta";
            return (
              <Link
                href={{
                  pathname: "/",
                  query: {
                    filter: JSON.stringify({ tags: [{ tag, male, female }] }),
                    selected: [
                      `${tag}:${male ? "male " : female ? "female " : ""}tag`,
                    ],
                  },
                }}
                key={i}
              >
                <Tag
                  color={color}
                  style={{ margin: "4px 4px 4px 4px", cursor: "pointer" }}
                >
                  {tag}
                </Tag>
              </Link>
            );
          })}
        </Col>
      </Row>
    </Card>
  );
};

export default MangaInfo;
