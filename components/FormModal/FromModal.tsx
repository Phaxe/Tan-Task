import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  amount: yup.number().positive("Amount must be greater than 0").required("Amount is required"),
  document: yup.mixed().required("Document is required"),
});

export default function FormModal({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-blue-500 text-white p-2 rounded">Add New Investment</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Investment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 p-4 border rounded">
          <div>
            <label className="block">Name:</label>
            <input {...register("name")} className="border p-2 w-full" />
            <p className="text-red-500">{errors.name?.message}</p>
          </div>
          <div>
            <label className="block">Amount ($):</label>
            <input type="number" {...register("amount")} className="border p-2 w-full" />
            <p className="text-red-500">{errors.amount?.message}</p>
          </div>
          <div>
            <label className="block">Upload Document:</label>
            <input type="file" {...register("document")} className="border p-2 w-full" />
            <p className="text-red-500">{errors.document?.message}</p>
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded">Submit</button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
