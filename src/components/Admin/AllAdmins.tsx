"use client";

import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import Table from "./Table";
import { Column, User } from "@/interfaces/interfaces";

// Reusable DataTable component

const AllAdmins = () => {
  const { data } = useGetAllUsersQuery(undefined);

  const admins = data.data?.filter((items: User) => items.role === "admin");
  const handleEdit = (id: string) => {
    console.log("Edit user:", id);
    // Example: navigate to edit page
    // router.push(`/admin/edit-user/${id}`)
  };

  const handleDelete = (id: string) => {
    console.log("Delete user:", id);
    // Example: call API to delete user, then refetch data
  };
  const columns: Column<User>[] = [
    { key: "userName", header: "UserName", className: "min-w-[160px]" },
    { key: "email", header: "Email", className: "min-w-[120px]" },
    {
      key: "role",
      header: "Role",
      className: "min-w-[100px]",
    },
    { key: "provider", header: "Provider", className: "min-w-[100px]" },
    {
      key: "status",
      header: "Status",
      className: "min-w-[140px]",
    },
    {
      key: "_id",
      header: "Actions",
      className: "min-w-[160px]",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row._id)}
            className="px-3 py-1 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="px-3 py-1 rounded-md bg-red-500 text-white text-sm hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  console.log(data);

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-6">
      <h1 className="mb-4 text-2xl font-semibold tracking-tight text-stone-900">
        All Admins
      </h1>

      <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm md:p-6">
        <Table<User>
          data={admins}
          columns={columns}
          initialPageSize={10}
          pageSizeOptions={[5, 10, 20, 50]}
        />
      </div>

      <p className="mt-4 text-sm text-stone-500">
        <span className="text-red-500">*</span> Click on column headers to sort.
      </p>
    </main>
  );
};

export default AllAdmins;
