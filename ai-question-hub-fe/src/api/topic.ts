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

export interface QuestionResponse {
  id: number;
  code: string;
  topicId: number;
  questionText: string;
  /** JSON string: {"A": "...", "B": "...", "C": "...", "D": "..."} */
  options: string;
  answer: string;
  status: number | null;
  aiModelId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface TopicActivityLogResponse {
  id: number;
  topicId: number;
  actionType: string;
  actionTypeName: string;
  actorId: number | null;
  projectId: number | null;
  questionId: number | null;
  tagId: number | null;
  detail: string | null;
  createdAt: string;
}

export interface TopicDetailResponse {
  id: number;
  title: string;
  tags: TagResponse[];
  questions: QuestionResponse[];
  activityLogs: TopicActivityLogResponse[];
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

export function useGetTopicDetail(id: number | null) {
  return useQuery<TopicDetailResponse>({
    queryKey: ["topics", id, "detail"],
    queryFn: () => api.get<TopicDetailResponse>(`/topics/${id}/detail`),
    enabled: id !== null,
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

export function useUpdateTopic(id: number | null) {
  const queryClient = useQueryClient();
  return useMutation<TopicResponse, Error, CreateTopicRequest>({
    mutationFn: (data) => api.put<TopicResponse>(`/topics/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["topics", id, "detail"] });
      }
    },
  });
}

export function useDeleteTopic(id: number | null) {
  const queryClient = useQueryClient();
  return useMutation<void, Error, void>({
    mutationFn: () => api.delete<void>(`/topics/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });
}
