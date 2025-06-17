import { useMemo } from "react";
import {
  Table as NextTable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { cn } from "@Utils";
import { ThemeBasic } from "@Theme";
import { Spinner } from "@Components";

const Table = ({
  bottomContent,
  selectedKeys,
  topContent,
  headerColumns,
  sortedItems,
  renderCell,
  setSelectedKeys,
  itemKey,
  loading,
  emptyContent,
  disabledSelection,
  customWidths = () => {},
}) => {
  const classNames = useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "w-full", "shadow-none"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]/tr:first:before:rounded-none",
        "group-data-[first=true]/tr:last:before:rounded-none",
        // middle
        "group-data-[middle=true]/tr:before:rounded-none",
        // last
        "group-data-[last=true]/tr:first:before:rounded-none",
        "group-data-[last=true]/tr:last:before:rounded-none",
      ],
    }),
    []
  );

  const addProps = disabledSelection ? {} : { selectionMode: "multiple" };

  return (
    <NextTable
      isCompact
      aria-label="Tabla custom de perfiles para Avent ID"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: cn(
            ThemeBasic.checkBox,
            "after:text-background text-background"
          ),
        },
      }}
      classNames={classNames}
      selectedKeys={selectedKeys}
      {...addProps}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        loadingState={loading ? "loading" : "idle"}
        emptyContent={emptyContent}
        items={sortedItems}
        loadingContent={<Spinner />}
      >
        {(item) => (
          <TableRow key={item[itemKey]}>
            {(columnKey) => (
              <TableCell className={cn(customWidths(columnKey))}>
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </NextTable>
  );
};

Table.propTypes = {
  bottomContent: PropTypes.object,
  selectedKeys: PropTypes.object,
  topContent: PropTypes.object,
  headerColumns: PropTypes.array,
  sortedItems: PropTypes.array,
  renderCell: PropTypes.func,
  setSelectedKeys: PropTypes.func,
  itemKey: PropTypes.string,
  loading: PropTypes.bool,
  emptyContent: PropTypes.string,
  disabledSelection: PropTypes.bool,
  customWidths: PropTypes.func,
};

export default Table;
