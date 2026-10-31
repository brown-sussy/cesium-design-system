/**
 * Cesium Design System — Vue 3
 * Precision interfaces for planetary-scale data.
 *
 *   import { Button, Panel } from '@cesium-ds/core/vue';
 *   import '@cesium-ds/core/styles.css';
 *
 * Or register everything at once:
 *   import CesiumVue from '@cesium-ds/core/vue';
 *   app.use(CesiumVue);
 *
 * Every component emits the same `.cs-*` markup as the React build, so the
 * stylesheet is shared — there is one CSS file, not two.
 */
import type { App, Plugin } from 'vue';

/* actions */
import Button from './components/Button.vue';
import IconButton from './components/IconButton.vue';
import ButtonGroup from './components/ButtonGroup.vue';

/* forms */
import Input from './components/Input.vue';
import SearchInput from './components/SearchInput.vue';
import Textarea from './components/Textarea.vue';
import Select from './components/Select.vue';
import Checkbox from './components/Checkbox.vue';
import Radio from './components/Radio.vue';
import RadioGroup from './components/RadioGroup.vue';
import Switch from './components/Switch.vue';
import Slider from './components/Slider.vue';
import Field from './components/Field.vue';
import SegmentedControl from './components/SegmentedControl.vue';

/* display */
import Badge from './components/Badge.vue';
import Tag from './components/Tag.vue';
import Avatar from './components/Avatar.vue';
import Kbd from './components/Kbd.vue';
import KbdGroup from './components/KbdGroup.vue';
import StatusDot from './components/StatusDot.vue';
import Spinner from './components/Spinner.vue';
import Progress from './components/Progress.vue';
import Skeleton from './components/Skeleton.vue';
import SkeletonText from './components/SkeletonText.vue';
import Divider from './components/Divider.vue';
import Tooltip from './components/Tooltip.vue';
import Icon from './components/Icon.vue';

/* layout */
import Card from './components/Card.vue';
import CardHeader from './components/CardHeader.vue';
import CardBody from './components/CardBody.vue';
import CardFooter from './components/CardFooter.vue';
import Panel from './components/Panel.vue';
import PanelBody from './components/PanelBody.vue';
import Toolbar from './components/Toolbar.vue';
import ToolbarSeparator from './components/ToolbarSeparator.vue';

/* data */
import Table from './components/Table.vue';
import Stat from './components/Stat.vue';
import KeyValue from './components/KeyValue.vue';
import Sparkline from './components/Sparkline.vue';
import CoordinateReadout from './components/CoordinateReadout.vue';
import Legend from './components/Legend.vue';

/* navigation */
import Tabs from './components/Tabs.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import Pagination from './components/Pagination.vue';
import Menu from './components/Menu.vue';
import Sidebar from './components/Sidebar.vue';

/* overlay */
import Modal from './components/Modal.vue';
import Drawer from './components/Drawer.vue';
import Dropdown from './components/Dropdown.vue';
import DropdownHeader from './components/DropdownHeader.vue';
import DropdownFooter from './components/DropdownFooter.vue';
import Alert from './components/Alert.vue';

/* hud */
import Compass from './components/Compass.vue';
import ScaleBar from './components/ScaleBar.vue';

/* ai */
import ReasoningTrace from './components/ReasoningTrace.vue';
import ToolCall from './components/ToolCall.vue';
import ContextMeter from './components/ContextMeter.vue';

/* chat */
import Message from './components/Message.vue';
import MessageList from './components/MessageList.vue';
import Composer from './components/Composer.vue';
import TypingIndicator from './components/TypingIndicator.vue';
import ThreadList from './components/ThreadList.vue';

/* science */
import Quantity from './components/Quantity.vue';
import VectorReadout from './components/VectorReadout.vue';
import Histogram from './components/Histogram.vue';
import EventDisplay from './components/EventDisplay.vue';
import SequenceView from './components/SequenceView.vue';
import DoseResponse from './components/DoseResponse.vue';

