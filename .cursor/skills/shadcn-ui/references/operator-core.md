# LocalDraft Operator Core

Source of truth for visual tokens: Stitch design system **LocalDraft Operator Core** (`assets/1d9cca68b81c458ea10d71779c1a76ae`) **designMd** / style guidelines.

Do **not** use Stitch generated Material `namedColors` (lavender canvas `#faf8ff`, primary `#005c55`). Those lose to the table below.

## Surfaces

| Token | Value |
|---|---|
| Canvas | `#F8FAFC` |
| Surface | `#FFFFFF` |
| Border | `#E2E8F0` |
| Inner divider | `#F1F5F9` |
| Card shadow (optional) | `0 1px 2px 0 rgba(15, 23, 42, 0.04)` |
| Overlay shadow | `0 0 0 1px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.08)` |

Prefer 1px borders over drop shadows.

## Text

| Role | Value |
|---|---|
| Primary | `#0F172A` |
| Supporting | `#475569` |
| Meta | `#64748B` |
| Disabled / placeholder | `#94A3B8` |

## Interactive

| Role | Value |
|---|---|
| Primary | `#0F766E` |
| Primary hover | `#115E59` |
| Primary active | `#134E48` |
| On-primary | `#FFFFFF` |
| Filter / source links | `#0284C7` |
| Selected row | `#F0FDFA` + 2px inset `#0F766E` |

## Status

| Role | Text | Tint | Border |
|---|---|---|---|
| Verified / high confidence | `#047857` / `#059669` | `#ECFDF5` | `#A7F3D0` |
| Attention / missing | `#B45309` / `#D97706` | `#FFFBEB` | `#FDE68A` |
| Guardrail / unverified | `#BE123C` / `#E11D48` | `#FFF1F2` | `#FECDD3` / `#FDA4AF` |

## Shape and density

| Element | Spec |
|---|---|
| Chip / pill | 4px radius, 20px height, padding `0 6px` |
| Input / button | 6px radius; height 32px compact / 36px standard |
| Card / panel / modal | 8px radius; card padding 12px list / 16px primary |
| Checkbox | 16×16, 4px radius |
| List row | 44px |

## Type

Inter only at 400 / 500 / 600. Under 14px, tracking `+0.01em`–`+0.02em`.

| Style | Size / weight / line |
|---|---|
| headline-xl | 28px / 600 / 36px |
| headline-lg | 22px / 600 / 28px |
| headline-md | 18px / 600 / 24px |
| headline-sm | 15px / 600 / 20px |
| body-lg | 15px / 400 / 22px |
| body-md | 13px / 400 / 18px |
| body-sm | 12px / 400 / 16px |
| label-md | 12px / 500 / 16px |
| label-sm | 11px / 600 / 14px |
| code-sm | JetBrains Mono 12px / 400 / 16px |

JetBrains Mono only for codes, WHOIS, and `{{merge}}` tokens — not body copy.

## Controls

- Primary button: `#0F766E`, white text, 6px radius, hover `#115E59`.
- Secondary: white, `1px solid #E2E8F0`, text `#0F172A`, hover canvas `#F8FAFC` / border `#CBD5E1`.
- Input: white, `1px solid #CBD5E1`, focus `1px solid #0F766E` + `2px rgba(15, 118, 110, 0.15)`.
