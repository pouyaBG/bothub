import React from "react";
import { CaretUp, CaretDown } from "phosphor-react";
import { cn } from "../../lib/utils";

export interface Column<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
  width?: string;
  align?: "right" | "left" | "center";
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  onSort?: (key: keyof T, direction: "asc" | "desc") => void;
  sortBy?: keyof T;
  sortDirection?: "asc" | "desc";
  className?: string;
  rowKey?: keyof T;
  onRowClick?: (record: T) => void;
  selectedRows?: T[];
  onRowSelect?: (record: T, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  emptyMessage?: string;
}

const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  onSort,
  sortBy,
  sortDirection,
  className,
  rowKey = "id" as keyof T,
  onRowClick,
  selectedRows = [],
  onRowSelect,
  onSelectAll,
  emptyMessage = "داده‌ای یافت نشد",
}: DataTableProps<T>) => {
  const handleSort = (key: keyof T) => {
    if (!onSort) return;

    const direction = sortBy === key && sortDirection === "asc" ? "desc" : "asc";
    onSort(key, direction);
  };

  const isRowSelected = (record: T) => {
    return selectedRows.some(row => row[rowKey] === record[rowKey]);
  };

  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0;

  return (
    <div className={cn("bg-slate-800 rounded-lg border border-slate-700", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              {onRowSelect && (
                <th className="text-right py-3 px-4 w-12">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={input => {
                      if (input) input.indeterminate = someSelected && !allSelected;
                    }}
                    onChange={(e) => onSelectAll?.(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    "py-3 px-4 font-semibold text-slate-300",
                    column.align === "center" && "text-center",
                    column.align === "left" && "text-left",
                    column.align !== "center" && column.align !== "left" && "text-right"
                  )}
                  style={{ width: column.width }}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                      {column.title}
                      <div className="flex flex-col">
                        <CaretUp
                          size={12}
                          className={cn(
                            "text-slate-500",
                            sortBy === column.key && sortDirection === "asc" && "text-blue-400"
                          )}
                        />
                        <CaretDown
                          size={12}
                          className={cn(
                            "text-slate-500 -mt-1",
                            sortBy === column.key && sortDirection === "desc" && "text-blue-400"
                          )}
                        />
                      </div>
                    </button>
                  ) : (
                    column.title
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (onRowSelect ? 1 : 0)}
                  className="py-8 text-center text-slate-400"
                >
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="mr-2">در حال بارگذاری...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onRowSelect ? 1 : 0)}
                  className="py-8 text-center text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((record) => (
                <tr
                  key={String(record[rowKey])}
                  className={cn(
                    "border-b border-slate-700/50 transition-colors",
                    onRowClick && "cursor-pointer hover:bg-slate-700/30",
                    isRowSelected(record) && "bg-blue-600/10"
                  )}
                  onClick={() => onRowClick?.(record)}
                >
                  {onRowSelect && (
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={isRowSelected(record)}
                        onChange={(e) => {
                          e.stopPropagation();
                          onRowSelect(record, e.target.checked);
                        }}
                        className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={cn(
                        "py-4 px-4 text-slate-200",
                        column.align === "center" && "text-center",
                        column.align === "left" && "text-left",
                        column.align !== "center" && column.align !== "left" && "text-right"
                      )}
                    >
                      {column.render
                        ? column.render(record[column.key], record)
                        : String(record[column.key] || "-")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;