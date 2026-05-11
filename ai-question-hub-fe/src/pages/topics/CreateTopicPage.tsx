import * as React from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { TagResponse } from "@/api/tag";
import type { TopicResponse } from "@/api/topic";

// ─── Props ────────────────────────────────────────────────────────────────────
interface CreateTopicPageProps {
  topicName: string;
  setTopicName: (value: string) => void;
  recentTopics: TopicResponse[];
  tags: TagResponse[];
  tagsLoading: boolean;
  selectedTags: number[];
  toggleTag: (id: number) => void;
  isSubmitting: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  onOpenTagModal: () => void;
}

const MAX_NAME_LENGTH = 255;

// ─── Relative time helper ────────────────────────────────────────────────────
function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "Vừa xong";
  if (mins < 60) return `${mins} phút trước`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} giờ trước`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Hôm qua";
  if (days < 7) return `${days} ngày trước`;
  return new Date(dateStr).toLocaleDateString("vi-VN");
}

// ─── UUID → pastel color helper ───────────────────────────────────────────────
function uuidToColor(uuid: string) {
  const hex = uuid.replace(/-/g, "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
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

// ─── Page (Pure View) ─────────────────────────────────────────────────────────
export function CreateTopicPage({
  topicName,
  setTopicName,
  recentTopics,
  tags,
  tagsLoading,
  selectedTags,
  toggleTag,
  isSubmitting,
  onSubmit,
  onCancel,
  onOpenTagModal,
}: CreateTopicPageProps) {
  return (
    <div className="flex flex-col min-h-full">
      {/* ── Content Area ── */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1200px] mx-auto pb-24">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-[32px] font-bold leading-tight tracking-tight text-on-surface">
              Tạo chủ đề mới
            </h1>
            <p className="text-[16px] text-ink-muted mt-1">
              Chủ đề sẽ được thêm vào danh sách hệ thống và có thể dùng trong
              nhiều dự án.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-12 gap-4">
            {/* ── LEFT COLUMN (7 cols) ── */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
              {/* Card 1: Basic Info Form */}
              <BentoCard>
                <CardSectionHeader
                  icon={<FileEditIcon />}
                  title="Thông tin cơ bản"
                />

                <div className="flex flex-col gap-6">
                  {/* Topic Name Field */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <Label
                        htmlFor="topic-name"
                        className="text-sm font-semibold text-on-surface"
                      >
                        Tên chủ đề <span className="text-red-500">*</span>
                      </Label>
                      <span className="text-xs font-mono text-ink-muted">
                        {topicName.length}/{MAX_NAME_LENGTH}
                      </span>
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
                      className={`
                        h-11 rounded-lg bg-white/70 backdrop-blur-sm
                        border-[rgba(148,163,184,0.3)] text-on-surface placeholder:text-ink-muted
                        focus-visible:ring-2 focus-visible:ring-[#2e5d97]/25 focus-visible:border-[#2e5d97]
                        transition-all
                      `}
                    />
                    <p className="text-xs text-ink-muted">
                      Tên chủ đề nên ngắn gọn và mang tính bao quát.
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-on-surface">
                        Tags{" "}
                        <span className="text-ink-muted font-normal">
                          (Tùy chọn)
                        </span>
                      </Label>
                      <button
                        type="button"
                        onClick={onOpenTagModal}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#2e5d97] hover:text-[#1d4272] bg-[rgba(98,142,203,0.08)] hover:bg-[rgba(98,142,203,0.15)] border border-[rgba(46,93,151,0.2)] px-2.5 py-1 rounded-full transition-all"
                      >
                        <Icon name="add" className="size-3.5" />
                        Thêm tag
                      </button>
                    </div>

                    {tagsLoading ? (
                      <div className="flex items-center gap-2 py-2 text-sm text-ink-muted">
                        <Icon
                          name="progress_activity"
                          className="size-4 animate-spin"
                        />
                        Đang tải tags...
                      </div>
                    ) : tags.length === 0 ? (
                      <p className="text-sm text-ink-muted py-2">
                        Chưa có tag nào trong hệ thống.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => {
                          const isSelected = selectedTags.includes(tag.id);
                          const colors = uuidToColor(tag.code);
                          return (
                            <button
                              key={tag.id}
                              type="button"
                              onClick={() => toggleTag(tag.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 shadow-sm"
                              style={
                                isSelected
                                  ? {
                                      backgroundColor: colors.selected,
                                      color: "#fff",
                                      borderColor: colors.selected,
                                    }
                                  : {
                                      backgroundColor: colors.bg,
                                      color: colors.text,
                                      borderColor: colors.border,
                                    }
                              }
                            >
                              {isSelected && (
                                <Icon name="check" className="size-3" />
                              )}
                              {tag.name}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {selectedTags.length > 0 && (
                      <p className="text-xs text-[#2e5d97] font-medium">
                        Đã chọn {selectedTags.length} tag
                      </p>
                    )}
                  </div>
                </div>
              </BentoCard>

              {/* Card 2: Preview */}
              <BentoCard>
                <CardSectionHeader
                  icon={
                    <Icon name="visibility" className="size-6 text-[#3b608d]" />
                  }
                  title="Xem trước"
                />

                <div className="bg-slate-50/60 rounded-xl p-4 border border-[rgba(148,163,184,0.2)] flex items-start gap-4">
                  {/* Topic Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#395886] to-[#243558] flex items-center justify-center shrink-0 shadow-sm">
                    <svg
                      className="size-6 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                  </div>

                  {/* Topic Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="text-[18px] font-semibold text-on-surface leading-snug">
                        {topicName || "Tên chủ đề"}
                      </h4>
                      <Badge className="text-xs font-semibold bg-[rgba(98,142,203,0.12)] text-[#2e5d97] border border-[rgba(46,93,151,0.2)] shadow-none">
                        Mới
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted mb-2">
                      <div className="flex items-center gap-1">
                        <svg
                          className="size-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        0 câu hỏi
                      </div>
                      {selectedTags.length > 0 && (
                        <>
                          <div className="w-1 h-1 rounded-full bg-slate-300" />
                          <div className="flex items-center gap-1">
                            <Icon name="label" className="size-3.5" />
                            {selectedTags.length} tag
                          </div>
                        </>
                      )}
                    </div>

                    {/* Selected tags preview */}
                    {selectedTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {tags
                          .filter((t) => selectedTags.includes(t.id))
                          .map((t) => {
                            const colors = uuidToColor(t.code);
                            return (
                              <span
                                key={t.id}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                                style={{
                                  backgroundColor: colors.bg,
                                  color: colors.text,
                                  borderColor: colors.border,
                                }}
                              >
                                {t.name}
                              </span>
                            );
                          })}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-ink-muted">
                      <div className="w-4 h-4 rounded-full bg-[#2e5d97] flex items-center justify-center text-white text-[8px] font-bold">
                        NT
                      </div>
                      <span>Tạo bởi Nguyễn Thắng · Hôm nay</span>
                    </div>
                  </div>
                </div>
              </BentoCard>
            </div>

            {/* ── RIGHT COLUMN (5 cols) ── */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
              {/* Card 3: Naming Guide */}
              <BentoCard>
                <CardSectionHeader
                  icon={
                    <Icon
                      name="lightbulb"
                      className="size-6 text-amber-500"
                      fill
                    />
                  }
                  title="Hướng dẫn đặt tên"
                />

                <ul className="space-y-4">
                  {[
                    {
                      num: 1,
                      title: "Ngắn gọn & Cụ thể",
                      desc: (
                        <>
                          Tránh các tên chung chung như "Code" hay "Lỗi". Ví dụ
                          tốt:{" "}
                          <code className="font-mono text-xs bg-slate-100 py-0.5 px-1.5 rounded text-[#2e5d97]">
                            JavaScript ES6+
                          </code>
                        </>
                      ),
                    },
                    {
                      num: 2,
                      title: "Tính duy nhất",
                      desc: "Kiểm tra xem chủ đề tương tự đã tồn tại chưa trước khi tạo mới để tránh trùng lặp dữ liệu.",
                    },
                    {
                      num: 3,
                      title: "Gắn kèm dự án",
                      desc: "Nên liên kết chủ đề với ít nhất 1 dự án để dễ dàng quản lý phân quyền và bộ lọc sau này.",
                    },
                  ].map((item) => (
                    <li key={item.num} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[rgba(98,142,203,0.12)] text-[#2e5d97] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {item.num}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-on-surface">
                          {item.title}
                        </p>
                        <p className="text-sm text-ink-muted mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </BentoCard>

              {/* Card 4: Recent Topics */}
              <BentoCard>
                <CardSectionHeader
                  icon={
                    <Icon name="history" className="size-6 text-ink-muted" />
                  }
                  title="Chủ đề gần đây"
                />

                <ul className="space-y-1">
                  {recentTopics.length === 0 ? (
                    <li className="text-sm text-ink-muted py-2 text-center">
                      Chưa có chủ đề nào
                    </li>
                  ) : (
                    recentTopics.map((topic) => {
                      const firstTag = topic.tags?.[0];
                      const tagColor = firstTag
                        ? uuidToColor(firstTag.code)
                        : null;
                      return (
                        <li key={topic.id}>
                          <button className="group w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50/70 transition-colors border border-transparent hover:border-[rgba(148,163,184,0.25)] text-left">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                style={{
                                  backgroundColor: tagColor
                                    ? tagColor.bg
                                    : "rgba(98,142,203,0.12)",
                                  color: tagColor ? tagColor.text : "#2e5d97",
                                }}
                              >
                                <Icon name="menu_book" className="size-4" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-on-surface group-hover:text-[#2e5d97] transition-colors truncate">
                                  {topic.title}
                                </p>
                                <p className="text-xs text-ink-muted">
                                  {relativeTime(topic.createdAt)}
                                </p>
                              </div>
                            </div>
                            <Icon
                              name="arrow_forward"
                              className="size-4 text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2"
                            />
                          </button>
                        </li>
                      );
                    })
                  )}
                </ul>

                <Separator className="my-3 bg-[rgba(148,163,184,0.2)]" />

                <Button
                  variant="ghost"
                  className="w-full text-[#2e5d97] hover:text-[#2e5d97] hover:bg-[rgba(98,142,203,0.07)] text-sm font-medium h-10 rounded-lg border border-[rgba(148,163,184,0.2)]"
                  asChild
                >
                  <a href="/topics">
                    Xem tất cả chủ đề
                    <Icon name="open_in_new" className="size-3.5 ml-1.5" />
                  </a>
                </Button>
              </BentoCard>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Action Bar (Sticky) ── */}
      <div className="sticky bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-[rgba(148,163,184,0.25)] px-6 py-4 flex items-center justify-end gap-4 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.08)] z-40">
        <Button
          variant="ghost"
          onClick={onCancel}
          className="px-6 font-semibold text-ink-secondary hover:bg-slate-100 rounded-full h-10 border border-transparent hover:border-slate-200 transition-all"
        >
          Hủy
        </Button>
        <Button
          disabled={!topicName.trim() || isSubmitting}
          onClick={onSubmit}
          className="px-8 h-10 font-semibold bg-[#628ECB] hover:bg-[#4976b1] text-white rounded-full shadow-md shadow-[rgba(98,142,203,0.30)] hover:shadow-[rgba(98,142,203,0.40)] hover:-translate-y-px active:translate-y-px active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0"
        >
          {isSubmitting ? (
            <>
              <Icon name="progress_activity" className="size-4 animate-spin" />
              Đang tạo...
            </>
          ) : (
            <>
              Tạo chủ đề
              <Icon name="check_circle" className="size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ─── Small Helper Components ──────────────────────────────────────────────────

function BentoCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="bg-white/70 backdrop-blur-[12px] saturate-150 border border-white/35 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.07)] rounded-2xl hover:shadow-[0_12px_32px_-8px_rgba(15,23,42,0.12)] hover:-translate-y-0.5 transition-all duration-200">
      <CardContent className="p-0 flex flex-col gap-5">{children}</CardContent>
    </Card>
  );
}

function CardSectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[rgba(148,163,184,0.2)] pb-4">
      {icon}
      <CardTitle className="text-[22px] font-semibold text-on-surface leading-none">
        {title}
      </CardTitle>
    </div>
  );
}

function FileEditIcon() {
  return (
    <svg
      className="size-6 text-[#2e5d97]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
