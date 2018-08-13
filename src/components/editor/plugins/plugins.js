import AutoReplace from "slate-auto-replace"
import EditList from "slate-edit-list"
import EditBlockquote from "slate-edit-blockquote"
import EditTable from "slate-edit-table"
import markHotkey from "components/editor/plugins/markHotkey"
import MARKS from "components/editor/constants/marks"
import BLOCKS from "components/editor/constants/blocks"

const plugins = [
  EditTable(),
  EditBlockquote(),
  EditList({
    types: [BLOCKS.OL_LIST, BLOCKS.UL_LIST],
    typeItem: BLOCKS.LIST_ITEM,
  }),
  AutoReplace({
    trigger: "enter",
    before: /^(table:[1-9]\d?x[1-9]\d?)$/,
    transform: (transform, e, matches) => {
      const input = matches.before.input.replace("table:", "")
      const columns = input.split("x")[1]
      const rows = input.split("x")[0]

      return EditTable().changes.insertTable(transform, columns, rows)
    },
  }),
  AutoReplace({
    trigger: "space",
    before: /^(>)$/,
    transform: transform =>
      EditBlockquote().changes.wrapInBlockquote(transform),
  }),
  AutoReplace({
    trigger: "space",
    before: /^(-)$/,
    transform: transform =>
      EditList().changes.wrapInList(transform, BLOCKS.UL_LIST),
  }),
  AutoReplace({
    trigger: "space",
    before: /^(1.)$/,
    transform: transform =>
      EditList().changes.wrapInList(transform, BLOCKS.OL_LIST),
  }),
  AutoReplace({
    trigger: "enter",
    before: /^(-{3})$/,
    transform: transform =>
      transform.insertBlock({
        type: BLOCKS.HR,
        isVoid: true,
      }),
  }),
  AutoReplace({
    trigger: "space",
    before: /^(#{1,6})$/,
    transform: (transform, e, matches) => {
      const [hashes] = matches.before
      const level = hashes.length
      return transform.setBlocks({ type: `heading_${level}` })
    },
  }),
  markHotkey({ key: "b", type: MARKS.BOLD }),
  markHotkey({ key: "i", type: MARKS.ITALIC }),
  markHotkey({ key: "d", type: MARKS.STRIKETHROUGH }),
  markHotkey({ key: "u", type: MARKS.UNDERLINE }),
]

export default plugins