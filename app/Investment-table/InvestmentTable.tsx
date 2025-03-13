"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchDataSuccess } from "@/redux/tableSlice";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Investment {
  id: number;
  name: string;
  amount: number;
  roi: number;
  date: string;
}

export default function InvestmentsTable({ investments }: { investments: Investment[] }) {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.table);

  // Ensure Redux state is initialized only once
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      dispatch(fetchDataSuccess(investments));
      initialized.current = true;
    }
  }, [dispatch, investments]);

  return (
    <div className="overflow-x-auto p-4">
      <Table className="min-w-full border border-gray-200 dark:border-gray-700">
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800">
            <TableHead className="text-left">ID</TableHead>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-right">Amount ($)</TableHead>
            <TableHead className="text-right">ROI (%)</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((investment: Investment) => (
              <TableRow key={investment.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
                <TableCell>{investment.id}</TableCell>
                <TableCell>{investment.name}</TableCell>
                <TableCell className="text-right">${investment.amount.toLocaleString()}</TableCell>
                <TableCell className="text-right">{investment.roi}%</TableCell>
                <TableCell className="text-right">{new Date(investment.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
