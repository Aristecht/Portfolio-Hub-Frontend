"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { GripVertical, Link2, Plus } from "lucide-react";
import { cn } from "@/utils/tw-merge";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Spinner } from "@/components/common/ui/Spinner";
import {
  useCreateSocialLinkMutation,
  useRemoveSocialLinkMutation,
  useUpdateSocialLinkMutation,
  useReorderSocialLinksMutation,
  useFindSocialMediaQuery,
} from "@/generated/output";

type EditableSocialLink = {
  id: string;
  title: string;
  url: string;
  isNew?: boolean;
};

function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    return new URL(trimmed).toString();
  } catch {
    try {
      return new URL(`https://${trimmed}`).toString();
    } catch {
      return null;
    }
  }
}

function SortableRow({
  item,
  index,
  isBusy,
  t,
  onUpdate,
  onSave,
  onDelete,
}: {
  item: EditableSocialLink;
  index: number;
  isBusy: boolean;
  t: (key: string) => string;
  onUpdate: (id: string, field: "title" | "url", value: string) => void;
  onSave: (item: EditableSocialLink) => void;
  onDelete: (item: EditableSocialLink) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-card border-border group shadow-soft flex overflow-hidden rounded-xl border transition-shadow duration-200",
        isDragging && "shadow-large ring-primary/20 z-10 ring-2"
      )}
    >
      <button
        type="button"
        className={cn(
          "border-border/50 text-muted-foreground flex w-9 shrink-0 touch-none items-center justify-center border-r transition-colors duration-150",
          "hover:bg-muted/50 hover:text-foreground",
          "cursor-grab active:cursor-grabbing"
        )}
        {...attributes}
        {...listeners}
        tabIndex={-1}
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <div className="flex-1 space-y-3 p-3 sm:p-4">
        <div className="flex items-center gap-2.5">
          <span className="bg-muted text-muted-foreground flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold tabular-nums">
            {index + 1}
          </span>
          <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-2">
            <Input
              value={item.title}
              onChange={(e) => onUpdate(item.id, "title", e.target.value)}
              placeholder={t("titlePlaceholder")}
              disabled={isBusy}
              inputSize="sm"
            />
            <Input
              value={item.url}
              onChange={(e) => onUpdate(item.id, "url", e.target.value)}
              placeholder={t("urlPlaceholder")}
              disabled={isBusy}
              inputSize="sm"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pl-7.5">
          <Button
            type="button"
            size="sm"
            onClick={() => onSave(item)}
            disabled={isBusy}
          >
            {isBusy && <Spinner size="xs" variant="current" />}
            {t("save")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onDelete(item)}
            disabled={isBusy}
            className="text-destructive hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
          >
            {t("remove")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SocialLinksForm() {
  const t = useTranslations("auth.settings.social");
  const { data, loading } = useFindSocialMediaQuery({
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  });

  const [draftItems, setDraftItems] = useState<EditableSocialLink[] | null>(
    null
  );

  const [createSocialLink, { loading: creating }] = useCreateSocialLinkMutation(
    {
      refetchQueries: ["findSocialMedia"],
      onCompleted() {
        setDraftItems(null);
        toast.success(t("createSuccess"));
      },
      onError(error) {
        toast.error(error.message || t("error"));
      },
    }
  );

  const [updateSocialLink, { loading: updating }] = useUpdateSocialLinkMutation(
    {
      refetchQueries: ["findSocialMedia"],
      onCompleted() {
        setDraftItems(null);
        toast.success(t("updateSuccess"));
      },
      onError(error) {
        toast.error(error.message || t("error"));
      },
    }
  );

  const [removeSocialLink, { loading: removing }] = useRemoveSocialLinkMutation(
    {
      refetchQueries: ["findSocialMedia"],
      onCompleted() {
        setDraftItems(null);
        toast.success(t("removeSuccess"));
      },
      onError(error) {
        toast.error(error.message || t("error"));
      },
    }
  );

  const [reorderSocialLinks] = useReorderSocialLinksMutation({
    refetchQueries: ["findSocialMedia"],
    onError() {
      toast.error(t("error"));
    },
  });

  const serverItems = useMemo<EditableSocialLink[]>(
    () =>
      [...(data?.findSocialMedia ?? [])]
        .sort((a, b) => a.position - b.position)
        .map((item) => ({ id: item.id, title: item.title, url: item.url })),
    [data]
  );

  const items = draftItems ?? serverItems;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const source = draftItems ?? serverItems;
    const oldIndex = source.findIndex((i) => i.id === active.id);
    const newIndex = source.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(source, oldIndex, newIndex);
    setDraftItems(reordered);

    const savedItems = reordered.filter((item) => !item.isNew);
    if (savedItems.length === 0) return;
    reorderSocialLinks({
      variables: {
        list: savedItems.map((item, idx) => ({ id: item.id, position: idx })),
      },
    });
  }

  function updateItem(id: string, field: "title" | "url", value: string) {
    setDraftItems((current) => {
      const source = current ?? serverItems;
      return source.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      );
    });
  }

  function addItem() {
    setDraftItems((current) => [
      ...(current ?? serverItems),
      { id: `new-${Date.now()}`, title: "", url: "", isNew: true },
    ]);
  }

  async function saveItem(item: EditableSocialLink) {
    if (!item.title.trim()) {
      toast.error(t("requiredTitle"));
      return;
    }
    if (!item.url.trim()) {
      toast.error(t("requiredUrl"));
      return;
    }
    const normalizedUrl = normalizeUrl(item.url);
    if (!normalizedUrl) {
      toast.error(t("invalidUrl"));
      return;
    }

    if (item.isNew) {
      await createSocialLink({
        variables: { data: { title: item.title.trim(), url: normalizedUrl } },
      });
      return;
    }

    await updateSocialLink({
      variables: {
        id: item.id,
        data: { title: item.title.trim(), url: normalizedUrl },
      },
    });
  }

  async function deleteItem(item: EditableSocialLink) {
    if (item.isNew) {
      setDraftItems((current) =>
        (current ?? serverItems).filter((i) => i.id !== item.id)
      );
      return;
    }
    await removeSocialLink({ variables: { id: item.id } });
  }

  const isBusy = creating || updating || removing;

  if (loading && items.length === 0) {
    return (
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Spinner size="sm" />
        <span>{t("loading")}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="border-border flex flex-col items-center gap-2 rounded-xl border border-dashed py-10 text-center">
          <Link2 className="text-muted-foreground/50 h-7 w-7" />
          <p className="text-muted-foreground text-sm">{t("empty")}</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {items.map((item, index) => (
                <SortableRow
                  key={item.id}
                  item={item}
                  index={index}
                  isBusy={isBusy}
                  t={t}
                  onUpdate={updateItem}
                  onSave={saveItem}
                  onDelete={deleteItem}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addItem}
        disabled={isBusy}
        className="gap-1.5"
      >
        <Plus className="h-4 w-4" />
        {t("add")}
      </Button>
    </div>
  );
}
