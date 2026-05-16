import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTopicDetail } from "@/api/topic";
import { TopicDetailView } from "./TopicDetailView";
import { Icon } from "@/components/ui/icon";

export function TopicDetailContainer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const topicId = id ? parseInt(id, 10) : null;

  const [questionFilter, setQuestionFilter] = React.useState<
    "all" | "ai" | "manual"
  >("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const { data: topic, isLoading, isError } = useGetTopicDetail(topicId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-ink-muted">
          <Icon name="progress_activity" className="size-6 animate-spin" />
          <span>Đang tải...</span>
        </div>
      </div>
    );
  }

  if (isError || !topic) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2 text-ink-muted">
          <Icon name="error_outline" className="size-10 opacity-40" />
          <p className="text-sm">Không thể tải thông tin chủ đề.</p>
        </div>
      </div>
    );
  }

  return (
    <TopicDetailView
      topic={topic}
      questionFilter={questionFilter}
      searchQuery={searchQuery}
      onFilterChange={setQuestionFilter}
      onSearchChange={setSearchQuery}
      onEdit={() => navigate(`/topics/${id}/edit`)}
    />
  );
}
