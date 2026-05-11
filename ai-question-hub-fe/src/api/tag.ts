import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";

export interface TagResponse {
  id: number;
  code: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface TagRequest {
  name: string;
}

export function useGetTags() {
  return useQuery<TagResponse[]>({
    queryKey: ["tags"],
    queryFn: () => api.get<TagResponse[]>("/tags"),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateTag() {
  const queryClient = useQueryClient();
  return useMutation<TagResponse, any, TagRequest>({
    mutationFn: (data) => api.post<TagResponse>("/tags", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
}
