import * as React from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { TagResponse } from "@/api/tag";
import type { TopicDetailResponse } from "@/api/topic";
import { formatDate, formatDateTime, timeAgo } from "@/utils/dateUtils";

// ─── Bento Grid Helpers ───────────────────────────────────────────────────────
function BentoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-xl border border-[rgba(148,163,184,0.15)] rounded-2xl p-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}

function CardSectionHeader({
  icon,
  title,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-[#f0f4f9] rounded-lg text-[#2e5d97]">
          {icon}
        </div>
        <h3 className="font-semibold text-[16px] text-on-surface leading-none">
          {title}
        </h3>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ─── UUID → Pastel Color Helper ──────────────────────────────────────────────
function uuidToColor(uuid: string) {
  if (!uuid) return { bg: "#f0f4f9", text: "#2e5d97", border: "#cdd7e4" };
  const hex = uuid.replace(/-/g, "");
  const r = parseInt(hex.slice(0, 2), 16) || 100;
  const g = parseInt(hex.slice(2, 4), 16) || 100;
  const b = parseInt(hex.slice(4, 6), 16) || 100;

  // Custom formula to make predictable pastel colors
  const pr = Math.round(r * 0.28 + 255 * 0.72);
  const pg = Math.round(g * 0.28 + 255 * 0.72);
  const pb = Math.round(b * 0.28 + 255 * 0.72);
  const tr = Math.round(r * 0.55);
  const tg = Math.round(g * 0.55);
  const tb = Math.round(b * 0.55);
  return {
    bg: `rgb(${pr},${pg},${pb})`,
    text: `rgb(${tr},${tg},${tb})`,
    border: `rgba(${r},${g},${b},0.28)`,
    selected: `rgb(${Math.round(r * 0.7)},${Math.round(g * 0.7)},${Math.round(b * 0.7)})`,
  };
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface EditTopicPageProps {
  topic: TopicDetailResponse;
  topicName: string;
  setTopicName: (value: string) => void;
  tags: TagResponse[];
  tagsLoading: boolean;
  selectedTags: number[];
  toggleTag: (id: number) => void;
  isSubmitting: boolean;
  isDeleting: boolean;
  hasChanges: boolean;
  onUndo: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onOpenTagModal: () => void;
}

const MAX_NAME_LENGTH = 255;

export function EditTopicPage({
  topic,
  topicName,
  setTopicName,
  tags,
  tagsLoading,
  selectedTags,
  toggleTag,
  isSubmitting,
  isDeleting,
  hasChanges,
  onUndo,
  onSubmit,
  onCancel,
  onDelete,
  onOpenTagModal,
}: EditTopicPageProps) {
  const aiCount = topic.questions.filter((q) => q.aiModelId !== null).length;
  const manualCount = topic.questions.filter(
    (q) => q.aiModelId === null,
  ).length;
  const totalCount = topic.questions.length;
  const aiPercent = totalCount > 0 ? (aiCount / totalCount) * 100 : 0;
  const manualPercent = totalCount > 0 ? (manualCount / totalCount) * 100 : 0;

  return (
    <div className="flex flex-col min-h-full h-full relative">
      <div className="flex-1 overflow-y-auto p-6 pb-28">
        <div className="max-w-300 mx-auto">
          {/* Page Title & Badge */}
          <div className="mb-6 flex flex-col gap-1 items-start">
            <div className="flex items-center gap-3">
              <h1 className="text-[32px] font-bold leading-tight tracking-tight text-on-surface">
                Chỉnh sửa chủ đề
              </h1>
              <Badge className="bg-[#2e5d97]/10 text-[#2e5d97] hover:bg-[#2e5d97]/20 border border-[#2e5d97]/20 shadow-none font-medium flex items-center gap-1.5 h-7">
                <Icon name="edit" className="size-3.5" />
                Đang chỉnh sửa: {topic.title}
              </Badge>
            </div>
            <p className="text-[15px] text-ink-muted mt-1">
              Cập nhật thông tin chủ đề trong hệ thống
            </p>
          </div>

          <div className="grid grid-cols-12 gap-5">
            {/* ── LEFT COLUMN ── */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-5">
              {/* Form Card */}
              <BentoCard className="flex flex-col gap-5 p-6">
                {/* Topic Name */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Label
                      htmlFor="topic-name"
                      className="text-sm font-bold text-on-surface"
                    >
                      Tên chủ đề <span className="text-red-500">*</span>
                    </Label>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none shadow-none text-[10px] px-1.5 py-0 h-5">
                      Bắt buộc
                    </Badge>
                  </div>

                  <Input
                    id="topic-name"
                    value={topicName}
                    onChange={(e) => {
                      if (e.target.value.length <= MAX_NAME_LENGTH) {
                        setTopicName(e.target.value);
                      }
                    }}
                    placeholder="Nhập tên chủ đề (vd: React Hooks, RESTful API)"
                    className="h-12 rounded-xl border-slate-300 text-on-surface text-[15px] font-medium shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-[#2e5d97]/20 focus-visible:border-[#2e5d97]"
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-[13px] text-slate-500 italic">
                      Giá trị gốc: {topic.title}
                    </p>
                    <span className="text-xs font-mono text-slate-400">
                      {topicName.length} / {MAX_NAME_LENGTH}
                    </span>
                  </div>
                </div>

                {/* Has Changes Warning */}
                {hasChanges && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 text-amber-700">
                      <Icon name="warning" className="size-5" />
                      <span className="text-sm font-medium">
                        Bạn có thay đổi chưa lưu.
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={onUndo}
                      className="h-8 px-3 text-amber-700 hover:bg-amber-100/50 hover:text-amber-800 text-sm font-semibold"
                    >
                      Hoàn tác
                    </Button>
                  </div>
                )}

                <div className="h-px bg-slate-100 w-full my-1"></div>

                {/* Tags Section */}
                <div className="space-y-3">
                  <div className="flex flex-col gap-1 mb-3">
                    <h3 className="text-sm font-bold text-on-surface">
                      Tags đang sử dụng
                    </h3>
                    <p className="text-[13px] text-slate-500">
                      Thêm hoặc gỡ tag khỏi chủ đề. Thay đổi có hiệu lực ngay
                      lập tức khi lưu.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 relative mb-4">
                    <Icon
                      name="search"
                      className="absolute left-3 size-4.5 text-slate-400"
                    />
                    <Input
                      placeholder="Tìm và chọn tags..."
                      className="pl-9 h-11 bg-slate-50 border-slate-200 rounded-lg shadow-none"
                    />
                  </div>

                  {tagsLoading ? (
                    <div className="flex items-center gap-2 py-2 text-sm text-ink-muted">
                      <Icon
                        name="progress_activity"
                        className="size-4 animate-spin"
                      />
                      Đang tải tags...
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags
                        .filter((t) => selectedTags.includes(t.id))
                        .map((tag) => {
                          const colors = uuidToColor(tag.code);
                          return (
                            <div
                              key={tag.id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border"
                              style={{
                                backgroundColor: colors.bg,
                                color: colors.text,
                                borderColor: colors.border,
                              }}
                            >
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: colors.selected }}
                              ></span>
                              {tag.name}
                              <button
                                onClick={() => toggleTag(tag.id)}
                                className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
                              >
                                <Icon name="close" className="size-3.5" />
                              </button>
                            </div>
                          );
                        })}

                      <button
                        type="button"
                        onClick={onOpenTagModal}
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#2e5d97] hover:bg-[#2e5d97]/5 border border-dashed border-[#2e5d97]/30 px-3 py-1.5 rounded-full transition-all"
                      >
                        <Icon name="add" className="size-4" />
                        Thêm tag
                      </button>
                    </div>
                  )}

                  <p className="text-[13px] text-slate-500 mt-2">
                    {selectedTags.length} tag đã chọn ·{" "}
                    {tags.length - selectedTags.length} tag khác chưa dùng
                  </p>
                </div>
              </BentoCard>

              {/* Activity History */}
              <BentoCard className="p-6 pb-2">
                <h3 className="text-[16px] font-bold text-on-surface mb-5">
                  Lịch sử thay đổi
                </h3>

                <div className="w-full">
                  {/* Header Row */}
                  <div className="grid grid-cols-12 gap-4 pb-3 border-b border-slate-100 text-xs font-semibold text-slate-400">
                    <div className="col-span-4 uppercase tracking-wider">
                      Thời gian
                    </div>
                    <div className="col-span-4 uppercase tracking-wider">
                      Người thực hiện
                    </div>
                    <div className="col-span-4 uppercase tracking-wider">
                      Thay đổi
                    </div>
                  </div>

                  {/* Data Rows */}
                  <div className="flex flex-col mt-2">
                    {topic.activityLogs.length === 0 ? (
                      <div className="py-6 text-center text-sm text-slate-400">
                        Không có lịch sử hoạt động
                      </div>
                    ) : (
                      topic.activityLogs.slice(0, 5).map((log) => (
                        <div
                          key={log.id}
                          className="grid grid-cols-12 gap-4 py-3 border-b border-slate-50 last:border-0 items-center"
                        >
                          <div className="col-span-4 text-[13px] text-slate-600 font-medium">
                            {formatDateTime(log.createdAt)}
                          </div>
                          <div className="col-span-4 flex items-center gap-2">
                            {/* Fake avatar since we don't have user info in log yet */}
                            <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                              <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${log.id}`}
                                alt="avatar"
                              />
                            </div>
                            <span className="text-[13px] font-medium text-slate-700">
                              Người dùng
                            </span>
                          </div>
                          <div className="col-span-4 flex items-center gap-2">
                            <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-none shadow-none text-[10px] px-2">
                              {log.actionTypeName}
                            </Badge>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </BentoCard>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-5">
              {/* Current Info */}
              <BentoCard className="p-6 flex flex-col gap-5">
                <h3 className="text-[16px] font-bold text-on-surface">
                  Thông tin hiện tại
                </h3>

                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Tên gốc
                    </p>
                    <p className="text-[15px] font-semibold text-slate-800">
                      {topic.title}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Ngày tạo
                    </p>
                    <p className="text-[15px] font-semibold text-slate-800">
                      {formatDate(topic.createdAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Cập nhật lần cuối
                    </p>
                    <p className="text-[15px] font-semibold text-slate-800">
                      {formatDate(topic.updatedAt)}{" "}
                      <span className="text-slate-400 font-normal ml-1">
                        ({timeAgo(topic.updatedAt)})
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Câu hỏi
                    </p>
                    <p className="text-[15px] font-bold text-slate-800 mb-2">
                      {totalCount} câu hỏi
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-100 rounded-full flex overflow-hidden mb-1.5">
                      <div
                        className="bg-[#2e5d97] h-full"
                        style={{ width: `${aiPercent}%` }}
                      ></div>
                      <div
                        className="bg-teal-400 h-full"
                        style={{ width: `${manualPercent}%` }}
                      ></div>
                    </div>
                    <p className="text-[12px] text-slate-500 font-medium">
                      {aiCount} AI · {manualCount} Thủ công
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Tags đang dùng
                    </p>
                    <p className="text-[15px] font-bold text-emerald-600">
                      {topic.tags.length} tags
                    </p>
                  </div>
                </div>
              </BentoCard>

              {/* Preview Diff */}
              <BentoCard className="p-6">
                <h3 className="text-[16px] font-bold text-on-surface mb-5">
                  Xem trước
                </h3>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 bg-red-50/50 border border-red-100 rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                    <span className="text-[10px] font-bold text-red-400 tracking-wider">
                      TRƯỚC
                    </span>
                    <Badge className="bg-white text-slate-400 border-none shadow-sm flex items-center gap-1.5 px-3 py-1 opacity-70">
                      <Icon name="label" className="size-3.5" />
                      {topic.title}
                    </Badge>
                  </div>

                  <div className="text-slate-300">
                    <Icon name="arrow_forward" className="size-5" />
                  </div>

                  <div className="flex-1 bg-[#2e5d97]/5 border border-[#2e5d97]/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                    <span className="text-[10px] font-bold text-[#2e5d97]/60 tracking-wider">
                      SAU
                    </span>
                    <Badge className="bg-[#2e5d97]/10 text-[#2e5d97] border border-[#2e5d97]/20 shadow-none flex items-center gap-1.5 px-3 py-1">
                      <Icon name="label" className="size-3.5" />
                      {topicName || "---"}
                    </Badge>
                  </div>
                </div>
              </BentoCard>

              {/* Danger Zone */}
              <div className="bg-red-50/50 border border-red-200 rounded-2xl p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-red-600 mb-1">
                  <Icon name="warning" className="size-5" />
                  <h3 className="font-bold text-[16px]">Vùng nguy hiểm</h3>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      Xóa chủ đề
                    </p>
                    <p className="text-[12px] text-slate-500 mt-1 leading-snug">
                      Xóa vĩnh viễn dữ liệu. Câu hỏi liên kết sẽ không bị xóa
                      nhưng sẽ mất liên kết với chủ đề này.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={onDelete}
                    disabled={isDeleting}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 bg-white shadow-sm shrink-0"
                  >
                    {isDeleting ? "Đang xóa..." : "Xóa chủ đề"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM ACTION BAR ── */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)] z-20">
        <div className="max-w-300 mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 px-4 h-11 rounded-xl text-[15px] font-semibold"
          >
            <Icon name="arrow_back" className="size-5" /> Quay lại
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              disabled={!hasChanges || isSubmitting}
              onClick={onUndo}
              className="px-6 h-11 rounded-xl font-semibold shadow-sm text-slate-700"
            >
              Hủy thay đổi
            </Button>
            <Button
              onClick={onSubmit}
              disabled={!hasChanges || isSubmitting || topicName.trim() === ""}
              className="bg-[#2e5d97] hover:bg-[#234b7d] px-6 h-11 rounded-xl font-semibold text-white shadow-md text-[15px]"
            >
              {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
