import {
  ReasoningTrace,
  ToolCall,
  ContextMeter,
  Message,
  MessageList,
  Composer,
  TypingIndicator,
  ThreadList,
  Button,
} from '@cesium-ds/core';
import { useState } from 'react';
import type { ComponentDoc } from './types';

/* ------------------------------------------------------------------ */
/* AI                                                                  */
/* ------------------------------------------------------------------ */

function TraceDemo() {
  return (
    <div style={{ width: 470 }}>
      <ReasoningTrace
        steps={[
          {
            id: 'parse',
            label: 'Parse the request into a scene query',
            detail: 'region=EMEA · layer=imagery · window=24h',
            time: '0.2s',
          },
          {
            id: 'search',
            label: 'Search the asset catalogue',
            detail: '412 candidates, 6 above 0.8',
            time: '0.9s',
          },
          {
            id: 'tiles',
            label: 'Check tile availability for each candidate',
            detail: 'T31TCH_20261018 — 3 of 4 levels warm',
            status: 'active',
            time: '1.4s',
          },
          { id: 'answer', label: 'Compose the answer', status: 'pending' },
        ]}
      />
    </div>
  );
}

function TraceCollapsed() {
  return (
    <div style={{ width: 470 }}>
      <ReasoningTrace
        defaultOpen={false}
        summary="4 steps · 2.6s"
        steps={[
          { id: 'a', label: 'Parse the request into a scene query', time: '0.2s' },
          { id: 'b', label: 'Search the asset catalogue', time: '0.9s' },
          { id: 'c', label: 'Check tile availability', time: '1.4s' },
          { id: 'd', label: 'Compose the answer', time: '0.1s' },
        ]}
      />
    </div>
  );
}

function ToolCallDemo() {
  return (
    <div className="cs-stack" style={{ width: 470, gap: 8 }}>
      <ToolCall
        name="search_catalog"
        args={{ region: 'EMEA', layer: 'imagery', limit: 3 }}
        status="done"
        duration="312 ms"
        defaultOpen
        result={`[
  { "id": "a2", "name": "T31TCH_20261018", "cloud": 4, "epsg": 32631 },
  { "id": "a6", "name": "T32TMT_20261017", "cloud": 11, "epsg": 32632 },
  { "id": "a9", "name": "T31TCJ_20261015", "cloud": 38, "epsg": 32631 }
]`}
      />
      <ToolCall
        name="read_tile_stats"
        args={{ asset: 'a3', level: 14 }}
        status="running"
        duration="1.2 s"
      />
      <ToolCall
        name="fetch_scene"
        args={{ id: 'a9', format: 'cog' }}
        status="failed"
        duration="204 ms"
        defaultOpen
        result="HTTP 403 — credentials for bucket emea-imagery expired 41 minutes ago."
      />
    </div>
  );
}

