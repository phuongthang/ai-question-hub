import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useGetTopics, type TopicResponse } from "@/api/topic";
import TopicsPage from "./TopicsPage";

export default function TopicsContainer() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] =
    React.useState<TopicResponse | null>(null);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const { data: topics = [], isLoading: topicsLoading } = useGetTopics();

  const filtered = topics.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const uniqueTagCount = new Set(
    topics.flatMap((t) => t.tags.map((tag) => tag.id)),
  ).size;

  return (
    <TopicsPage
      topics={filtered}
      totalCount={topics.length}
      uniqueTagCount={uniqueTagCount}
      topicsLoading={topicsLoading}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedTopic={selectedTopic}
      sheetOpen={sheetOpen}
      setSheetOpen={setSheetOpen}
      onOpenTopicDetails={(topic) => {
        setSelectedTopic(topic);
        setSheetOpen(true);
      }}
      onAddTopic={() => navigate("/topics/create")}
      onViewTopicDetail={(id) => navigate(`/topics/${id}`)}
    />
  );
}
