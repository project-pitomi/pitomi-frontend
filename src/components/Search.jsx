import { useState, useEffect } from "react";
import { Select, Form, Button, Row, Col } from "antd";
import { getAuthHeader } from "../util";
import { useRouter } from "next/router";

const { Option } = Select;

const candidateTypeToLabelCategory = {
  ARTIST: "artist",
  GROUP: "group",
  SERIES: "series",
  TYPE: "type",
  TAG: "tag",
  TAG_MALE: "male tag",
  TAG_FEMALE: "female tag",
};

const candidateTypeToFilterField = {
  ARTIST: "artists",
  GROUP: "groups",
  SERIES: "series",
  TYPE: "types",
  TAG: "tags",
  TAG_MALE: "tags",
  TAG_FEMALE: "tags",
};

const campareSearchCandidate = ({ value: u }, { value: v }) => {
  if (u < v) {
    return -1;
  }
  if (v < u) {
    return 1;
  }
  return 0;
};

const Search = () => {
  const router = useRouter();
  const [children, setChildren] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleFormSubmit = () => {
    const selectedList = Array.isArray(selected) ? selected : [selected];
    const queryFilter = JSON.stringify(
      selectedList.reduce((acc, val) => {
        const { value, type } = window.searchCandidatesValueToData[val];
        const fieldName = candidateTypeToFilterField[type];
        if (!acc.hasOwnProperty(fieldName)) acc[fieldName] = [];
        if (type == "TAG") {
          acc[fieldName].push({ tag: value });
        } else if (type == "TAG_MALE") {
          acc[fieldName].push({ tag: value, male: 1 });
        } else if (type == "TAG_FEMALE") {
          acc[fieldName].push({ tag: value, female: 1 });
        } else {
          acc[fieldName].push(value);
        }
        return acc;
      }, {})
    );
    router.push({
      pathname: "/",
      query: {
        filter: queryFilter,
        selected,
      },
    });
  };

  useEffect(async () => {
    if (window.searchCandidates) {
      setChildren(window.searchCandidates);
      return;
    }

    const endpoint = `/graphql`;
    const query = `
    query SearchCandidates {
      searchCandidates {
        value
        type
      }
    }
    `;
    const fetchSearchCandidates = async () => {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      });
      const { data, errors } = await resp.json();
      if (errors) {
        if (
          errors.some((element) => {
            return element.message === "Authentication failed";
          })
        ) {
          router.push("/login");
        }
        return [];
      }
      return data.searchCandidates;
    };
    window.searchCandidates = (await fetchSearchCandidates())
      .sort(campareSearchCandidate)
      .map(({ value, type }, i) => ({
        data: { value, type },
        value: `${value}:${candidateTypeToLabelCategory[type]}`,
      }));
    window.searchCandidatesValueToData = window.searchCandidates.reduce(
      (acc, { data, value }) => {
        acc[value] = data;
        return acc;
      },
      {}
    );
    setChildren(window.searchCandidates);
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    setSelected(router.query.selected);
    console.log(selected);
  }, [router.isReady, router.query]);

  return (
    <Form onSubmit={handleFormSubmit}>
      <Row>
        <Col flex="auto">
          <Form.Item style={{ margin: 0 }}>
            <Select
              mode="multiple"
              placeholder="Search galleries"
              allowClear
              options={children}
              filterOption={(input, option) =>
                option.value.toLowerCase().startsWith(input.toLowerCase())
              }
              onChange={(values) => setSelected(values)}
              value={selected}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item style={{ width: "fit-content", margin: 0 }}>
            <Button type="primary" htmlType="submit" onClick={handleFormSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Search;
