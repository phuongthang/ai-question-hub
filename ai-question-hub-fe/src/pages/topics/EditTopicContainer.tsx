import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTags, useCreateTag } from "@/api/tag";
import { useGetTopicDetail, useUpdateTopic, useDeleteTopic } from "@/api/topic";
import { EditTopicPage } from "./EditTopicPage";
import { CreateTagModal } from "./CreateTagModal";
import { Icon } from "@/components/ui/icon";

export function EditTopicContainer() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const topicId = id ? parseInt(id, 10) : null;

  const [topicName, setTopicName] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<number[]>([]);
  const [isTagModalOpen, setIsTagModalOpen] = React.useState(false);
  const [tagModalError, setTagModalError] = React.useState<string | null>(null);

  const {
    data: topic,
    isLoading: topicLoading,
    isError: topicError,
  } = useGetTopicDetail(topicId);
  const { data: tags = [], isLoading: tagsLoading } = useGetTags();

  const createTagMutation = useCreateTag();
  const updateTopicMutation = useUpdateTopic(topicId);
  const deleteTopicMutation = useDeleteTopic(topicId);

  // Initialize form state when topic data is loaded
  React.useEffect(() => {
    if (topic) {
      setTopicName(topic.title);
      setSelectedTags(topic.tags.map((t) => t.id));
    }
  }, [topic]);

  // Check if form has changes compared to original data
  const hasChanges = React.useMemo(() => {
    if (!topic) return false;
    if (topicName !== topic.title) return true;

    const originalTagIds = topic.tags.map((t) => t.id).sort();
    const currentTagIds = [...selectedTags].sort();

    if (originalTagIds.length !== currentTagIds.length) return true;
    for (let i = 0; i < originalTagIds.length; i++) {
      if (originalTagIds[i] !== currentTagIds[i]) return true;
    }

    return false;
  }, [topic, topicName, selectedTags]);

  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((x) => x !== tagId) : [...prev, tagId],
    );
  };

  const handleUndo = () => {
    if (topic) {
      setTopicName(topic.title);
      setSelectedTags(topic.tags.map((t) => t.id));
    }
  };

  const handleSubmit = () => {
    if (!topicId || !topicName.trim() || !hasChanges) return;
    updateTopicMutation.mutate(
      { title: topicName.trim(), tagIds: selectedTags },
      { onSuccess: () => navigate(`/topics/${topicId}`) },
    );
  };

  const handleDelete = () => {
    if (!topicId) return;
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa chủ đề này? Hành động này không thể hoàn tác.",
      )
    ) {
      deleteTopicMutation.mutate(undefined, {
        onSuccess: () => navigate("/topics"),
      });
    }
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
    navigate(`/topics/${topicId}`);
  };

  if (topicLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-ink-muted">
          <Icon name="progress_activity" className="size-6 animate-spin" />
          <span>Đang tải...</span>
        </div>
      </div>
    );
  }

  if (topicError || !topic) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2 text-ink-muted">
          <Icon name="error_outline" className="size-10 opacity-40" />
          <p className="text-sm">Không thể tải thông tin chủ đề.</p>
          <button
            onClick={() => navigate("/topics")}
            className="text-[#2e5d97] hover:underline font-semibold mt-2"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <CreateTagModal
        open={isTagModalOpen}
        isSubmitting={createTagMutation.isPending}
        errorMessage={tagModalError}
        onClose={handleCloseTagModal}
        onSubmit={handleCreateTag}
      />
      <EditTopicPage
        topic={topic}
        topicName={topicName}
        setTopicName={setTopicName}
        tags={tags}
        tagsLoading={tagsLoading}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        isSubmitting={updateTopicMutation.isPending}
        isDeleting={deleteTopicMutation.isPending}
        hasChanges={hasChanges}
        onUndo={handleUndo}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onDelete={handleDelete}
        onOpenTagModal={handleOpenTagModal}
      />
    </>
  );
}
