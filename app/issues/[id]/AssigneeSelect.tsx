"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  issue: Issue;
}

const AssigneeSelect = async ({ issue }: Props) => {
  const { data: users, isLoading, error } = useUsers();

  const handleSelect = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      });
      toast.success(
        userId === "unassigned"
          ? `Issue unassigned successfully`
          : `Issue assigned successfully`
      );
    } catch (error) {
      toast.error("Changes cannot be saved");
    }
  };

  if (error) return null;

  if (isLoading) return <Skeleton />;
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={handleSelect}
      >
        <Select.Trigger placeholder="Assign ..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassign</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60seconds
    retry: 3,
  });

export default AssigneeSelect;
