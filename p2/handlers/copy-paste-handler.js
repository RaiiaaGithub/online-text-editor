import AREAS from "../core/constants/areas.js";
import GlobalService from "../core/singleton.js";
import { stringSplitEndlines, stringSubstring } from "../utils/strings.js";
import { getCaretPosition } from "./editor/caret-handler.js";
import { handleNewLine } from "./editor/text-handlers.js";

const globalService = new GlobalService();

export function handlePasteCommands(e) {
  const area = globalService.currentArea;

  switch (area) {
    case AREAS.EDITOR:
      handlePasteEditorCommands(e);
      break;
    case AREAS.FILE_EXPLORER:
      handleFileExplorerCommands();
      break;
    default:
      break;
  }
}

export function handleCopyCommands(e) {
  const area = globalService.currentArea;

  switch (area) {
    case AREAS.EDITOR:
      handleCopyEditorCommands(e);
      break;
    case AREAS.FILE_EXPLORER:
      break;
    default:
      break;
  }
}

/**
 * Handles paste editor commands by preventing the default behavior, retrieving the pasted text from the clipboard data,
 * and performing necessary actions based on the pasted text.
 * @param {ClipboardEvent} e - The event object associated with the paste editor command.
 * @returns None
 */
function handlePasteEditorCommands(e) {
  e.preventDefault();
  const node = globalService.clipboardBuffer.head;

  let text;
  if (!!node) {
    text = node.value;
  } else {
    const clipboardData = e.clipboardData;
    const pastedText = clipboardData.getData("text");
    text = pastedText.toString();
  }

  const stringArray = stringSplitEndlines(text);

  if (stringArray.length === 1) {
    const str = text[0];
    const activeInput = document.querySelector(
      '.input-line[data-current-line="true"]'
    );
    const spanElement = activeInput.querySelector(".input");
    const { start, end } = getCaretPosition();
    const result = stringSubstring(spanElement.textContent, start, end);
    if (result.error) {
      console.error(result.error);
      return;
    }
    spanElement.textContent = result.ok.before + str + result.ok.after;

    const newCaretPosition = start + stringArray[0].length;
    setInputFieldCaretPosition(spanElement, newCaretPosition);
    return;
  }

  for (let i = 0; i < stringArray.length; i++) {
    const str = stringArray[i];
    handleNewLine(e, str);
  }
}

function handleCopyEditorCommands(e) {
  e.preventDefault();
  const activeInput = document.querySelector(
    '.input-line[data-current-line="true"]'
  );
  const spanElement = activeInput.querySelector(".input");
  const { start, end, size } = getCaretPosition();

  if (size > 0) {
    const startOffset = start < end ? start : end;
    const endOffset = start < end ? end : start;
    const selected = stringSubstring(
      spanElement.textContent,
      startOffset,
      endOffset
    );
    if (selected.error) {
      console.error(selected.error);
      return;
    }
    const text = selected.ok.selected;
    globalService.clipboardBuffer.insertFirst(text);
    console.log(`Added ${text ?? "undefined"} to the clipboard`);
    return;
  }

  if (!spanElement.textContent) {
    globalService.clipboardBuffer.insertFirst("");
    return;
  }
  globalService.clipboardBuffer.insertFirst(spanElement.textContent);
}
