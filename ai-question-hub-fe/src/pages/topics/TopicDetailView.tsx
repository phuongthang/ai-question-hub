import * as React from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDate, formatDateTime, timeAgo } from "@/utils/dateUtils";
import type { TopicDetailResponse, QuestionResponse } from "@/api/topic";

function QuestionCard({ q }: { q: QuestionResponse }) {
  const options: Record<string, string> = React.useMemo(() => {
    try {
      return JSON.parse(q.options);
    } catch {
      return {};
    }
  }, [q.options]);
  const isAiGenerated = q.aiModelId !== null;

  return (
    <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:border-[#2e5d97]/40 transition-all group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs text-[#2e5d97] bg-[#2e5d97]/10 px-2 py-0.5 rounded font-semibold">
            {q.code}
          </span>
          {isAiGenerated ? (
            <span className="px-2 py-0.5 rounded bg-teal-100/50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 font-semibold text-xs flex items-center gap-1 border border-teal-200/50 dark:border-teal-800/50">
              <Icon name="psychology" className="size-3.5" />
              AI Generated
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-xs flex items-center gap-1 border border-slate-200 dark:border-slate-700">
              <Icon name="person" className="size-3.5" />
              Manual
            </span>
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 text-slate-400 hover:text-[#2e5d97] rounded transition-colors">
            <Icon name="edit" className="size-4.5" />
          </button>
          <button className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors">
            <Icon name="delete" className="size-4.5" />
          </button>
        </div>
      </div>
      <p className="text-sm font-semibold text-ink dark:text-slate-200 mb-4 leading-relaxed">
        {q.questionText}
      </p>
      <div className="grid grid-cols-1 gap-2">
        {Object.entries(options).map(([key, value]) => {
          const isCorrect = key === q.answer;
          return (
            <div
              key={key}
              className={`flex items-center gap-3 p-3 rounded-lg border relative ${
                isCorrect
                  ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/40"
                  : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50"
              }`}
            >
              <span
                className={`w-6 h-6 flex items-center justify-center rounded shadow-sm font-mono text-xs font-semibold shrink-0 ${isCorrect ? "bg-emerald-500 text-white" : "bg-white dark:bg-slate-700"}`}
              >
                {key}
              </span>
              <span
                className={`text-sm ${isCorrect ? "font-semibold text-ink dark:text-slate-200" : "text-slate-600 dark:text-slate-300"}`}
              >
                {value}
              </span>
              {isCorrect && (
                <Icon
                  name="check_circle"
                  className="absolute right-3 text-emerald-500 size-5"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export interface TopicDetailViewProps {
  topic: TopicDetailResponse;
  questionFilter: "all" | "ai" | "manual";
  searchQuery: string;
  onFilterChange: (filter: "all" | "ai" | "manual") => void;
  onSearchChange: (query: string) => void;
  onEdit?: () => void;
}

export function TopicDetailView({
  topic,
  questionFilter,
  searchQuery,
  onFilterChange,
  onSearchChange,
  onEdit,
}: TopicDetailViewProps) {
  const filteredQuestions = React.useMemo(() => {
    return topic.questions.filter((q) => {
      const matchesFilter =
        questionFilter === "all" ||
        (questionFilter === "ai" && q.aiModelId !== null) ||
        (questionFilter === "manual" && q.aiModelId === null);
      const matchesSearch =
        searchQuery === "" ||
        q.questionText.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [topic.questions, questionFilter, searchQuery]);

  const aiCount = topic.questions.filter((q) => q.aiModelId !== null).length;
  const manualCount = topic.questions.filter(
    (q) => q.aiModelId === null,
  ).length;
  const totalCount = topic.questions.length;

  return (
    <div className="p-6 flex flex-col gap-6 min-h-full pb-12">
      {/* Hero Topic Tile */}
      <div className="bg-linear-to-br from-[#395886] to-[#243558] rounded-xl p-8 shadow-md flex flex-col md:flex-row md:items-end justify-between gap-6 relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-teal-200/20 rounded-full blur-2xl translate-y-1/2 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Active
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-normal text-xs">
              ID: {topic.id}
            </span>
            {topic.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-normal text-xs"
              >
                {tag.name}
              </span>
            ))}
          </div>
          <h1 className="text-[32px] font-bold text-white mb-2 leading-tight tracking-tight">
            {topic.title}
          </h1>
          <div className="flex items-center gap-4 text-blue-200 text-sm font-medium">
            <div className="flex items-center gap-1.5">
              <Icon name="calendar_today" className="size-4.5" />
              <span>{formatDate(topic.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col md:items-end gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="bg-slate-900/20 backdrop-blur-md border border-white/10 rounded-lg p-3 min-w-30">
              <p className="text-xs text-blue-200 mb-1">Câu hỏi</p>
              <p className="text-[28px] font-bold text-white leading-none">
                {totalCount}
              </p>
            </div>
            <div className="bg-slate-900/20 backdrop-blur-md border border-white/10 rounded-lg p-3 min-w-30">
              <p className="text-xs text-blue-200 mb-1">Tỷ lệ AI tạo</p>
              <div className="flex items-baseline gap-2">
                <p className="text-[28px] font-bold text-white leading-none">
                  {totalCount > 0
                    ? Math.round((aiCount / totalCount) * 100)
                    : 0}
                  %
                </p>
                <Icon name="psychology" className="text-teal-300 size-4" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <Button
              variant="outline"
              onClick={onEdit}
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white font-semibold transition-colors flex items-center gap-1.5 border hover:text-white shadow-none h-10"
            >
              <Icon name="edit" className="size-4" />
              Chỉnh sửa
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-400 hover:text-red-400 transition-colors border shadow-none h-10 w-10"
            >
              <Icon name="delete" className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Panel */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          <Card className="rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 h-fit">
            <CardHeader className="p-5 pb-0 flex flex-row items-center gap-2">
              <Icon name="info" className="text-[#2e5d97] size-5" />
              <CardTitle className="text-lg font-semibold text-ink dark:text-white mt-0">
                Thông tin
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
                <p className="text-xs text-ink-muted mb-1">Tên chủ đề</p>
                <p className="text-sm font-semibold text-ink dark:text-white">
                  {topic.title}
                </p>
              </div>
              {topic.tags.length > 0 && (
                <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
                  <p className="text-xs text-ink-muted mb-1">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {topic.tags.map((tag) => (
                      <Badge
                        key={tag.id}
                        className="bg-[#2e5d97]/10 text-[#2e5d97] hover:bg-[#2e5d97]/20 shadow-none font-mono font-medium rounded"
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
                <p className="text-xs text-ink-muted mb-1">Ngày tạo</p>
                <p className="text-sm text-ink dark:text-slate-200">
                  {formatDate(topic.createdAt)}
                </p>
              </div>
              <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
                <p className="text-xs text-ink-muted mb-1">Cập nhật lần cuối</p>
                <p className="text-sm text-ink dark:text-slate-200">
                  {formatDateTime(topic.updatedAt)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Panel */}
        <div className="col-span-12 lg:col-span-6 flex flex-col">
          <Card className="rounded-xl shadow-sm flex flex-col h-full border-none bg-transparent dark:bg-transparent">
            <div className="flex flex-col gap-4 mb-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon
                    name="format_list_bulleted"
                    className="text-[#2e5d97] size-6"
                  />
                  <h2 className="text-[22px] font-semibold text-ink dark:text-white leading-none">
                    Danh sách câu hỏi
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="h-9 border-[#2e5d97] text-[#2e5d97] hover:bg-[#2e5d97]/10 flex items-center gap-1.5 shadow-none dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400/10"
                  >
                    <Icon name="add" className="size-4.5" />
                    Thêm
                  </Button>
                  <Button className="h-9 bg-[#2e5d97] hover:bg-[#264f82] text-white shadow-md flex items-center gap-1.5 transition-all">
                    <Icon name="auto_awesome" className="size-4.5" />
                    Sinh thêm ✦
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="relative w-full sm:w-64">
                  <Icon
                    name="search"
                    className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-muted"
                  />
                  <Input
                    placeholder="Tìm câu hỏi..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9 h-9 bg-white/50 dark:bg-slate-900/50 shadow-none focus-visible:ring-[#2e5d97]/40"
                  />
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg border border-slate-200 dark:border-slate-700 w-full sm:w-auto">
                  {(["all", "ai", "manual"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => onFilterChange(f)}
                      className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                        questionFilter === f
                          ? "bg-white dark:bg-slate-700 shadow-sm text-ink dark:text-white"
                          : "text-slate-500 hover:text-ink dark:text-slate-400 dark:hover:text-white"
                      }`}
                    >
                      {f === "ai" && (
                        <Icon name="psychology" className="size-3.5" />
                      )}
                      {f === "all"
                        ? "Tất cả"
                        : f === "ai"
                          ? "AI tạo"
                          : "Thủ công"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="flex flex-col gap-4 overflow-y-auto pr-1"
              style={{ maxHeight: "600px" }}
            >
              {filteredQuestions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-ink-muted gap-2">
                  <Icon name="inbox" className="size-10 opacity-30" />
                  <p className="text-sm">Không có câu hỏi nào.</p>
                </div>
              ) : (
                filteredQuestions.map((q) => <QuestionCard key={q.id} q={q} />)
              )}
            </div>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          <Card className="rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
            <CardHeader className="p-5 pb-3 flex flex-row items-center gap-2">
              <Icon name="pie_chart" className="text-[#2e5d97] size-5" />
              <CardTitle className="text-lg font-semibold text-ink dark:text-white mt-0">
                Thống kê
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-12 border-slate-100 dark:border-slate-800"></div>
                  <div className="absolute inset-0 rounded-full border-12 border-transparent border-t-[#2e5d97] border-r-[#2e5d97] rotate-45"></div>
                  <div className="absolute inset-0 rounded-full border-12 border-transparent border-b-teal-400 border-l-teal-400 -rotate-12"></div>
                  <div className="text-center z-10 flex flex-col items-center justify-center">
                    <span className="text-[28px] font-bold text-ink dark:text-white leading-none">
                      {totalCount}
                    </span>
                    <span className="text-xs text-ink-muted mt-1">Tổng số</span>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#2e5d97]"></div>
                      <span className="font-medium text-ink dark:text-slate-200">
                        AI tạo
                      </span>
                    </div>
                    <span className="font-mono font-bold text-ink dark:text-white">
                      {aiCount} (
                      {totalCount > 0
                        ? Math.round((aiCount / totalCount) * 100)
                        : 0}
                      %)
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                      <span className="font-medium text-ink dark:text-slate-200">
                        Thủ công
                      </span>
                    </div>
                    <span className="font-mono font-bold text-ink dark:text-white">
                      {manualCount} (
                      {totalCount > 0
                        ? Math.round((manualCount / totalCount) * 100)
                        : 0}
                      %)
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex-1 flex flex-col">
            <CardHeader className="p-5 pb-3 flex flex-row items-center gap-2">
              <Icon name="history" className="text-[#2e5d97] size-5" />
              <CardTitle className="text-lg font-semibold text-ink dark:text-white mt-0">
                Hoạt động gần đây
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 relative border-l border-slate-200 dark:border-slate-700 ml-7 pl-4 flex flex-col gap-5 mt-2 h-full">
              {topic.activityLogs.length === 0 ? (
                <p className="text-sm text-ink-muted">Chưa có hoạt động nào.</p>
              ) : (
                topic.activityLogs.map((log, index) => (
                  <div key={log.id} className="relative">
                    <div
                      className={`absolute -left-5.25 top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-white dark:ring-slate-900 ${
                        index === 0
                          ? "bg-[#2e5d97]"
                          : "bg-slate-300 dark:bg-slate-600"
                      }`}
                    ></div>
                    <p className="text-sm font-semibold text-ink dark:text-slate-200">
                      {log.actionTypeName}
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {timeAgo(log.createdAt)}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
