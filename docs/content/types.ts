import type { ComponentType, CSSProperties, ReactNode } from 'react';
import type { PropRow } from '../components/DocsUI';

export type Category =
  | 'Actions'
  | 'Forms'
  | 'Display'
  | 'Layout'
  | 'Data'
  | 'Navigation'
  | 'Overlay'
  | 'HUD';

export interface ComponentExample {
  title: string;
  description?: ReactNode;
  code: string;
  render: ComponentType;
  align?: 'center' | 'start' | 'stretch';
  stageStyle?: CSSProperties;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  category: Category;
  summary: string;
  status?: 'Stable' | 'New' | 'Beta';
  intro?: ReactNode;
  examples: ComponentExample[];
  props: PropRow[];
  a11y?: string[];
  guidance?: { do: string[]; dont: string[] };
  related?: string[];
}

export type { PropRow };
