import * as React from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { TopicResponse } from "@/api/topic";
import type { TagResponse } from "@/api/tag";

// ─── Props ────────────────────────────────────────────────────────────────────
export interface TopicsPageProps {
  topics: TopicResponse[];
  totalCount: number;
  uniqueTagCount: number;
  topicsLoading: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedTopic: TopicResponse | null;
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
  onOpenTopicDetails: (topic: TopicResponse) => void;
  onAddTopic: () => void;
  onViewTopicDetail: (id: number) => void;
}

// ─── UUID → pastel color ──────────────────────────────────────────────────────
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
  };
}

function getInitials(title: string) {
  return title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

// ─── Page (Pure View) ─────────────────────────────────────────────────────────
export default function TopicsPage({
  topics,
  totalCount,
  uniqueTagCount,
  topicsLoading,
  searchQuery,
  setSearchQuery,
  selectedTopic,
  sheetOpen,
  setSheetOpen,
  onOpenTopicDetails,
  onAddTopic,
  onViewTopicDetail,
}: TopicsPageProps) {
  const withTags = topics.filter((t) => t.tags.length > 0);
  const withoutTags = topics.filter((t) => t.tags.length === 0);

  return (
    <div className="p-6 flex flex-col gap-6 min-h-full pb-12 relative">
      {/* Page Header Ribbon */}
      <Card className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border-none shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-800/60 rounded-2xl overflow-hidden">
        <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col">
            <h1 className="text-display-lg text-ink dark:text-white tracking-tight">
              Danh sách chủ đề
            </h1>
            <p className="text-body text-ink-muted opacity-80 mt-0.5">
              Tổng hợp tất cả chủ đề trong hệ thống
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="relative w-[220px]">
              <Icon
                name="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-muted opacity-70"
              />
              <Input
                placeholder="Tìm kiếm chủ đề..."
                className="h-10 pl-9 bg-white/80 dark:bg-slate-950 border-slate-200 dark:border-slate-800/60 rounded-lg text-body shadow-none focus-visible:ring-[#2e5d97]/40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              className="h-10 bg-white/80 dark:bg-slate-950 border-slate-200 dark:border-slate-800 px-4 font-medium text-body-medium flex items-center gap-2 text-ink-secondary hover:text-ink hover:bg-white transition-colors rounded-lg shadow-none"
            >
              <Icon name="filter_list" className="size-4 opacity-80" />
              <span>Lọc</span>
            </Button>

            <Button
              className="h-10 bg-[#2e5d97] hover:bg-[#264f82] text-white shadow-md shadow-[#2e5d97]/20 flex items-center gap-1.5 px-5 rounded-lg font-medium"
              onClick={onAddTopic}
            >
              <Icon name="add" className="size-4" />
              <span>Thêm chủ đề</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview Mini-Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="overflow-hidden bg-white/80 dark:bg-slate-900/60 border-none shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-800/60 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <Icon name="menu_book" className="size-5" />
              </div>
              <span className="text-body-medium text-ink-secondary dark:text-slate-300">
                Tổng số chủ đề
              </span>
            </div>
            <div className="mt-3">
              <span className="text-stat text-ink dark:text-white">
                {topicsLoading ? "–" : topics.length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-white/80 dark:bg-slate-900/60 border-none shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-800/60 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                <Icon name="help" className="size-5" />
              </div>
              <span className="text-body-medium text-ink-secondary dark:text-slate-300">
                Tổng câu hỏi
              </span>
            </div>
            <div className="mt-3">
              <span className="text-stat text-ink dark:text-white">0</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-white/80 dark:bg-slate-900/60 border-none shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-800/60 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                <Icon name="work" className="size-5" />
              </div>
              <span className="text-body-medium text-ink-secondary dark:text-slate-300">
                Dự án sử dụng
              </span>
            </div>
            <div className="mt-3">
              <span className="text-stat text-ink dark:text-white">0</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-white/80 dark:bg-slate-900/60 border-none shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-800/60 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400">
                <Icon name="label" className="size-5" />
              </div>
              <span className="text-body-medium text-ink-secondary dark:text-slate-300">
                Tags đã dùng
              </span>
            </div>
            <div className="mt-3">
              <span className="text-stat text-ink dark:text-white">
                {topicsLoading ? "–" : uniqueTagCount}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content with Tabs */}
      <Tabs defaultValue="all" className="w-full space-y-5">
        <TabsList className="bg-white/60 !h-[40px] dark:bg-slate-900/50 p-1 border border-slate-200/50 dark:border-slate-800/50 rounded-lg h-auto gap-1 backdrop-blur-sm">
          <TabsTrigger
            value="all"
            className="rounded-sm h-[25px] px-5 py-1.5 text-body-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm cursor-pointer"
          >
            Tất cả
          </TabsTrigger>
          <TabsTrigger
            value="withTags"
            className="rounded-sm h-[25px] px-5 py-1.5 text-body-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm cursor-pointer"
          >
            Có tags
          </TabsTrigger>
          <TabsTrigger
            value="noTags"
            className="rounded-sm h-[25px] px-5 py-1.5 text-body-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm cursor-pointer"
          >
            Chưa có tags
          </TabsTrigger>
        </TabsList>

        {topicsLoading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-ink-muted">
            <Icon name="progress_activity" className="size-5 animate-spin" />
            <span className="text-body">Đang tải danh sách chủ đề...</span>
          </div>
        ) : (
          <>
            <TabsContent value="all" className="mt-0">
              <TopicGrid topics={topics} onOpen={onOpenTopicDetails} />
            </TabsContent>
            <TabsContent value="withTags" className="mt-0">
              <TopicGrid topics={withTags} onOpen={onOpenTopicDetails} />
            </TabsContent>
            <TabsContent value="noTags" className="mt-0">
              <TopicGrid topics={withoutTags} onOpen={onOpenTopicDetails} />
            </TabsContent>
          </>
        )}
      </Tabs>

      {/* Count summary */}
      {!topicsLoading && (
        <div className="flex flex-col items-center justify-center py-1 gap-3">
          <span className="text-caption text-ink-muted font-medium">
            Hiển thị {topics.length} / {totalCount} chủ đề
          </span>
        </div>
      )}

      {/* Detail Side Drawer/Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-md md:max-w-lg p-0 flex flex-col h-full border-l border-slate-200/60 dark:border-slate-800/60 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-lg">
          {selectedTopic && (
            <div className="h-full flex flex-col relative">
              {/* Fixed Header Section */}
              <div className="p-6 pt-8 flex flex-col gap-3 shrink-0">
                {selectedTopic.tags.length > 0 && (
                  <div className="flex items-center flex-wrap gap-1.5">
                    {selectedTopic.tags.map((tag) => {
                      const colors = uuidToColor(tag.code);
                      return (
                        <Badge
                          key={tag.id}
                          className="border shadow-none px-2.5 py-0.5 text-caption-strong uppercase"
                          style={{
                            backgroundColor: colors.bg,
                            color: colors.text,
                            borderColor: colors.border,
                          }}
                        >
                          {tag.name}
                        </Badge>
                      );
                    })}
                  </div>
                )}
                <h2 className="text-display-md text-ink dark:text-white leading-snug">
                  {selectedTopic.title}
                </h2>
                <p className="text-caption text-ink-muted">
                  Tạo lúc{" "}
                  {new Date(selectedTopic.createdAt).toLocaleDateString(
                    "vi-VN",
                  )}
                </p>
              </div>

              {/* Fixed Stats Section */}
              <div className="px-6 pb-6 shrink-0">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-3 bg-white dark:bg-slate-900/80 shadow-sm border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-0 flex flex-col items-center text-center">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 mb-2">
                        <Icon name="help" className="size-5 text-[#2e5d97]" />
                      </div>
                      <span className="text-stat text-ink dark:text-white">
                        0
                      </span>
                      <span className="text-caption text-ink-muted mt-0.5">
                        Câu hỏi
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="p-3 bg-white dark:bg-slate-900/80 shadow-sm border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-0 flex flex-col items-center text-center">
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 mb-2">
                        <Icon
                          name="label"
                          className="size-5 text-emerald-600 dark:text-emerald-400"
                        />
                      </div>
                      <span className="text-stat text-ink dark:text-white">
                        {selectedTopic.tags.length}
                      </span>
                      <span className="text-caption text-ink-muted mt-0.5">
                        Tags
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Scrollable Body */}
              <ScrollArea className="flex-1 min-h-0 px-6">
                <div className="space-y-6 pb-8">
                  <div className="text-center py-6 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
                    <span className="text-body text-ink-muted">
                      Chưa có dự án nào sử dụng chủ đề này
                    </span>
                  </div>
                </div>
              </ScrollArea>

              {/* Fixed Footer */}
              <div className="shrink-0 p-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-2 gap-3 z-10 mt-auto">
                <Button
                  variant="outline"
                  className="h-11 text-body-strong text-ink-secondary bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg"
                >
                  <Icon name="edit" className="mr-2 size-4" /> Chỉnh sửa
                </Button>
                <Button
                  className="h-11 text-body-strong bg-[#2e5d97] hover:bg-[#2e5d97]/90 text-white shadow-md rounded-lg"
                  onClick={() => {
                    setSheetOpen(false);
                    onViewTopicDetail(selectedTopic.id);
                  }}
                >
                  Xem câu hỏi{" "}
                  <Icon name="chevron_right" className="ml-1 size-4" />
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

// ─── Subcomponents ────────────────────────────────────────────────────────────
function TopicGrid({
  topics,
  onOpen,
}: {
  topics: TopicResponse[];
  onOpen: (topic: TopicResponse) => void;
}) {
  if (topics.length === 0) return <EmptyState />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} onOpen={() => onOpen(topic)} />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
      <Icon name="inbox" className="size-10 text-ink-muted opacity-40" />
      <p className="text-body text-ink-muted">Không có chủ đề nào</p>
    </div>
  );
}

