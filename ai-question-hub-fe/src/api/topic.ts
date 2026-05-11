import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type { TagResponse } from "./tag";

export interface CreateTopicRequest {
  title: string;
  tagIds: number[];
}

export interface TopicResponse {
  id: number;
  title: string;
  tags: TagResponse[];
  createdAt: string;
  updatedAt: string;
}

export function useGetTopics() {
  return useQuery<TopicResponse[]>({
    queryKey: ["topics"],
    queryFn: () => api.get<TopicResponse[]>("/topics"),
    staleTime: 2 * 60 * 1000,
  });
}

export function useGetRecentTopics(limit = 5) {
  return useQuery<TopicResponse[]>({
    queryKey: ["topics", "recent", limit],
    queryFn: () => api.get<TopicResponse[]>(`/topics/recent?limit=${limit}`),
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateTopic() {
  const queryClient = useQueryClient();
  return useMutation<TopicResponse, Error, CreateTopicRequest>({
    mutationFn: (data) => api.post<TopicResponse>("/topics", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });
}