function ContextDemo() {
  return (
    <div style={{ width: 420 }}>
      <ContextMeter
        limit={128000}
        segments={[
          { label: 'system', tokens: 2140 },
          { label: 'tools', tokens: 12800, tone: 'warning' },
          { label: 'history', tokens: 18400, tone: 'accent' },
          { label: 'retrieved', tokens: 9600, tone: 'success' },
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chat                                                                */
/* ------------------------------------------------------------------ */

function MessageDemo() {
  return (
    <div style={{ width: 520 }}>
      <MessageList>
        <Message role="user" time="14:02">
          Why did p95 frame time jump to 22 ms in EMEA?
        </Message>
        <Message
          role="assistant"
          author="Cesium"
          time="14:02"
          meta={[
            { label: 'tokens', value: '842' },
            { label: 'latency', value: '1.4s' },
          ]}
        >
          Three of the four terrain levels for T31TCH are cold, so the renderer is falling back to
          level 12 for the whole tile. Warm the cache with{' '}
          <code>tiles.prefetch("T31TCH")</code> and p95 should return to ~9 ms.
        </Message>
        <Message role="system" time="14:02">
          tool · search_catalog · 312 ms · 3 results
        </Message>
      </MessageList>
    </div>
  );
}

function MessageStreaming() {
  return (
    <div style={{ width: 520 }}>
      <MessageList>
        <Message role="assistant" author="Cesium" time="14:03" streaming>
          The bottleneck is in the terrain decoder, not the network — the
        </Message>
      </MessageList>
    </div>
  );
}

function ComposerDemo() {
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  return (
    <div className="cs-stack" style={{ width: 480, gap: 10 }}>
      <Composer
        value={value}
        onChange={setValue}
        busy={busy}
        maxLength={4000}
        onSend={() => {
          setLog((l) => [`sent · ${value.trim().length} chars`, ...l].slice(0, 2));
          setValue('');
        }}
        onStop={() => setBusy(false)}
      />
      <div className="cs-row" style={{ gap: 8 }}>
        <Button size="sm" variant="ghost" onClick={() => setBusy((b) => !b)}>
          {busy ? 'End generation' : 'Simulate streaming'}
        </Button>
        {log.map((line) => (
          <span key={line} className="cs-t-xs cs-dimmer cs-mono">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}

function TypingDemo() {
  return (
    <div className="cs-stack" style={{ gap: 14 }}>
      <TypingIndicator />
      <TypingIndicator label="Retrieving tiles" />
      <TypingIndicator label="Calling search_catalog" />
    </div>
  );
}

function ThreadDemo() {
  const [active, setActive] = useState('t1');
  return (
    <div style={{ width: 300, border: '1px solid var(--cs-border-subtle)', borderRadius: 3 }}>
      <ThreadList
        value={active}
        onSelect={setActive}
        items={[
          {
            id: 't1',
            title: 'Tile cache pressure',
            preview: 'Why did p95 frame time jump to 22 ms in EMEA?',
            time: '14:02',
          },
          {
            id: 't2',
            title: 'Scene budget for Denver',
            preview: 'The 3D tileset is 8.1 GB — can we stream it?',
            time: '11:40',
            unread: 2,
          },
          {
            id: 't3',
            title: 'Radar mosaic failure',
            preview: 'HTTP 403 from the bucket, credentials expired.',
            time: '09:15',
          },
          {
            id: 't4',
            title: 'Projection question',
            preview: 'EPSG:4978 vs 32631 for the tile pipeline.',
            time: 'Yesterday',
          },
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

export const aiChat: ComponentDoc[] = [
  {
    slug: 'reasoning-trace',
    name: 'ReasoningTrace',
    category: 'AI',
    status: 'New',
    summary: 'The steps an agent took, as a collapsible list with per-step timing.',
    intro:
      'A trace is an audit trail, not a feature. It stays open while a step is running — a trace you have to click to watch is a trace nobody watches — and collapses to one line when it finishes.',
    examples: [
      {
        title: 'Mid-run',
        description:
          'The active step carries an accent dot with a soft ring; the thread between dots stops short of the next one.',
        code: `<ReasoningTrace
  steps={[
    { id: 'parse', label: 'Parse the request', detail: 'region=EMEA', time: '0.2s' },
    { id: 'search', label: 'Search the catalogue', time: '0.9s' },
    { id: 'tiles', label: 'Check tile availability', status: 'active', time: '1.4s' },
    { id: 'answer', label: 'Compose the answer', status: 'pending' },
  ]}
/>`,
        render: TraceDemo,
        align: 'stretch',
      },
      {
        title: 'Collapsed',
        description: 'The header keeps the summary and total time once the run is over.',
        code: `<ReasoningTrace defaultOpen={false} summary="4 steps · 2.6s" steps={steps} />`,
        render: TraceCollapsed,
        align: 'stretch',
      },
    ],
    props: [
      { name: 'steps', type: 'TraceStep[]', default: '—', description: 'id, label, detail, status, time.' },
      { name: 'title', type: 'ReactNode', default: "'Reasoning'", description: 'Header caption.' },
      { name: 'summary', type: 'ReactNode', default: 'step count', description: 'Right-hand caption when idle.' },
      { name: 'defaultOpen', type: 'boolean', default: 'true', description: 'Initial expanded state.' },
      { name: 'open', type: 'boolean', default: '—', description: 'Controlled state.' },
      { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', description: 'Fires on toggle.' },
    ],
    a11y: [
      'The header is a button with aria-expanded; the list is an ordered list, so step order is announced.',
      'Status is never carried by colour alone — the active step is also the one with a running summary.',
    ],
    related: ['tool-call', 'message', 'context-meter'],
  },

  {
    slug: 'tool-call',
    name: 'ToolCall',
    category: 'AI',
    status: 'New',
    summary: 'One tool invocation: name, arguments, status, duration and raw result.',
    intro:
      'The header is meant to be readable without expanding it — name, arguments, duration, outcome. The body is the payload exactly as it came back, in monospace, because the first thing anyone does with a failed call is read it.',
    examples: [
      {
        title: 'Running, done, failed',
        description:
          'Arguments are rendered as k="v" · k=v. The chevron only appears when there is a result to show.',
        code: `<ToolCall
  name="search_catalog"
  args={{ region: 'EMEA', layer: 'imagery', limit: 3 }}
  status="done"
  duration="312 ms"
  result={payload}
/>`,
        render: ToolCallDemo,
        align: 'stretch',
      },
    ],
    props: [
      { name: 'name', type: 'string', default: '—', description: 'Tool identifier, printed in monospace.' },
      { name: 'args', type: 'Record<string, string | number | boolean>', default: '—', description: 'Arguments shown inline.' },
      { name: 'status', type: "'running' | 'done' | 'failed'", default: "'done'", description: 'Drives icon and status colour.' },
      { name: 'result', type: 'ReactNode', default: '—', description: 'Payload; a string is printed as-is.' },
      { name: 'duration', type: 'string', default: '—', description: 'Formatted elapsed time.' },
      { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Expands the payload initially.' },
    ],
    a11y: [
      'The toggle is a button with aria-expanded and an accessible label.',
      'A failed call prints the error text in the body, so the failure is not only a red status word.',
    ],
    related: ['reasoning-trace', 'message', 'table'],
  },

  {
    slug: 'context-meter',
    name: 'ContextMeter',
    category: 'AI',
    status: 'New',
    summary: 'How much of the context window is spent, split by what spent it.',
    intro:
      'The bar is scaled to the limit, not to the used total: an empty half means room left. Segments are tokens, not percentages, so the legend can show the real numbers.',
    examples: [
      {
        title: 'Segmented usage',
        description: '4 segments, 42.9k of 128k — the bar fills a third of the frame.',
        code: `<ContextMeter
  limit={128000}
  segments={[
    { label: 'system', tokens: 2140 },
    { label: 'tools', tokens: 12800, tone: 'warning' },
    { label: 'history', tokens: 18400, tone: 'accent' },
    { label: 'retrieved', tokens: 9600, tone: 'success' },
  ]}
/>`,
        render: ContextDemo,
        align: 'stretch',
      },
    ],
    props: [
      { name: 'segments', type: 'ContextSegment[]', default: '—', description: 'label, tokens, tone.' },
      { name: 'limit', type: 'number', default: '—', description: 'Context window size in tokens.' },
      { name: 'label', type: 'ReactNode', default: "'Context'", description: 'Left caption.' },
      { name: 'showLegend', type: 'boolean', default: 'true', description: 'Prints the per-segment counts.' },
    ],
    a11y: [
      'The bar is role="img" with an aria-label listing every segment and its token count, so the legend is not the only way to read it.',
    ],
    related: ['progress', 'stat', 'reasoning-trace'],
  },

  {
    slug: 'message',
    name: 'Message',
    category: 'Chat',
    status: 'New',
    summary: 'One turn in a transcript, with role, timing and an optional streaming caret.',
    intro:
      'A transcript, not a bubble sheet. The role sits above the text in 9.5px monospace; a user turn gets a tinted block with a 2px edge, an assistant turn stays on the page. System turns are monospace and dim.',
    examples: [
      {
        title: 'Transcript',
        description: 'MessageList renders role="log", so new turns are announced without stealing focus.',
        code: `<MessageList>
  <Message role="user" time="14:02">Why did p95 jump to 22 ms?</Message>
  <Message role="assistant" author="Cesium" meta={[{ label: 'tokens', value: '842' }]}>
    Three of the four terrain levels are cold…
  </Message>
  <Message role="system">tool · search_catalog · 312 ms</Message>
</MessageList>`,
        render: MessageDemo,
        align: 'stretch',
      },
      {
        title: 'Streaming',
        description: 'The caret is a 6px block that blinks on a step timing, not a fade.',
        code: `<Message role="assistant" streaming>
  The bottleneck is in the terrain decoder, not the network —
</Message>`,
        render: MessageStreaming,
        align: 'stretch',
      },
    ],
    props: [
      { name: 'role', type: "'user' | 'assistant' | 'system' | 'tool'", default: '—', description: 'Sets the treatment and the label.' },
      { name: 'author', type: 'ReactNode', default: '—', description: 'Display name next to the role.' },
      { name: 'time', type: 'ReactNode', default: '—', description: 'Right-aligned timestamp.' },
      { name: 'streaming', type: 'boolean', default: 'false', description: 'Adds the caret and aria-busy.' },
      { name: 'meta', type: 'Array<{ label, value }>', default: '—', description: 'Token counts, latency, cost.' },
      { name: 'actions', type: 'ReactNode', default: '—', description: 'Trailing controls under the body.' },
    ],
    a11y: [
      'aria-busy on a streaming turn tells assistive technology the text is still arriving.',
      'Role is printed as text, so it is not conveyed by colour alone.',
    ],
    related: ['composer', 'typing-indicator', 'thread-list'],
  },

  {
    slug: 'composer',
    name: 'Composer',
    category: 'Chat',
    status: 'New',
    summary: 'The input line: attach, hint, counter, and send that becomes stop.',
    intro:
      'Enter sends, Shift+Enter breaks the line. That contract is printed as a mono hint rather than explained in a tooltip, because it is the one thing people get wrong in a chat box.',
    examples: [
      {
        title: 'Composing and streaming',
        description:
          'While busy the button becomes a stop square and Enter is inert. The counter only appears when maxLength is set.',
        code: `<Composer
  value={value}
  onChange={setValue}
  busy={busy}
  maxLength={4000}
  onSend={send}
  onStop={stop}
/>`,
        render: ComposerDemo,
        align: 'stretch',
      },
    ],
    props: [
      { name: 'value', type: 'string', default: '—', description: 'Controlled text; omit for uncontrolled.' },
      { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Fires on every keystroke.' },
      { name: 'onSend', type: '() => void', default: '—', description: 'Enter or the send button.' },
      { name: 'onStop', type: '() => void', default: '—', description: 'The stop button, shown while busy.' },
      { name: 'busy', type: 'boolean', default: 'false', description: 'Swaps send for stop and blocks Enter.' },
      { name: 'maxLength', type: 'number', default: '—', description: 'Adds the character counter.' },
      { name: 'rows', type: 'number', default: '2', description: 'Initial height in rows.' },
      { name: 'hint', type: 'ReactNode', default: "'⏎ send · ⇧⏎ line break'", description: 'Keyboard legend.' },
    ],
    a11y: [
      'The textarea is labelled by aria-label; both buttons carry their own labels rather than relying on the icon.',
      'The stop button stays focusable while busy — stopping a run must not require a mouse.',
    ],
    related: ['message', 'textarea', 'button'],
  },

  {
    slug: 'typing-indicator',
    name: 'TypingIndicator',
    category: 'Chat',
    status: 'New',
    summary: 'Three dots and a caption: what the surface does while it waits.',
    intro:
      'The dots run on a 1.15s cycle with 140ms between them. The caption is the useful half — "Retrieving tiles" tells you more than three dots ever will.',
    examples: [
      {
        title: 'Captions',
        description: 'role="status" with aria-live="polite" so the caption is announced once, not per dot.',
        code: `<TypingIndicator />
<TypingIndicator label="Retrieving tiles" />
<TypingIndicator label="Calling search_catalog" />`,
        render: TypingDemo,
      },
    ],
    props: [
      { name: 'label', type: 'ReactNode', default: "'Generating'", description: 'Monospace caption after the dots.' },
    ],
    a11y: [
      'The dots are aria-hidden; the caption carries the meaning.',
      'Under prefers-reduced-motion the dots hold still and the caption does the work.',
    ],
    related: ['spinner', 'message', 'skeleton'],
  },

  {
    slug: 'thread-list',
    name: 'ThreadList',
    category: 'Chat',
    status: 'New',
    summary: 'Conversations as rows: title, preview, time, unread count.',
    intro:
      'Dense rows with a 2px accent edge on the active one. Each row is a button, so the whole surface is keyboard reachable without a roving tabindex.',
    examples: [
      {
        title: 'With unread',
        description: 'Click a row — the active edge moves with the selection.',
        code: `<ThreadList
  value={active}
  onSelect={setActive}
  items={[
    { id: 't1', title: 'Tile cache pressure', preview: 'Why did p95 jump…', time: '14:02' },
    { id: 't2', title: 'Scene budget', preview: '8.1 GB tileset…', time: '11:40', unread: 2 },
  ]}
/>`,
        render: ThreadDemo,
      },
    ],
    props: [
      { name: 'items', type: 'ThreadItem[]', default: '—', description: 'id, title, preview, time, unread.' },
      { name: 'value', type: 'string', default: '—', description: 'Active thread id.' },
      { name: 'onSelect', type: '(id: string) => void', default: '—', description: 'Fires on row click.' },
    ],
    a11y: [
      'Rows are buttons inside a list; the active row carries aria-current.',
      'The unread count is inside the title text, so it is read out with the thread name.',
    ],
    related: ['message', 'sidebar', 'menu'],
  },
];
