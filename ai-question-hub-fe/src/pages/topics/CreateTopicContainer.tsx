import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useGetTags, useCreateTag } from "@/api/tag";
import { useCreateTopic, useGetRecentTopics } from "@/api/topic";
import { CreateTopicPage } from "./CreateTopicPage";
import { CreateTagModal } from "./CreateTagModal";

// ─── Container ────────────────────────────────────────────────────────────────
export default function CreateTopicContainer() {
  const navigate = useNavigate();

  const [topicName, setTopicName] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<number[]>([]);
  const [isTagModalOpen, setIsTagModalOpen] = React.useState(false);
  const [tagModalError, setTagModalError] = React.useState<string | null>(null);

  const { data: tags = [], isLoading: tagsLoading } = useGetTags();
  const { data: recentTopics = [] } = useGetRecentTopics(5);
  const createTagMutation = useCreateTag();
  const createTopicMutation = useCreateTopic();

  const toggleTag = (id: number) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSubmit = () => {
    createTopicMutation.mutate(
      { title: topicName.trim(), tagIds: selectedTags },
      { onSuccess: () => navigate("/topics") },
    );
  };

  const handleOpenTagModal = () => {
    setTagModalError(null);
    setIsTagModalOpen(true);
  };

  const handleCloseTagModal = () => {
    setIsTagModalOpen(false);
    setTagModalError(null);
  };

  const handleCreateTag = (name: string) => {
    setTagModalError(null);
    createTagMutation.mutate(
      { name },
      {
        onSuccess: (newTag) => {
          setIsTagModalOpen(false);
          setSelectedTags((prev) => [...prev, newTag.id]);
        },
        onError: (err: any) => {
          setTagModalError(
            err?.message ?? "Tạo tag thất bại. Vui lòng thử lại.",
          );
        },
      },
    );
  };

  const handleCancel = () => {
    navigate("/topics");
  };

  return (
    <>
      <CreateTagModal
        open={isTagModalOpen}
        isSubmitting={createTagMutation.isPending}
        errorMessage={tagModalError}
        onClose={handleCloseTagModal}
        onSubmit={handleCreateTag}
      />
      <CreateTopicPage
        topicName={topicName}
        setTopicName={setTopicName}
        recentTopics={recentTopics}
        tags={tags}
        tagsLoading={tagsLoading}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        isSubmitting={createTopicMutation.isPending}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onOpenTagModal={handleOpenTagModal}
      />
    </>
  );
}
