# AI Question Generator — Design System

## Glassmorphism × Bento Grid

---

## Overview

**AI Question Generator** là hệ thống quản lý dự án & sinh câu hỏi bằng AI. Giao diện xây dựng theo phong cách **Glassmorphism kết hợp Bento Grid** — các ô nội dung có kích thước đa dạng xếp trên nền gradient mờ, bề mặt thẻ sử dụng kính mờ (frosted-glass), tạo chiều sâu thị giác mà không nặng nề.

**Triết lý thiết kế:**

- Nội dung là trung tâm — mỗi bento tile phục vụ đúng một mục đích.
- Glass surface tạo chiều sâu mà không cần shadow thô.
- Màu sắc gradient xanh dương đồng nhất, palette đơn sắc blue (#F0F3FA → #395886) làm điểm nhấn.
- Grid linh hoạt theo từng màn hình, ưu tiên thông tin quan trọng qua kích thước ô.

---

## Colors

### Background

- **`{colors.bg-base}`** — `#F0F3FA`: Nền trang mặc định, xanh dương rất nhạt.
- **`{colors.bg-gradient}`** — `linear-gradient(135deg, #D5DEEF 0%, #F0F3FA 100%)`: Gradient toàn trang, từ xanh nhạt sang trắng xanh. Áp dụng lên `<body>`.
- **`{colors.bg-gradient-dark}`** — `linear-gradient(135deg, #395886 0%, #243558 100%)`: Nền tối cho dark-mode tile, hero banner.

### Brand & Accent

- **`{colors.primary}`** — `#628ECB` (Blue 400): Màu hành động chính — nút primary, link active, focus ring.
- **`{colors.primary-hover}`** — `#395886` (Blue 600): Trạng thái hover trên nút primary.
- **`{colors.primary-light}`** — `rgba(98, 142, 203, 0.12)`: Nền highlight nhẹ — selected state, badge background.
- **`{colors.secondary}`** — `#8AAEE0` (Blue 300): Accent thứ hai — category selected pill, progress gradient end.
- **`{colors.secondary-light}`** — `rgba(138, 174, 224, 0.12)`: Tag blue nhẹ.
- **`{colors.accent-teal}`** — `#B1C9EF` (Blue 200): Highlight số liệu, progress bar, AI model badge.
- **`{colors.accent-teal-light}`** — `rgba(177, 201, 239, 0.12)`: Blue-light badge background.
- **`{colors.accent-coral}`** — `#E45B76`: Tag lỗi mềm, trạng thái sai, warning nhẹ.
- **`{colors.accent-coral-light}`** — `rgba(228, 91, 118, 0.12)`: Coral badge background.
- **`{colors.accent-emerald}`** — `#10B981`: Trạng thái active/success.
- **`{colors.accent-amber}`** — `#F59E0B`: Rating, warning, số lượng pending.

### Hero / Banner

- **`{colors.hero-start}`** — `#395886`: Gradient bắt đầu — xanh dương đậm.
- **`{colors.hero-end}`** — `#243558`: Gradient kết thúc — navy xanh.
- **`{colors.hero-cta}`** — `#1E2D4A`: Nút CTA nền tối trên hero tile.

### Glass Surfaces

- **`{colors.glass-white}`** — `rgba(255, 255, 255, 0.70)`: Card mặc định — frosted white glass.
- **`{colors.glass-white-heavy}`** — `rgba(255, 255, 255, 0.85)`: Sidebar, top nav.
- **`{colors.glass-white-light}`** — `rgba(255, 255, 255, 0.45)`: Glass nhẹ — nested card.
- **`{colors.glass-dark}`** — `rgba(15, 23, 42, 0.55)`: Dark glass — modal backdrop.
- **`{colors.glass-dark-card}`** — `rgba(30, 41, 59, 0.70)`: Dark glass card.
- **`{colors.glass-border}`** — `rgba(255, 255, 255, 0.35)`: Viền glass trên nền sáng.
- **`{colors.glass-border-dark}`** — `rgba(255, 255, 255, 0.15)`: Viền glass trên nền tối.
- **`{colors.glass-border-subtle}`** — `rgba(148, 163, 184, 0.20)`: Viền rất nhẹ giữa các tile.

### Text

- **`{colors.ink}`** — `#0F172A` (Slate 950): Text chính.
- **`{colors.ink-secondary}`** — `#334155` (Slate 700): Text phụ.
- **`{colors.ink-muted}`** — `#64748B` (Slate 500): Text mờ — placeholder, caption.
- **`{colors.ink-disabled}`** — `#94A3B8` (Slate 400): Text vô hiệu hóa.
- **`{colors.ink-on-dark}`** — `#F8FAFC`: Text trên nền tối.
- **`{colors.ink-on-dark-muted}`** — `rgba(248, 250, 252, 0.65)`: Text mờ trên nền tối.

### Semantic

- **`{colors.success}`** — `#10B981` / bg: `rgba(16, 185, 129, 0.12)`
- **`{colors.warning}`** — `#F59E0B` / bg: `rgba(245, 158, 11, 0.12)`
- **`{colors.error}`** — `#EF4444` / bg: `rgba(239, 68, 68, 0.12)`
- **`{colors.info}`** — `#B1C9EF` / bg: `rgba(177, 201, 239, 0.12)`

---

## Typography

### Font Family

- **Display**: `'Inter', system-ui, -apple-system, sans-serif` — Variable font, weight 300–700.
- **Mono**: `'JetBrains Mono', 'Fira Code', monospace` — Prompt text, API key, code snippet.

### Scale

| Token                         | Size | Weight | Line Height | Letter Spacing | Dùng cho                   |
| ----------------------------- | ---- | ------ | ----------- | -------------- | -------------------------- |
| `{typography.hero}`           | 32px | 700    | 1.15        | -0.5px         | Hero tile headline         |
| `{typography.display-lg}`     | 26px | 700    | 1.20        | -0.4px         | Page title, project name   |
| `{typography.display-md}`     | 22px | 600    | 1.25        | -0.3px         | Section heading trong tile |
| `{typography.display-sm}`     | 18px | 600    | 1.30        | -0.2px         | Card heading               |
| `{typography.body-lg}`        | 16px | 400    | 1.60        | 0              | Body chính                 |
| `{typography.body}`           | 14px | 400    | 1.57        | 0              | Body chuẩn, mô tả          |
| `{typography.body-medium}`    | 14px | 500    | 1.57        | 0              | Label, button text         |
| `{typography.body-strong}`    | 14px | 600    | 1.57        | 0              | Inline bold                |
| `{typography.caption}`        | 12px | 400    | 1.50        | 0.1px          | Caption, timestamp         |
| `{typography.caption-strong}` | 12px | 600    | 1.50        | 0.1px          | Badge label, tag           |
| `{typography.stat}`           | 28px | 700    | 1.10        | -0.5px         | Số thống kê lớn            |
| `{typography.stat-sm}`        | 20px | 700    | 1.15        | -0.3px         | Số thống kê nhỏ            |
| `{typography.mono}`           | 13px | 400    | 1.50        | 0              | Code, prompt, API key      |
| `{typography.nav}`            | 13px | 500    | 1.0         | 0              | Nav item label             |

### Principles

- Inter variable — dùng `font-variation-settings` để truyền weight linh hoạt.
- Heading luôn dùng letter-spacing âm tại 18px trở lên.
- Body tại 14px/400 — chuẩn cho app dashboard.
- Mono font chỉ dùng cho prompt, API key, code.

---

## Bento Grid System

### Khái niệm

Bento Grid chia layout thành lưới ô (tile) kích thước khác nhau trên CSS Grid 12 cột.

### Grid Container

```
display: grid;
grid-template-columns: repeat(12, 1fr);
gap: 16px;
padding: 24px;
```

### Tile Size Tokens

| Token               | Cột span | Hàng span | Dùng cho                 |
| ------------------- | -------- | --------- | ------------------------ |
| `{bento.micro}`     | 3        | 1         | Mini metric, badge stat  |
| `{bento.small}`     | 3        | 2         | Stat tile đơn            |
| `{bento.wide}`      | 6        | 1         | Thông báo, progress bar  |
| `{bento.card}`      | 4        | 2         | Project card, model card |
| `{bento.card-tall}` | 4        | 3         | Question detail          |
| `{bento.hero}`      | 8        | 3         | Dashboard welcome banner |
| `{bento.feed}`      | 4        | 4         | Recent activity list     |
| `{bento.full}`      | 12       | auto      | Bảng dữ liệu, form rộng  |
| `{bento.half}`      | 6        | 2         | Form 2-cột               |
| `{bento.third}`     | 4        | 2         | Stats hàng 3             |

### Layout Dashboard (12 cột)

```
[ Hero Banner 8×3                  ] [ Stat: Dự án    4×1.5 ]
                                     [ Stat: Câu hỏi  4×1.5 ]
[ Recent Projects 8×3              ] [ Quick Generate 4×3   ]
[ Activity 4×4 ] [ Q Stats 4×2 ] [ AI Models 4×2           ]
```

---

## Glass Effect System

### Blur Levels

| Token                | backdrop-filter           | background             | Dùng cho           |
| -------------------- | ------------------------- | ---------------------- | ------------------ |
| `{glass.sidebar}`    | blur(20px) saturate(180%) | glass-white-heavy      | Sidebar, top nav   |
| `{glass.card}`       | blur(12px) saturate(150%) | glass-white            | Card tile mặc định |
| `{glass.card-light}` | blur(8px) saturate(120%)  | glass-white-light      | Nested card        |
| `{glass.modal}`      | blur(24px) saturate(180%) | glass-white-heavy      | Modal, dialog      |
| `{glass.overlay}`    | blur(4px)                 | glass-dark             | Backdrop overlay   |
| `{glass.dark-card}`  | blur(12px) saturate(160%) | glass-dark-card        | Dark stat tile     |
| `{glass.tooltip}`    | blur(16px)                | rgba(255,255,255,0.92) | Tooltip, popover   |

### Glass Card CSS Anatomy

```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(12px) saturate(150%);
border: 1px solid rgba(255, 255, 255, 0.35);
border-radius: 16px;
box-shadow:
  0 4px 24px rgba(15, 23, 42, 0.07),
  0 1px 4px rgba(15, 23, 42, 0.04);
```

### Shadow System

| Token                        | Value                                                           | Dùng cho            |
| ---------------------------- | --------------------------------------------------------------- | ------------------- |
| `{shadow.card}`              | `0 4px 24px rgba(15,23,42,0.07), 0 1px 4px rgba(15,23,42,0.04)` | Tile mặc định       |
| `{shadow.card-hover}`        | `0 8px 32px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.06)` | Hover state         |
| `{shadow.modal}`             | `0 20px 60px rgba(15,23,42,0.20)`                               | Modal, drawer       |
| `{shadow.sidebar}`           | `4px 0 24px rgba(15,23,42,0.08)`                                | Sidebar             |
| `{shadow.dropdown}`          | `0 8px 24px rgba(15,23,42,0.12)`                                | Dropdown            |
| `{shadow.btn-primary}`       | `0 4px 12px rgba(98,142,203,0.35)`                              | Primary button glow |
| `{shadow.btn-primary-hover}` | `0 6px 20px rgba(98,142,203,0.50)`                              | Button hover glow   |
| `{shadow.hero}`              | `0 20px 60px rgba(57,88,134,0.40)`                              | Hero banner         |

---

## Shapes

### Border Radius Scale

| Token               | Value  | Dùng cho                           |
| ------------------- | ------ | ---------------------------------- |
| `{rounded.xs}`      | 4px    | Badge tiny, tag kín                |
| `{rounded.sm}`      | 8px    | Button nhỏ, input, chip            |
| `{rounded.md}`      | 12px   | Inner image, icon wrapper          |
| `{rounded.card}`    | 16px   | Bento tile, card tile              |
| `{rounded.card-lg}` | 20px   | Hero tile, modal                   |
| `{rounded.pill}`    | 9999px | Button primary, search input, pill |
| `{rounded.full}`    | 50%    | Avatar, icon button tròn           |

---

## Spacing System

- Base unit: 4px
- `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 64px
- Grid gap: 16px (khoảng cách giữa bento tiles)
- Page padding: 24px (padding xung quanh grid)
- Card padding: 20px (padding bên trong bento tile)
- Card padding sm: 16px (tile nhỏ)

---

## Layout Structure

### Shell

```
+---------------------------------------------------------+
|  Top Nav (64px) — glass-white-heavy, sticky z-100      |
+----------+----------------------------------------------+
| Sidebar  |  Main Content (scrollable)                   |
| (240px)  |  background: bg-gradient                     |
| glass    |  padding: 24px                               |
| heavy    |  Bento Grid 12-col                           |
+----------+----------------------------------------------+
```

### `{component.top-nav}`

- Height: 64px, sticky z-index 100
- Background: glass-white-heavy, blur 20px
- Border-bottom: 1px solid glass-border-subtle
- Left: Logo icon 32px + "AI Q-Gen" text (display-sm, indigo)
- Center: search-bar (width 320px)
- Right: Notification bell + Avatar (rounded.full)

### `{component.sidebar}`

- Width: 240px, collapsed: 64px
- Background: glass-white-heavy, blur 20px
- Border-right: 1px solid glass-border-subtle
- Nav item height: 44px, rounded.sm
- Active: bg primary-light, text primary, left-border 3px solid primary
- Hover: bg rgba(248,250,252,0.80)
- Bottom: User profile card + logout

**Sidebar nav items** (từ database schema):

- Dashboard (icon: grid)
- Dự án — `projects` (icon: folder)
- Kho câu hỏi — `questions` (icon: list)
- Sinh câu hỏi — AI Generate (icon: sparkle)
- Chủ đề — `topics` (icon: tag)
- AI Models — `ai_models` (icon: cpu)
- Người dùng — `users` (icon: users, admin only)
- Cài đặt (icon: gear)
- Đăng xuất (icon: logout)

---

## Components

### Buttons

**`{component.button-primary}`**

- Background: #628ECB, text white, rounded.pill, padding 10px 20px
- Box-shadow: `0 4px 12px rgba(98,142,203,0.35)`
- Hover: #395886, `0 6px 20px rgba(98,142,203,0.50)`, translateY(-1px)
- Active: scale(0.97)
- Focus: outline 2px solid primary, offset 2px

**`{component.button-secondary}`**

- Background: glass-white blur(8px), text primary
- Border: 1px solid rgba(98,142,203,0.40), rounded.pill, padding 10px 20px
- Hover: bg primary-light, border primary

**`{component.button-ghost}`**

- Background: transparent, text ink-secondary
- Border-radius: rounded.sm, padding 8px 16px
- Hover: rgba(248,250,252,0.80)

**`{component.button-icon}`**

- Size 36×36px, bg glass-white blur(8px), border glass-border, rounded.sm
- Icon 18px ink-secondary; hover: bg primary-light, icon primary

**`{component.button-icon-round}`**

- Size 40×40px, rounded.full, bg glass-white, border glass-border

**`{component.button-hero-cta}`**

- Background: #1E2D4A, text white, rounded.pill, padding 12px 28px
- Dùng trên hero banner

### Inputs & Forms

**`{component.search-bar}`**

- Height 40px, rounded.pill, bg glass-white-heavy blur(12px)
- Border: 1px solid glass-border-subtle, padding 0 16px 0 40px (icon left)
- Focus: border primary, shadow 0 0 0 3px primary-light

**`{component.input}`**

- Height 44px, rounded.sm, bg glass-white blur(8px)
- Border: 1px solid glass-border-subtle, padding 0 14px
- Focus: border primary, shadow 0 0 0 3px primary-light
- Error: border error, shadow 0 0 0 3px rgba(239,68,68,0.12)

**`{component.textarea}`**

- Tương tự input, min-height 100px, resize vertical, rounded.md
- Dùng cho: `questions.prompt`, `projects.description`, generate prompt

**`{component.select}`** — Tương tự input + dropdown arrow icon phải

**`{component.label}`** — typography.body-strong, ink-secondary, margin-bottom 6px

### Cards & Bento Tiles

**`{component.bento-tile}`** — Tile cơ bản

- bg: rgba(255,255,255,0.70), backdrop-filter: blur(12px) saturate(150%)
- border: 1px solid rgba(255,255,255,0.35), border-radius: 16px
- box-shadow: shadow.card, padding: 20px
- hover: shadow.card-hover, translateY(-2px), transition 0.2s ease

**`{component.bento-tile-dark}`** — Tile nền tối

- bg: rgba(30,41,59,0.70), backdrop-filter: blur(12px) saturate(160%)
- border: 1px solid rgba(255,255,255,0.15), border-radius: 16px
- text: ink-on-dark

**`{component.bento-hero}`** — Hero banner (8 cols × 3 rows)

- Background: linear-gradient(135deg, #395886 0%, #243558 100%)
- Border-radius: 20px, box-shadow: shadow.hero, padding: 28px 32px
- Overlay: radial-gradient(circle at 80% 50%, rgba(177,201,239,0.20) 0%, transparent 60%)
- Content: Greeting + sub-text + button-hero-cta

**`{component.stat-tile}`** — Stat tile (bento.small = 3 cols × 2 rows)

- Top: icon 24px trong wrapper 44×44px rounded.md
- Middle: số liệu typography.stat, ink
- Bottom: label typography.caption, ink-muted
- 4 tiles: Dự án (indigo), Câu hỏi (teal), Chủ đề (violet), AI Models (amber)

**`{component.project-card}`** — Card dự án (bento.card = 4 cols × 2 rows)

- Avatar projects.avatar (48×48px rounded.md) + code badge (projects.code)
- Title: projects.name (display-sm), Description: projects.description (2-line clamp)
- Footer: status badge + "N topics · M câu hỏi" + nút "Mở"

**`{component.question-card}`** — Card câu hỏi

- Top: topic-pill + ai-model-badge (nếu questions.ai_model_id not null)
- Question: questions.question_text (body-lg, max 3 lines clamp)
- Options: 4 pills A/B/C/D từ questions.options JSON, rounded.pill, glass-white-light
- Answer: questions.answer highlight với primary-light border

**`{component.topic-pill}`** — Pill chủ đề

- rounded.pill, padding 4px 12px, caption-strong
- Default: bg primary-light, text primary
- Variant teal: accent-teal-light + accent-teal
- Variant violet: secondary-light + secondary
- Variant coral: accent-coral-light + accent-coral

**`{component.badge}`** — Badge trạng thái (rounded.xs, padding 3px 8px, caption-strong)

- Active: rgba(16,185,129,0.12) bg + #10B981 text
- Inactive: rgba(148,163,184,0.15) bg + ink-disabled text
- Pending: rgba(245,158,11,0.12) bg + accent-amber text
- Error: error-light bg + error text

**`{component.ai-model-badge}`**

- Dạng badge với AI icon 12px trái + ai_models.name ngắn
- Màu: accent-teal-light + accent-teal

**`{component.activity-item}`** — Feed item

- Height 56px, divider bottom glass-border-subtle
- Icon wrapper 36×36px rounded.sm + description body + timestamp caption muted

### Navigation

**`{component.sidebar-nav-item}`** — Height 44px, padding 0 12px, rounded.sm

- Default: text ink-secondary, icon ink-muted
- Active: bg primary-light, text primary, icon primary, left-border 3px primary
- Hover: rgba(248,250,252,0.80)

**`{component.breadcrumb}`** — body, ink-muted, separator "›", active weight 500

### Modals & Overlays

**`{component.modal}`**

- Backdrop: rgba(15,23,42,0.45) blur(4px)
- Box: bento-tile max-width 560px, rounded.card-lg, shadow.modal
- Header: display-md title + button-icon-round close, body padding 24px

**`{component.drawer}`** — Width 320px slide từ phải

- bg: glass.modal, border-left: 1px glass-border

**`{component.dropdown}`**

- bg rgba(255,255,255,0.95) blur(16px), rounded.card, shadow.dropdown
- Item: height 40px, padding 0 12px, hover primary-light, rounded.sm

### Feedback

**`{component.toast}`** — glass 0.92 blur(16px), rounded.card, shadow.modal

- Border-left 4px: success=emerald, error=coral, warning=amber, info=teal

**`{component.empty-state}`** — SVG 120px + display-sm title + body muted + CTA

**`{component.loading-skeleton}`** — Shimmer gradient animation 1.5s infinite

### Data Display

**`{component.table}`** — Bọc trong bento-tile full-width

- Header: rgba(248,250,252,0.6) bg, caption-strong uppercase muted
- Row: height 56px, hover primary-light 50%, divider glass-border-subtle

**`{component.progress-bar}`** — Height 6px, rounded.pill

- Track: rgba(148,163,184,0.20)
- Fill: linear-gradient(90deg, primary 0%, secondary 100%)

**`{component.avatar}`** — Sizes 24/32/40/48/64px, rounded.full

- Source: users.fullname initials / users.avatar image
- Fallback bg: linear-gradient(135deg, primary 0%, secondary 100%)

---

## Pages / Screens

### 1. Login Page

**Layout**: Full screen bg-gradient. Center card: max-width 420px, rounded.card-lg, glass.modal.

- Phía sau card: radial blur gradient indigo/violet — bokeh effect
- Logo + App name top
- Form: email (users.email) + password (users.password)
- Submit: button-primary full-width "Đăng nhập"

---

### 2. Dashboard

**Bento Layout (12 cols)**:

```
Row 1-3:
[Hero Welcome 8×3                    ] [ Stat: Dự án   4×1.5 ]
                                       [ Stat: Câu hỏi 4×1.5 ]
Row 4-6:
[Recent Projects 8×3                 ] [ Quick Generate 4×3  ]
Row 7-10:
[ Activity Feed 4×4 ] [ Q Stats 4×2 ] [ AI Models 4×2        ]
                      [ Topics 4×2  ] [ More Stats 4×2        ]
```

**Hero Tile** (bento-hero): "Chào mừng, [users.fullname]!" + sub-text + button-hero-cta "Sinh câu hỏi ngay"

**4 Stat Tiles**:

- `projects` count — icon folder, indigo
- `questions` count — icon list, teal
- `topics` count — icon tag, violet
- `ai_models` active count — icon cpu, amber

**Recent Projects**: 4 project mini-cards từ `projects ORDER BY updated_at DESC LIMIT 4`

**Quick Generate** (bento-tile-dark):

- Select Project (projects table) → Select Topic (topics via project_topics) → input số lượng → button "Sinh"

**Activity Feed**: log gần nhất — create project, add question, update model, create user

**AI Models mini**: `ai_models` WHERE status=active, hiển thị name + code + badge

---

### 3. Projects List

**Header** (full width): Title "Dự án" + search-bar + "Tạo dự án mới" (button-primary)

**Filter bar** (full width): pills All / Active / Inactive + sort dropdown (Mới nhất / Tên A-Z)

**Bento Grid**: project-card tiles (4 cols each = 3 cards/row)

**Fields từ `projects`**: avatar, code, name, description, status
**Joined data**: COUNT(project_topics) = num_topics, COUNT(project_topic_questions) = num_questions

**Create modal** (component.modal):

- Fields: name*, code*, description, avatar upload, status select
- Maps to: projects.name, projects.code, projects.description, projects.avatar, projects.status

---

### 4. Project Detail

**Hero tile** (full width, 20px radius):

- Overlay gradient trên projects.avatar hoặc solid hero gradient
- Hiển thị: projects.name, projects.code badge, projects.description, status badge
- Stats inline: N topics · M questions

**Bento dưới (12 cols)**:

```
[ Topic List — 4 cols, tall ] [ Question Grid — 8 cols, auto height ]
```

**Topic List** (bento.feed, 4 cols):

- Source: `project_topics JOIN topics WHERE project_topics.project_id = ?`
- Mỗi item: topic-pill (topics.title, màu cycled) + count questions
- Click item → filter question grid
- Footer: "+ Thêm chủ đề vào dự án"

**Question Grid** (8 cols):

- Source: `project_topic_questions JOIN questions WHERE project_topic_id = ? ORDER BY order_index`
- question-card compact variant
- Drag-and-drop để thay đổi order_index
- Toolbar: "+ Thêm câu hỏi" + "Sinh bằng AI"

---

### 5. Question Bank

**Header** (full width): "Kho câu hỏi" + search-bar rộng (questions.question_text LIKE) + "Thêm câu hỏi"

**Filter bar**: Topic pills (từ topics WHERE used) + toggle AI-Generated / Manual + sort dropdown

**Table** (full width, component.table):
| # | Câu hỏi | Chủ đề | Đáp án | AI Model | Người tạo | Ngày tạo | ⋯ |

- questions.question_text (clamp 1 line)
- topics.title → topic-pill
- questions.answer → badge
- ai_models.name → ai-model-badge (nullable)
- users.username (created_by)
- questions.created_at

**Detail Drawer** (component.drawer, 320px):

- Full questions.question_text (body-lg)
- Options A/B/C/D từ questions.options JSON (4 cards)
- Correct answer highlighted (primary-light border)
- questions.prompt trong textarea mono (nếu AI, readonly)
- Action buttons: Edit (open modal) / Delete (soft delete via deleted_at)

**Edit Modal**:

- Fields: question_text*, options* (4 inputs), answer\* (radio A/B/C/D), topic_id (select)

---

### 6. Generate Questions

**Bento Layout (12 cols)**:

```
[ Config Panel — 5 cols ] [ Preview & Result — 7 cols ]
```

**Config Panel** (bento-tile, 5 cols):
Step 1 — Select Project: select dropdown từ `projects WHERE status=active`
Step 2 — Select Topic: select từ `topics` (filtered by project via project_topics)
Step 3 — Select AI Model: card grid 2×2 từ `ai_models WHERE status=active`

- card: ai_models.name + ai_models.code badge + status
- Selected: border 2px primary, bg primary-light
  Step 4 — Prompt: textarea mono, maps to questions.prompt
  Step 5 — Số lượng: number input 1–50
  CTA: button-primary full-width "Sinh câu hỏi" + loading state (spinner)

**Preview & Result Tile** (bento-tile, 7 cols):

- Default state: empty-state "Sinh câu hỏi để xem kết quả"
- Loading: skeleton × 3 question cards
- Result: list question-cards với:
  - Accept ✓ button (bg emerald-light) per card
  - Reject ✗ button (bg coral-light) per card
- Footer bar: "Chấp nhận tất cả (N)" + "Lưu vào kho" → INSERT into questions + project_topic_questions

---

### 7. Topics Management

**Stats bar** (4 micro tiles, 3 cols each):

- Tổng topics (COUNT topics WHERE deleted_at IS NULL)
- Đang được dùng (COUNT DISTINCT topic_id FROM project_topics)
- Chưa được dùng
- Tạo mới tháng này

**Table** (full width):
| ID | Tên chủ đề | Người tạo | Ngày tạo | Số dự án dùng | ⋯ |

- topics.title — inline editable (click → input tại chỗ, Enter hoặc ✓ save)
- topics.created_by → users.username
- topics.created_at
- COUNT(project_topics) = dự án đang dùng

**Add button** → inline new row hoặc modal nhỏ (chỉ field topics.title)

---

### 8. AI Models Management

**Info banner** (full width, 1 row): mô tả về tích hợp AI, link docs

**Model Cards Grid** (3 cards + 1 add tile):

```
[ Model Card 4×3 ] [ Model Card 4×3 ] [ Add New 4×3 ]
```

**Model Card** (bento-tile):

- AI icon 40px trong wrapper 56×56px rounded.md + ai_models.name (display-sm)
- ai_models.code badge (rounded.xs, mono font)
- Status toggle switch → UPDATE ai_models.status
- API key: ai_models.api_key masked "••••[last4]" + copy icon + reveal icon
- Actions: Edit (modal) / Delete (soft delete via deleted_at)

**Add New tile** (dashed border, rounded.card, center content):

- Plus icon 48px + "Thêm AI Model mới" text
- Click → modal form: name*, code*, api_key (password input), status

**Edit Modal** fields: name, code, api_key (password input + show/hide), status select

---

### 9. Users Management (Admin only)

**Stats bar** (4 micro tiles): Tổng / Active / Admin role / Inactive

**Table** (full width, component.table):
| Avatar | Họ tên | Email | Username | Role | Status | Ngày tạo | ⋯ |

- users.fullname, users.email, users.username
- users.role → badge "Admin" (primary-light/primary) / "User" (slate)
- users.status → badge Active/Inactive
- users.created_at
- Actions: Edit role/status, Soft delete (users.deleted_at, deleted_by)

---

## Responsive Behavior

### Breakpoints

| Name    | Width       | Thay đổi chính                                    |
| ------- | ----------- | ------------------------------------------------- |
| Mobile  | ≤ 639px     | 1-col; sidebar → bottom nav; bento stack dọc      |
| Tablet  | 640–1023px  | Sidebar collapsed icon-only 64px; 2-col effective |
| Desktop | 1024–1439px | Full layout; sidebar 240px; 12-col                |
| Wide    | ≥ 1440px    | Content max-width 1400px                          |

### Mobile

- Sidebar → bottom navigation bar 5 icons
- Hero tile full-width padding 20px; hero typography.display-md (22px)
- Stat tiles: 2×2 grid (6 cols each)
- Project cards: 1-col full width
- Tables → card-list view

### Tablet

- Sidebar icon-only 64px (label hidden)
- Bento effective 6 cols
- Hero full-width → stats row 2+2 below

---

## Animation & Interaction

| Element    | Trigger      | Animation                                        |
| ---------- | ------------ | ------------------------------------------------ |
| Bento tile | hover        | translateY(-2px) + shadow-hover, 0.2s ease       |
| Button     | mousedown    | scale(0.97), 0.1s ease                           |
| Page       | route change | opacity 0→1, 0.3s ease                           |
| Sidebar    | toggle       | width transition 0.25s cubic-bezier(0.4,0,0.2,1) |
| Modal      | open         | scale 0.96→1 + fade, 0.2s ease-out               |
| Skeleton   | loading      | shimmer bg-position, 1.5s infinite linear        |
| Toast      | appear       | slide-in right + fade, 0.3s ease                 |
| Dropdown   | open         | scale 0.95→1 + fade, 0.15s ease-out              |

Không dùng transition > 400ms cho interactive element.

---

## Do's và Don'ts

### Do

- Dùng `backdrop-filter: blur()` + `rgba` background cho mọi card/tile.
- Mỗi bento tile phục vụ một mục đích rõ ràng.
- primary (Indigo) cho action; violet cho accent phụ; teal cho data/metric.
- Shadow nhẹ — tách tile khỏi background, không nặng nề.
- Gradient chỉ trong hero tile và button.
- Icon wrapper 40–44px + rounded.md cho stat icon.
- Focus ring trên mọi input (primary-light shadow).

### Don't

- Không dùng solid white/dark thuần cho card — luôn rgba + backdrop-filter.
- Không > 5–6 loại tile trên một trang.
- Không border > 1px — glass border luôn 1px rgba nhẹ.
- Không blur > 24px cho card thông thường.
- Không dùng > 4 màu accent cùng lúc trên một trang.
- Không animate mọi thứ — chỉ hover, press, open/close.
- Không mono font cho UI text.

---

## Token Reference Summary

```yaml
colors:
  bg-gradient: "linear-gradient(135deg, #D5DEEF 0%, #F0F3FA 100%)"
  primary: "#628ECB"
  primary-hover: "#395886"
  primary-light: "rgba(98, 142, 203, 0.12)"
  secondary: "#8AAEE0"
  secondary-light: "rgba(138, 174, 224, 0.12)"
  accent-teal: "#B1C9EF"
  accent-teal-light: "rgba(177, 201, 239, 0.12)"
  accent-coral: "#E45B76"
  accent-coral-light: "rgba(228, 91, 118, 0.12)"
  accent-emerald: "#10B981"
  accent-amber: "#F59E0B"
  hero-start: "#395886"
  hero-end: "#243558"
  hero-cta: "#1E2D4A"
  glass-white: "rgba(255, 255, 255, 0.70)"
  glass-white-heavy: "rgba(255, 255, 255, 0.85)"
  glass-white-light: "rgba(255, 255, 255, 0.45)"
  glass-dark-card: "rgba(30, 41, 59, 0.70)"
  glass-border: "rgba(255, 255, 255, 0.35)"
  glass-border-dark: "rgba(255, 255, 255, 0.15)"
  glass-border-subtle: "rgba(148, 163, 184, 0.20)"
  ink: "#0F172A"
  ink-secondary: "#334155"
  ink-muted: "#64748B"
  ink-disabled: "#94A3B8"
  ink-on-dark: "#F8FAFC"
  ink-on-dark-muted: "rgba(248, 250, 252, 0.65)"

rounded:
  xs: "4px"
  sm: "8px"
  md: "12px"
  card: "16px"
  card-lg: "20px"
  pill: "9999px"
  full: "50%"

spacing:
  grid-gap: "16px"
  page-padding: "24px"
  card-padding: "20px"
  card-padding-sm: "16px"

glass:
  sidebar:   "backdrop-filter: blur(20px) saturate(180%); background: rgba(255,255,255,0.85)"
  card:      "backdrop-filter: blur(12px) saturate(150%); background: rgba(255,255,255,0.70)"
  card-light:"backdrop-filter: blur(8px)  saturate(120%); background: rgba(255,255,255,0.45)"
  modal:     "backdrop-filter: blur(24px) saturate(180%); background: rgba(255,255,255,0.85)"
  dark-card: "backdrop-filter: blur(12px) saturate(160%); background: rgba(30,41,59,0.70)"

shadow:
  card:            "0 4px 24px rgba(15,23,42,0.07), 0 1px 4px rgba(15,23,42,0.04)"
  card-hover:      "0 8px 32px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.06)"
  modal:           "0 20px 60px rgba(15,23,42,0.20)"
  sidebar:         "4px 0 24px rgba(15,23,42,0.08)"
  dropdown:        "0 8px 24px rgba(15,23,42,0.12)"
  btn-primary:     "0 4px 12px rgba(98,142,203,0.35)"
  btn-primary-hover: "0 6px 20px rgba(98,142,203,0.50)"
  hero:            "0 20px 60px rgba(57,88,134,0.40)"

typography:
  hero:          { size: 32px, weight: 700, line-height: 1.15, letter-spacing: -0.5px }
  display-lg:    { size: 26px, weight: 700, line-height: 1.20, letter-spacing: -0.4px }
  display-md:    { size: 22px, weight: 600, line-height: 1.25, letter-spacing: -0.3px }
  display-sm:    { size: 18px, weight: 600, line-height: 1.30, letter-spacing: -0.2px }
  body-lg:       { size: 16px, weight: 400, line-height: 1.60 }
  body:          { size: 14px, weight: 400, line-height: 1.57 }
  body-medium:   { size: 14px, weight: 500, line-height: 1.57 }
  body-strong:   { size: 14px, weight: 600, line-height: 1.57 }
  caption:       { size: 12px, weight: 400, line-height: 1.50, letter-spacing: 0.1px }
  caption-strong:{ size: 12px, weight: 600, line-height: 1.50, letter-spacing: 0.1px }
  stat:          { size: 28px, weight: 700, line-height: 1.10, letter-spacing: -0.5px }
  mono:          { size: 13px, weight: 400, line-height: 1.50, font-family: JetBrains Mono }
  nav:           { size: 13px, weight: 500, line-height: 1.0 }
```
