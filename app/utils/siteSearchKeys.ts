/**
 * True when the event target is a text field that should keep Ctrl/Cmd+K.
 */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
    return true;
  }

  const editable = target.getAttribute('contenteditable');
  return (
    Boolean(target.isContentEditable) || editable === '' || editable === 'true'
  );
}
