import { Table } from "@Components";
import { usePagination } from "@Hooks";
import { ServiceGetAllCollaborators } from "@Services";
import { ThemeBasic } from "@Theme";
import { cn, formatDateOnly } from "@Utils";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
} from "@nextui-org/react";
import {
  EllipsisVertical,
  EyeIcon,
  PencilIcon,
  Search,
  TrashIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import CreateCP from "./components/Create.cp";
import UpdateCP from "./components/Update.cp";
import DeleteCP from "./components/Delete.cp";
import ViewCp from "./components/View.cp";

const headerColumns = [
  { name: "Nombre", uid: "name" },
  { name: "Fecha de ingreso", uid: "entry_date" },
  { name: "Estado en onboarding técnico", uid: "technical_onboarding_done" },
  {
    name: "Estado en onboarding de bienvenida",
    uid: "welcome_onboarding_done",
  },
  { name: "Acciones", uid: "actions" },
];

const TableAdmin = () => {
  const initialState = {
    filterValue: "",
  };

  const [filterValue, setFilterValue] = useState(initialState.filterValue);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [ModalsIsView, setModalsIsView] = useState({
    isView: 0,
    isEdit: 0,
    isDelete: 0,
  });
  const [reloadData, setReloadData] = useState(0);

  const handlerReloadData = useCallback(() => {
    setReloadData(reloadData + 1);
  }, [reloadData]);

  const handlerModalsIsView = useCallback((key, collaborator) => {
    setModalsIsView((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }));
    setSelectedCollaborator(collaborator);
  }, []);

  // Pagination;
  const {
    data,
    setLimit,
    totalItems,
    totalPages,
    currentPage,
    onPageChange,
    itemsPerPage,
    onSearch,
    loading,
    reload,
  } = usePagination(
    ServiceGetAllCollaborators,
    { filterValue },
    300,
    "collaborators_limit",
    initialState,
    true
  );

  // ================================================

  useEffect(() => {
    onSearch({ filterValue });
  }, [filterValue, itemsPerPage]);

  useEffect(() => {
    if (reloadData > 0) {
      reload();
    }
  }, [reloadData]);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onRowsPerPageChange = useCallback((e) => {
    setLimit(Number(e.target.value));
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex items-center w-full gap-2">
            <Input
              isClearable
              classNames={{
                base: "w-full sm:max-w-[44%]",
                inputWrapper: cn(
                  "border",
                  ThemeBasic.focusBorderData,
                  ThemeBasic.hoverBorderData
                ),
              }}
              placeholder="Buscar por nombre..."
              size="sm"
              startContent={
                <Search className={cn("w-5 h-5", ThemeBasic.text)} />
              }
              value={filterValue}
              variant="bordered"
              onClear={() => setFilterValue("")}
              onValueChange={onSearchChange}
            />
          </div>
          <CreateCP reloadData={handlerReloadData} />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {totalItems} colaboradores
          </span>
          <label className="flex items-center text-default-400 text-small">
            Colaboradores por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              value={itemsPerPage}
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    onRowsPerPageChange,
    totalItems,
    itemsPerPage,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: cn(ThemeBasic.backgroundPrimary),
          }}
          page={currentPage}
          total={totalPages}
          variant="light"
          onChange={onPageChange}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos los perfiles seleccionados"
            : `${selectedKeys.size} de ${totalItems} seleccionados`}
        </span>
      </div>
    );
  }, [selectedKeys, totalItems, currentPage, totalPages, onPageChange]);

  const renderCell = useCallback((collab, columnKey) => {
    const cellValue = collab[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium">
                {cellValue.trim().charAt(0)}
              </span>
            </div>
            <div className="flex flex-col items-start">
              <span className="hidden md:inline text-sm font-medium">
                {cellValue.trim()}
              </span>
              <span className="hidden md:inline text-xs text-gray-500">
                {collab.email}
              </span>
            </div>
          </div>
        );
      case "entry_date":
        return (
          <span>
            <Chip
              variant="bordered"
              className={cn(
                ThemeBasic.backgroundPrimary,
                ThemeBasic.textWhite,
                ThemeBasic.border
              )}
              size="md"
            >
              {formatDateOnly(cellValue)}
            </Chip>
          </span>
        );
      case "technical_onboarding_done":
        return (
          <span>
            <Chip
              variant="bordered"
              className={cn(
                cellValue
                  ? ThemeBasic.backgroundPrimary
                  : ThemeBasic.backgroundSecondary,
                ThemeBasic.textWhite,
                cellValue ? ThemeBasic.border : ThemeBasic.borderSecondary
              )}
              size="md"
            >
              {cellValue
                ? "Completado en onboarding técnico"
                : "Pendiente en onboarding técnico"}
            </Chip>
          </span>
        );
      case "welcome_onboarding_done":
        return (
          <span>
            <Chip
              variant="bordered"
              className={cn(
                cellValue
                  ? ThemeBasic.backgroundPrimary
                  : ThemeBasic.backgroundSecondary,
                ThemeBasic.textWhite,
                cellValue ? ThemeBasic.border : ThemeBasic.borderSecondary
              )}
              size="md"
            >
              {cellValue
                ? "Completado en onboarding de bienvenida"
                : "Pendiente en onboarding de bienvenida"}
            </Chip>
          </span>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown
              showArrow
              className="bg-background border-1 border-default-200"
            >
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <EllipsisVertical className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  onPress={() => handlerModalsIsView("isEdit", collab)}
                  startContent={<PencilIcon className="w-5 h-5" />}
                >
                  Editar
                </DropdownItem>
                <DropdownItem
                  onPress={() => handlerModalsIsView("isView", collab)}
                  startContent={<EyeIcon className="w-5 h-5" />}
                >
                  Ver detalles
                </DropdownItem>
                <DropdownItem
                  onPress={() => handlerModalsIsView("isDelete", collab)}
                  startContent={<TrashIcon className="w-5 h-5" />}
                  color="danger"
                >
                  Eliminar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <Table
          sortedItems={data}
          headerColumns={headerColumns}
          topContent={topContent}
          bottomContent={bottomContent}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          itemKey="id"
          renderCell={renderCell}
          loading={loading}
          disabledSelection
          emptyContent="No hay colaboradores en el sistema"
        />
      </div>
      <UpdateCP
        collaborator={selectedCollaborator}
        reloadData={handlerReloadData}
        openModalCount={ModalsIsView.isEdit}
      />
      <DeleteCP
        collaborator={selectedCollaborator}
        reloadData={handlerReloadData}
        openModalCount={ModalsIsView.isDelete}
      />
      <ViewCp
        collaborator={selectedCollaborator}
        openModalCount={ModalsIsView.isView}
      />
    </>
  );
};

export default TableAdmin;
