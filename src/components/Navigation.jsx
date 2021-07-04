import { useState, useEffect } from "react";
import { Pagination } from "antd";
import { useRouter } from "next/router";

const Navigation = ({ total }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (idx) => {
    router.query.page = idx;
    router.push(router);
  };
  useEffect(() => {
    if (!router.isReady) return;
    setCurrentPage(parseInt(router.query.page || "1"));
  }, [router.isReady, router.query]);

  return (
    <Pagination onChange={onPageChange} current={currentPage} total={total} />
  );
};

export default Navigation;
