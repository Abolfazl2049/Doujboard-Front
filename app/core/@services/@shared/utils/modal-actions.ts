import type { DeleteModalProps } from "~/components/Modal/Delete.vue";

const confirmDeleteItem = (
  props: DeleteModalProps,
  {
    onDelete,
  }: {
    onDelete?: () => any;
  } = {},
) => {
  PublicModalChannel.publish({
    actionType: "open",
    name: "deleteItem",
    deleteProps: props,
  });
  PublicModalChannel.subscribe(
    (ev) => {
      if (ev?.name === "deleteItem" && ev.actionType === "callback") {
        onDelete?.();
      }
    },
    { once: true },
  );
};
export { confirmDeleteItem };
