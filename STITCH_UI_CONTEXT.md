# LocalDraft Stitch UI Context

Copy the prompt below into Stitch.

```text
Design a professional, simple desktop web application called LocalDraft.

PRODUCT PURPOSE
LocalDraft helps sales and marketing operators create researched, personalized outreach emails for local service businesses without relying on generic templates, expensive enterprise databases, or risky automated email blasts.

Core promise:
"Researched, specific first drafts combined with a structured place to work the list."

TARGET USER
A sales or marketing operator targeting local businesses such as salons, HVAC companies, auto shops, clinics, contractors, and mechanics.

CORE WORKFLOW
Represent this six-stage pipeline clearly:
1. Campaign Setup
2. Business Discovery
3. Website Matching
4. Public Website Research
5. Draft Generation
6. Human Review and Manual Send

This is a human-in-the-loop product. Never imply that emails are automatically sent. The operator must review, edit, approve, and manually send every draft.

INFORMATION ARCHITECTURE
Use a restrained left sidebar with:
- Campaigns
- Review Queue
- Follow-ups
- Settings

Keep navigation shallow and task-focused.

SCREEN 1: CAMPAIGN SETUP
Create a calm, guided form with progressive disclosure.

Required inputs:
- Business type: searchable input supporting presets and free text
- Search area: state, county, city, or multiple cities
- Offer: what the operator is proposing
- Call to action
- Tone
- Claims or details the system must not invent

Example content:
- Business type: HVAC contractors
- Search area: Austin, Round Rock, and Cedar Park, Texas
- Offer: Website conversion review and booking-flow recommendations
- Call to action: Ask whether they would like a short review
- Tone: Helpful, concise, and direct
- Do not claim: Guaranteed revenue improvements or previous familiarity with the business

Use plain-language helper text and inline validation. Finish with one clear "Create campaign" button.

SCREEN 2: CAMPAIGN PIPELINE
Show campaign progress as a readable six-stage sequence, not a decorative dashboard.

Include:
- Campaign name and status
- Businesses found
- Websites matched
- Businesses researched
- Drafts generated
- Items requiring attention
- Drafts ready for review

Use compact status indicators and meaningful progress. Treat missing websites and recoverable research failures as warnings rather than catastrophic errors. Re-running research or drafting should update the existing business, not suggest that duplicates will be created.

SCREEN 3: REVIEW QUEUE
Make this the primary operational workspace.

Use a two- or three-pane desktop layout:
- Left: filterable business queue
- Center: editable email draft
- Right: verified facts and source citations

Queue rows should include:
- Business name
- Category and city
- Website availability
- Draft status
- Confidence or warning indicator
- Follow-up date when applicable

Useful filters:
- Needs review
- Ready
- Missing website
- Low confidence
- Sent
- Follow-up due

Draft workspace:
- Editable subject
- Editable message body
- Concise, phone-readable email length
- Clear saved state
- "Mark ready" action
- "Open in email" or "Copy draft" action for manual sending
- No "Send all" or autonomous bulk-send controls

CITATION PANEL
Place supporting evidence beside the draft so the operator can verify personalization quickly.

Show one or two verified facts, for example:
- "Offers same-day AC repair"
- "Online booking is available"
- "Family-owned since 2008"

Each fact should include:
- Source page
- Short excerpt
- Link to the public source

Clearly label missing, incomplete, or low-confidence information. Never present inferred claims as verified facts.

KEY STATES
Provide coherent examples of:
- New campaign with no discovered businesses
- Pipeline processing
- Research completed with some missing websites
- Draft awaiting review
- Low-confidence draft needing attention
- Draft marked ready
- Sent item with a follow-up date
- Empty review queue

VISUAL DIRECTION
- Professional B2B application, not a marketing landing page
- Clean, understated, and trustworthy
- Light neutral background with white work surfaces
- Dark slate text with one restrained blue or teal accent
- Accessible contrast and visible keyboard focus
- Compact but comfortable spacing
- Clear typography and hierarchy
- Subtle borders and minimal shadows
- Familiar form, table, badge, tab, and side-panel patterns
- Concise labels with secondary details revealed only when needed
- Avoid excessive gradients, oversized cards, decorative charts, glass effects, and visual clutter

UX PRINCIPLES
- Optimize for fast review and confident decisions
- Keep the current business and next action obvious
- Preserve context while moving through the queue
- Make warnings specific and actionable
- Prevent duplicate or accidental sends
- Emphasize verified personalization
- Make manual human approval visible throughout

RESPONSIVE BEHAVIOR
Prioritize a desktop workspace. On narrower screens:
- Collapse the sidebar
- Stack the draft and citation panel
- Keep queue filters accessible
- Preserve the primary review action

NON-GOALS
Do not design:
- Autonomous email sending
- Bulk-blast controls
- Multi-step auto-drip campaigns
- Enterprise role administration
- A generic analytics dashboard
- A decorative marketing homepage

Generate a coherent high-fidelity application concept covering campaign setup, campaign pipeline, and the review queue. Use realistic sample data and consistent components across all screens.
```

## Source cards

- [Problem](.devtool/features/epic-problem-2026-09-12.md)
- [Solution](.devtool/features/epic-solution-2026-09-12.md)
- [Campaign inputs contract](.devtool/features/campaign-inputs-contract-2026-09-12.md)