function TopicCard({
  topic,
  onOpen,
}: {
  topic: TopicResponse;
  onOpen: () => void;
}) {
  const { title, tags, createdAt } = topic;
  const initials = getInitials(title);
  const firstTag = tags[0] as TagResponse | undefined;

  return (
    <Card className="group overflow-hidden flex flex-col bg-white dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 rounded-xl">
      <CardHeader className="p-0 pb-0 space-y-2 flex-none">
        <div className="flex justify-between items-center">
          <div className="flex gap-1.5 flex-wrap">
            {topic.tags.length > 0 ? (
              topic.tags.slice(0, 2).map((tag) => {
                const colors = uuidToColor(tag.code);
                return (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className="shadow-none uppercase text-caption-strong px-2.5 py-1"
                    style={{
                      backgroundColor: colors.bg,
                      color: colors.text,
                      borderColor: colors.border,
                    }}
                  >
                    {tag.name}
                  </Badge>
                );
              })
            ) : (
              <Badge
                variant="secondary"
                className="bg-slate-100 text-ink-muted dark:bg-slate-800 dark:text-slate-400 text-caption-strong"
              >
                Chưa có tags
              </Badge>
            )}
            {topic.tags.length > 2 && (
              <Badge
                variant="secondary"
                className="bg-slate-100 text-ink-muted dark:bg-slate-800 dark:text-slate-400 text-caption-strong"
              >
                +{topic.tags.length - 2}
              </Badge>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-full -mr-2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <Icon name="more_vert" className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem className="text-body-medium flex items-center gap-2 cursor-pointer">
                <Icon name="edit" className="size-3.5" /> Sửa
              </DropdownMenuItem>
              <DropdownMenuItem className="text-body-medium flex items-center gap-2 cursor-pointer">
                <Icon name="open_in_new" className="size-3.5" /> Xem chi tiết
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CardTitle className="!text-display-sm text-ink dark:text-white line-clamp-2 group-hover:text-[#2e5d97] dark:group-hover:text-blue-400 transition-colors min-h-[2rem]">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 pt-0 flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-4 text-ink-secondary dark:text-slate-400 text-body-medium">
          <div className="flex items-center gap-1.5">
            <Icon name="help" className="size-4 text-ink-muted" />
            <span>0</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="label" className="size-4 text-ink-muted" />
            <span>{topic.tags.length}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-caption-strong text-ink-muted">
            <span>Mức độ hoàn thiện</span>
            <span className="text-[#2e5d97] dark:text-blue-400">0%</span>
          </div>
          <div className="relative w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="absolute h-full top-0 left-0 rounded-full opacity-85 transition-all duration-500 ease-out"
              style={{
                width: "0%",
                background: firstTag
                  ? `linear-gradient(to right, ${uuidToColor(firstTag.code).text}, ${uuidToColor(firstTag.code).bg})`
                  : "linear-gradient(to right, #628ecb, #2e5d97)",
              }}
            />
          </div>
        </div>
      </CardContent>

      <Separator className="bg-slate-200 dark:bg-slate-800 mt-2" />

      <CardFooter className="mt-2 px-1 py-2 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/20">
        <div className="flex items-center gap-2 text-caption font-medium text-ink-secondary dark:text-slate-400">
          <Avatar className="size-6 bg-slate-100 text-slate-600 text-[9px] font-bold ring-1 ring-white dark:ring-slate-900">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span>{new Date(createdAt).toLocaleDateString("vi-VN")}</span>
        </div>
        <Button
          variant="link"
          className="text-caption-strong text-[#2e5d97] dark:text-blue-400 p-0 h-auto gap-1 hover:no-underline group-hover:translate-x-1 transition-transform duration-300 cursor-pointer"
          onClick={onOpen}
        >
          Xem chi tiết <Icon name="chevron_right" className="size-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
