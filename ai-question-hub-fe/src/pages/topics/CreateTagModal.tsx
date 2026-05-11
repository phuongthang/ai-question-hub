import * as React from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateTagModalProps {
  open: boolean;
  isSubmitting: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export function CreateTagModal({
  open,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit,
}: CreateTagModalProps) {
  const [name, setName] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Reset & focus when opening
  React.useEffect(() => {
    if (open) {
      setName("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) return;
    onSubmit(name.trim());
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal
        aria-labelledby="create-tag-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="w-full max-w-sm bg-white rounded-2xl shadow-[0_24px_48px_-12px_rgba(15,23,42,0.2)] border border-white/60 animate-in zoom-in-95 fade-in duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[rgba(98,142,203,0.12)] flex items-center justify-center">
                <Icon name="label" className="size-4 text-[#2e5d97]" />
              </div>
              <h2
                id="create-tag-title"
                className="text-base font-semibold text-on-surface"
              >
                Tạo tag mới
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-ink-muted hover:text-on-surface transition-colors p-1 rounded-lg hover:bg-slate-100"
              aria-label="Đóng"
            >
              <Icon name="close" className="size-5" />
            </button>
          </div>

          {/* Body */}
          <form
            onSubmit={handleSubmit}
            className="px-5 py-4 flex flex-col gap-4"
          >
            {/* Error */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200/60 rounded-xl px-3 py-2.5 flex items-start gap-2">
                <Icon
                  name="error"
                  className="size-4 text-red-500 shrink-0 mt-0.5"
                />
                <p className="text-xs text-red-600 font-medium">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Name field */}
            <div className="space-y-1.5">
              <Label
                htmlFor="tag-name"
                className="text-sm font-semibold text-on-surface"
              >
                Tên tag <span className="text-red-500">*</span>
              </Label>
              <Input
                ref={inputRef}
                id="tag-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="vd: Machine Learning, Java, DevOps..."
                maxLength={100}
                className="h-10 rounded-lg bg-white border-[rgba(148,163,184,0.35)] text-on-surface placeholder:text-ink-muted focus-visible:ring-2 focus-visible:ring-[#2e5d97]/25 focus-visible:border-[#2e5d97] transition-all"
              />
              <p className="text-xs text-ink-muted">
                Slug sẽ được tự động tạo từ tên tag.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={isSubmitting}
                className="h-9 px-4 text-sm font-semibold text-ink-secondary hover:bg-slate-100 rounded-lg"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={!name.trim() || isSubmitting}
                className="h-9 px-5 text-sm font-semibold bg-[#628ECB] hover:bg-[#4976b1] text-white rounded-lg shadow-sm shadow-[rgba(98,142,203,0.25)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Icon
                      name="progress_activity"
                      className="size-4 animate-spin"
                    />
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <Icon name="add" className="size-4" />
                    Tạo tag
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