export {
  /* actions */
  Button,
  IconButton,
  ButtonGroup,
  /* forms */
  Input,
  SearchInput,
  Textarea,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Slider,
  Field,
  SegmentedControl,
  /* display */
  Badge,
  Tag,
  Avatar,
  Kbd,
  KbdGroup,
  StatusDot,
  Spinner,
  Progress,
  Skeleton,
  SkeletonText,
  Divider,
  Tooltip,
  Icon,
  /* layout */
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Panel,
  PanelBody,
  Toolbar,
  ToolbarSeparator,
  /* data */
  Table,
  Stat,
  KeyValue,
  Sparkline,
  CoordinateReadout,
  Legend,
  /* navigation */
  Tabs,
  Breadcrumb,
  Pagination,
  Menu,
  Sidebar,
  /* overlay */
  Modal,
  Drawer,
  Dropdown,
  DropdownHeader,
  DropdownFooter,
  Alert,
  /* hud */
  Compass,
  ScaleBar,
  /* ai */
  ReasoningTrace,
  ToolCall,
  ContextMeter,
  /* chat */
  Message,
  MessageList,
  Composer,
  TypingIndicator,
  ThreadList,
  /* science */
  Quantity,
  VectorReadout,
  Histogram,
  EventDisplay,
  SequenceView,
  DoseResponse,
};

export type * from './types';

/** Globally registered component names, for template-only consumers. */
export const components = {
  CsButton: Button,
  CsIconButton: IconButton,
  CsButtonGroup: ButtonGroup,
  CsInput: Input,
  CsSearchInput: SearchInput,
  CsTextarea: Textarea,
  CsSelect: Select,
  CsCheckbox: Checkbox,
  CsRadio: Radio,
  CsRadioGroup: RadioGroup,
  CsSwitch: Switch,
  CsSlider: Slider,
  CsField: Field,
  CsSegmentedControl: SegmentedControl,
  CsBadge: Badge,
  CsTag: Tag,
  CsAvatar: Avatar,
  CsKbd: Kbd,
  CsKbdGroup: KbdGroup,
  CsStatusDot: StatusDot,
  CsSpinner: Spinner,
  CsProgress: Progress,
  CsSkeleton: Skeleton,
  CsSkeletonText: SkeletonText,
  CsDivider: Divider,
  CsTooltip: Tooltip,
  CsIcon: Icon,
  CsCard: Card,
  CsCardHeader: CardHeader,
  CsCardBody: CardBody,
  CsCardFooter: CardFooter,
  CsPanel: Panel,
  CsPanelBody: PanelBody,
  CsToolbar: Toolbar,
  CsToolbarSeparator: ToolbarSeparator,
  CsTable: Table,
  CsStat: Stat,
  CsKeyValue: KeyValue,
  CsSparkline: Sparkline,
  CsCoordinateReadout: CoordinateReadout,
  CsLegend: Legend,
  CsTabs: Tabs,
  CsBreadcrumb: Breadcrumb,
  CsPagination: Pagination,
  CsMenu: Menu,
  CsSidebar: Sidebar,
  CsModal: Modal,
  CsDrawer: Drawer,
  CsDropdown: Dropdown,
  CsDropdownHeader: DropdownHeader,
  CsDropdownFooter: DropdownFooter,
  CsAlert: Alert,
  CsCompass: Compass,
  CsScaleBar: ScaleBar,
  CsReasoningTrace: ReasoningTrace,
  CsToolCall: ToolCall,
  CsContextMeter: ContextMeter,
  CsMessage: Message,
  CsMessageList: MessageList,
  CsComposer: Composer,
  CsTypingIndicator: TypingIndicator,
  CsThreadList: ThreadList,
  CsQuantity: Quantity,
  CsVectorReadout: VectorReadout,
  CsHistogram: Histogram,
  CsEventDisplay: EventDisplay,
  CsSequenceView: SequenceView,
  CsDoseResponse: DoseResponse,
};

const CesiumVue: Plugin = {
  install(app: App) {
    for (const [name, component] of Object.entries(components)) {
      app.component(name, component);
    }
  },
};

export default CesiumVue;
