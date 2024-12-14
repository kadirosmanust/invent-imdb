import { Pagination as AntdPagination } from 'antd';

type PaginationProps = {
  currentPage?: number;
  totalSize?: number;
  pageSize?: number;
  onChange?: (page: number) => void;
};

const Pagination = ({
  currentPage = 1,
  totalSize,
  pageSize = 10,
  onChange,
}: PaginationProps) => {
  return (
    <AntdPagination
      align="center"
      current={currentPage}
      pageSize={pageSize}
      onChange={onChange}
      total={totalSize}
      showSizeChanger={false}
    />
  );
};

export default Pagination;
