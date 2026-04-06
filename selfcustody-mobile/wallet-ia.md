# Sovereign Wallet — Information Architecture

**Product:** Sovereign Wallet · Mobile (Flutter)
**Scope:** SOL Native Staking V1 within full 5-tab navigation shell
**Version:** 2.0 · Post nav-restructure
**Status:** Design-ready · Pre-wireframe

-----

## 1. Document Purpose

This document defines the complete information architecture for Sovereign Wallet’s mobile experience, with primary depth on the SOL Native Staking feature. It serves as the single source of truth for:

- Navigation hierarchy and screen ownership
- Entry point logic and routing rules
- State conditions (pre/post-stake, conditional surfaces)
- Shared flow patterns and their entry points
- Assumption anchors for UXR validation
- Design decision rationale at each level

It is intended to be read alongside the IA diagram in the **🧩 IA System** page of the Wallet DS Figma file (key: `bd7ufeAXN8QL2Jofdr0i9Q`).

-----

## 2. Design Principles in Force

The following seven principles govern all IA decisions. Each is noted where it creates a specific structural choice.

|# |Principle                                     |Tension Resolved                              |
|--|----------------------------------------------|----------------------------------------------|
|P1|**Sovereignty-First**                         |User control vs. product helpfulness          |
|P2|**Unified Perception, Chain-Native Execution**|Multi-chain complexity vs. coherent experience|
|P3|**Intervene at the Point That Matters**       |Security vigilance vs. ambient surveillance   |
|P4|**Transparency as Product Commitment**        |Complexity hidden vs. trust earned            |
|P5|**Assets, Not Networks**                      |Technical accuracy vs. cognitive load         |
|P6|**Progressive Trust**                         |Product ambition vs. user skepticism          |
|P7|**Consequence-Aware by Design**               |Friction vs. irreversibility protection       |

-----

## 3. Navigation Shell

### 3.1 Tab Bar

The persistent bottom navigation bar. Five tabs — the fourth (`[+]`) is an action trigger, not a screen destination.

```
[ Home ]  [ Activity ]  [ + ]  [ Earn Hub ]  [ Explore ]
```

|Tab             |Type         |V1 Status|IA Role                                          |
|----------------|-------------|---------|-------------------------------------------------|
|Home            |Screen       |✅ Active |Portfolio overview + asset entry                 |
|Activity        |Screen       |✅ Active |Transaction log — global                         |
|[+] Main Actions|Sheet trigger|✅ Active |Transactional actions (send, receive, buy, stake)|
|Earn Hub        |Screen       |✅ Active |Staking ownership + yield surface                |
|Explore         |Screen       |⏳ V2     |dApp browser, DeFi integrations                  |

**Design rationale:** Stake lives in [+] as a direct flow trigger rather than routing through Earn Hub, because Stake is a transactional act with a defined start/end. Earn Hub is the position management surface — it owns the post-stake lifecycle. This separation keeps the action model consistent: [+] initiates, Earn Hub manages.

**Principle applied:** P3 — Intervene at the point that matters. Stake as a main action puts the entry at the highest-frequency interaction surface (the action sheet), not buried under a sub-tab.

-----

## 4. Full Hierarchy

```
App (Root)
│
└── Tab Bar [NAV · Persistent]
    │
    ├── 1. Home [SCREEN]
    │   ├── Portfolio Summary [ROW]
    │   │   ├── Total Balance (aggregated, all chains)
    │   │   ├── 24h Change indicator
    │   │   └── Asset Rows (per asset held)
    │   │       └── → Asset Detail [SCREEN · full-screen push]
    │   │           ├── Activity tab [TAB]
    │   │           ├── Earn tab [TAB · pointer]
    │   │           │   ├── Pre-stake: "Start earning" nudge → Earn Hub
    │   │           │   └── Post-stake: Position summary card → Earn Hub
    │   │           └── Info tab [TAB]
    │   │               └── Token metadata, contract address, chain
    │   │
    │   └── Staking Widget [ROW · post-stake only]
    │       ├── Total staked (SOL + USD)
    │       ├── Cumulative rewards
    │       ├── Current APY
    │       └── → Staking Position Detail [SCREEN · full-screen push]
    │
    ├── 2. Activity [SCREEN]
    │   └── Event List [CONTENT]
    │       ├── Stake events
    │       ├── Unstake events
    │       ├── Reward events (epoch boundary)
    │       ├── Send events
    │       ├── Receive events
    │       ├── Buy (on-ramp) events
    │       └── Swap events
    │           └── → Transaction Detail [SHEET · bottom sheet]
    │               ├── Amount, asset, network
    │               ├── Status chip (pending / confirmed / failed)
    │               ├── Block explorer link
    │               └── Network fee breakdown
    │
    ├── 3. [+] Main Actions [SHEET · bottom sheet, not a screen]
    │   ├── Send → Send Flow [SCREEN · modal stack]
    │   ├── Receive → Receive Sheet [SHEET]
    │   ├── Buy → On-Ramp Flow [SCREEN · modal stack]
    │   └── Stake → Stake Flow ★ [SCREEN · modal stack · SHARED]
    │
    ├── 4. Earn Hub [SCREEN]
    │   │
    │   ├── [Pre-stake state]
    │   │   └── SOL Staking Entry Card [STATE]
    │   │       ├── APY badge
    │   │       ├── "No slashing" trust signal
    │   │       ├── Epoch timing preview
    │   │       └── [ Start Staking ] → Stake Flow ★ [SHARED]
    │   │
    │   └── [Post-stake state]
    │       └── Staking Position Card [ROW]
    │           └── → Staking Position Detail [SCREEN · full-screen push]
    │               │
    │               ├── Summary tab [TAB]
    │               │   ├── Total staked (SOL + USD)
    │               │   ├── Lifetime rewards
    │               │   ├── Current APY
    │               │   └── Validator name + status chip
    │               │
    │               ├── Rewards tab [TAB]
    │               │   ├── Epoch bar chart [CONTENT]
    │               │   │   └── Rewards per epoch (last N)
    │               │   └── Epoch progress ring [CONTENT]
    │               │       └── % through current epoch + time remaining
    │               │
    │               ├── Accounts tab [TAB]
    │               │   └── Stake Account Row(s) [ROW]
    │               │       └── → Stake Account Detail [SHEET · bottom sheet]
    │               │           ├── Stake account address (truncated + copy)
    │               │           ├── Validator info [CONTENT]
    │               │           │   ├── Name, commission %, uptime
    │               │           │   └── Stake weight indicator
    │               │           ├── Status chip [CONTENT]
    │               │           │   ├── Activating
    │               │           │   ├── Active
    │               │           │   ├── Deactivating (cooldown)
    │               │           │   └── Withdrawable
    │               │           └── [ Unstake ] [ACTION · only if Active]
    │               │               └── → Unstake Flow [SCREEN · modal stack]
    │               │
    │               └── Actions section [ACTION SURFACE]
    │                   ├── [ Stake More ] → Stake Flow ★ [SHARED · with pre-filled context]
    │                   └── [ Unstake ] → Unstake Flow [SCREEN · modal stack]
    │
    └── 5. Explore [SCREEN · V2]
        └── [Out of scope — V1]
```

-----

## 5. Shared Flows

Shared flows are modal stacks triggered from multiple entry points. They are designed once, rendered from any parent. Post-completion, they resolve to a defined destination regardless of entry origin.

### 5.1 Stake Flow ★

**Entry points (3):**

1. [+] Main Actions → Stake
1. Earn Hub → SOL Staking Entry Card → Start Staking
1. Staking Position Detail → Actions → Stake More

**V1 behaviour:** SOL is defaulted as the staking asset. No asset selector step. Future: asset selector inserted between entry and Amount Entry when multiple stakeable assets exist.

**Pre-filled context (entry point 3 only):** Amount Entry receives the existing position’s SOL balance for reference; validator is pre-selected and locked (same proprietary validator); user cannot re-select.

```
Stake Flow
│
├── Amount Entry [SCREEN]
│   ├── SOL input field (numeric)
│   ├── Max button (auto-populates — with guardrail)
│   ├── ⚠ Liquidity guardrail banner
│   │   └── "Keep at least 0.05 SOL for fees"
│   │   └── Shown when input would leave < threshold
│   ├── Available balance display
│   ├── Estimated annual yield (SOL + USD)
│   ├── Epoch timing preview ("Active in ~Xhr")
│   └── [ Continue ]
│
├── Review & Sign [SCREEN]
│   ├── Amount staking (SOL + USD equivalent)
│   ├── Validator card [expandable]
│   │   ├── Validator name
│   │   ├── Commission %
│   │   ├── Uptime %
│   │   └── "Why this validator?" → rationale sheet
│   ├── Activation timing ("Active next epoch, ~Xhr")
│   │   └── Concrete clock/date, not vague language
│   ├── Network fee (fiat-first display)
│   ├── No-slashing callout (trust signal)
│   └── [ Confirm & Sign ] → biometric auth
│
├── Pending / Submission [STATE]
│   ├── Transaction submitted indicator
│   └── "Your SOL is activating…" message
│
└── Confirmation [SCREEN]
    ├── Success state
    ├── Amount staked + estimated APY
    ├── Activation countdown (epoch-anchored)
    └── [ Go to Earn Hub ] → exits to Earn Hub
```

**Post-flow destination:** Earn Hub (always — regardless of entry point). Earn Hub will now show the position in post-stake state.

**Assumptions active in this flow:**

- A1: Asset-first entry makes staking discoverable
- A2: Validator metrics scannable and sufficient
- A4: Epoch timing expressed in human terms (hours/calendar, not epoch numbers)
- A5: Lock-up not a deterrent if surfaced early
- A6: Sovereignty users accept delegating to a third-party validator
- A12: Progressive risk disclosure doesn’t create false confidence
- A13: Sovereignty positioning holds through validator delegation moment

-----

### 5.2 Unstake Flow

**Entry points (2):**

1. Staking Position Detail → Actions → Unstake
1. Stake Account Detail sheet → Unstake (only if status = Active)

**V1 behaviour:** Full stake account unstaked — no partial unstaking. Future: partial unstake when multiple stake accounts exist.

```
Unstake Flow
│
├── Cooldown Disclosure [SCREEN] ← critical design moment
│   ├── Amount being unstaked
│   ├── Visual timeline (3 steps)
│   │   ├── Step 1: Deactivation starts at epoch boundary
│   │   ├── Step 2: SOL locked during cooldown (~1 epoch, ~48hrs)
│   │   └── Step 3: Withdraw available — you'll be notified
│   ├── Concrete date/time for each step (not epoch numbers)
│   ├── Network fee (fiat-first)
│   └── [ Confirm Unstake ] → biometric auth
│
├── Deactivating State [PERSISTENT STATE · in Earn Hub + Home widget]
│   ├── Status chip: "Cooldown"
│   ├── Epoch countdown (visible in position card)
│   └── Push notification queued for epoch boundary
│
└── Withdraw [SCREEN · surfaces when status = Withdrawable]
    ├── Amount available to withdraw
    ├── Destination: main wallet (automatic, no selection)
    ├── Network fee
    └── [ Confirm Withdraw ] → SOL returns to main balance
```

**Post-flow destination:** Earn Hub. If no position remains after withdraw, Earn Hub reverts to pre-stake state.

**Assumptions active in this flow:**

- U1: Users know where to find their staked position to unstake
- U2: Partial unstake understood without stake account mechanics
- U3: Cooldown feels acceptable once anchored to a calendar date
- U4: Users in deactivating state don’t interpret SOL as lost
- U5: Users trust the countdown without contacting support
- U6: One-time restake nudge doesn’t feel predatory

-----

### 5.3 On-Ramp Flow (Buy)

**Entry points (2):**

1. [+] Main Actions → Buy
1. Asset Detail → Buy [asset] (contextual CTA)

**Provider:** MoonPay via Flutter WebView (`flutter_inappwebview`). Provider-agnostic design shell wraps the integration — UI is wallet-owned up to the KYC/payment handoff point.

```
On-Ramp Flow
│
├── Asset & Amount Selection [SCREEN · wallet-owned]
│   ├── Asset selector (BTC, ETH, SOL, USDC)
│   ├── Fiat amount input (local currency)
│   ├── Estimated crypto received
│   ├── Fee breakdown (MoonPay fee + network fee)
│   ├── Payment method selector
│   └── [ Continue ]
│
├── [Handoff to MoonPay WebView]
│   ├── KYC / identity verification (MoonPay-owned)
│   ├── Payment processing (MoonPay-owned)
│   └── Transparent handoff notice: "Completing with our payment partner"
│
└── Confirmation [SCREEN · wallet-owned]
    ├── Order confirmed state
    ├── Estimated arrival time
    └── [ View in Activity ] → Activity tab
```

-----

### 5.4 Send Flow

**Entry points (2):**

1. [+] Main Actions → Send
1. Asset Detail → Send

```
Send Flow
│
├── Asset Selection [SCREEN] (if from [+])
│   └── Skipped if entry from Asset Detail (asset pre-filled)
│
├── Recipient Input [SCREEN]
│   ├── Address field (paste / QR scan)
│   ├── ENS / domain resolution (with confirmation)
│   ├── Address book (saved contacts)
│   └── Recent addresses
│
├── Amount Entry [SCREEN]
│   ├── Amount input (asset or fiat toggle)
│   ├── Available balance
│   └── Network fee estimate (fiat-first)
│
├── Review & Sign [SCREEN]
│   ├── Recipient address (full, with copy)
│   ├── Amount (asset + fiat equivalent)
│   ├── Network fee (fiat-first)
│   ├── Consequence callout for irreversibility
│   └── [ Confirm & Sign ] → biometric auth
│
└── Confirmation [SCREEN]
    ├── Submitted → Activity
    └── [ Done ]
```

-----

## 6. Conditional Surfaces

Several UI surfaces render conditionally based on staking state. These must be handled as state-aware components, not separate screens.

|Surface                |Condition           |Location                  |Behaviour                                                                                           |
|-----------------------|--------------------|--------------------------|----------------------------------------------------------------------------------------------------|
|Staking Widget         |Post-stake only     |Home                      |Appears after first stake confirmation. Persists unless full withdraw.                              |
|Position Card          |Post-stake only     |Earn Hub                  |Replaces Entry Card when any active or activating stake account exists.                             |
|Earn tab (Asset Detail)|Always              |SOL Asset Detail          |Pre-stake: shows nudge + CTA. Post-stake: shows position card summary. Both tap through to Earn Hub.|
|Cooldown status chip   |Deactivating state  |Position Card, Home Widget|Shows “Cooldown” label + epoch countdown.                                                           |
|Withdraw button        |Withdrawable state  |Staking Position Detail   |Only surfaces when at least one stake account status = Withdrawable.                                |
|Unstake action         |Active state only   |Stake Account Detail sheet|Hidden if status ≠ Active.                                                                          |
|Re-stake nudge         |Post-withdraw (once)|Earn Hub                  |Single-instance nudge shown once after a successful full withdraw. Dismissed permanently.           |

-----

## 7. State Machine: Staking Position

The staking position passes through five distinct states. Each state has a defined UI expression.

```
[No position]
    │
    └── Stake Flow → ACTIVATING
            │
            └── (1 epoch, ~48hrs) → ACTIVE
                    │
                    └── Unstake Flow → DEACTIVATING
                            │
                            └── (1 epoch, ~48hrs) → WITHDRAWABLE
                                    │
                                    └── Withdraw → [No position]
```

|State       |Status Chip Label         |Home Widget             |Earn Hub Card         |Action Available   |
|------------|--------------------------|------------------------|----------------------|-------------------|
|No position |—                         |Hidden                  |Entry Card (pre-stake)|Start Staking      |
|Activating  |“Activating” · amber      |Visible, amber chip     |Position Card         |None (waiting)     |
|Active      |“Active” · green          |Visible, green chip     |Position Card         |Stake More, Unstake|
|Deactivating|“Cooldown” · amber        |Visible, epoch countdown|Position Card         |None (waiting)     |
|Withdrawable|“Ready to withdraw” · blue|Visible, CTA            |Position Card         |Withdraw           |

-----

## 8. Navigation Patterns by Interaction Type

|Pattern           |Trigger                           |Example                                          |Return Behaviour                                      |
|------------------|----------------------------------|-------------------------------------------------|------------------------------------------------------|
|Full-screen push  |Tap on a row or card              |Asset Detail, Staking Position Detail            |Back arrow → parent                                   |
|Bottom sheet      |Secondary action                  |Stake Account Detail, Transaction Detail, Receive|Swipe down or close → parent                          |
|Modal stack       |[+] actions, Stake Flow, Send Flow|All shared flows                                 |Completion → defined destination (not back to trigger)|
|Tab switch        |Tab bar tap                       |Home ↔ Earn Hub                                  |State preserved within tab                            |
|Pointer navigation|Earn tab in Asset Detail          |“Earn →” taps                                    |Exits current screen, switches to Earn Hub tab        |

-----

## 9. Entry Point Map: SOL Staking

All routes a user can take to initiate, view, or manage a staking position:

```
Entry Intent          Surface               Route
─────────────────     ───────────────────   ──────────────────────────────────────
Start staking         [+] Main Actions      → Stake Flow → Earn Hub
Start staking         Earn Hub              Entry Card → Stake Flow → Earn Hub
Start staking         SOL Asset Detail      Earn tab nudge → Earn Hub (pointer)
View position         Home                  Staking Widget → Staking Position Detail
View position         Earn Hub              Position Card → Staking Position Detail
View position         Activity              Stake event → Transaction Detail (read-only)
Add to position       Staking Position Det. Actions → Stake More → Stake Flow
Unstake               Staking Position Det. Actions → Unstake Flow
Unstake               Stake Account Detail  Unstake button → Unstake Flow
Withdraw              Staking Position Det. Withdraw button (when Withdrawable)
```

-----

## 10. UXR Assumption Map

The following assumptions are active in V1 and require validation before high-confidence wireframing. Mapped to the journey stages where they become critical.

### Staking Assumptions (A1–A13)

|ID |Assumption                                                                           |Risk  |UXR Study|Journey Stage             |
|---|-------------------------------------------------------------------------------------|------|---------|--------------------------|
|A1 |Asset-first entry makes staking discoverable without a dedicated nav section         |High  |S3.1     |Discovery                 |
|A2 |Validator metrics (APY, commission, uptime) are scannable and sufficient for decision|High  |S3.2     |Review & Sign             |
|A3 |APY framing motivates action without triggering skepticism                           |Medium|S3.1     |Discovery                 |
|A4 |Users grasp epoch timing when expressed in hours / calendar dates                    |High  |S3.3     |Amount Entry, Confirmation|
|A5 |Lock-up disclosed at Amount Entry isn’t a dealbreaker                                |High  |S3.2     |Amount Entry              |
|A6 |Sovereignty users accept delegating to a third-party proprietary validator           |High  |S3.4     |Review & Sign             |
|A7 |Commission + uptime is sufficient to communicate validator risk                      |Medium|S3.2     |Review & Sign             |
|A8 |Epoch progress indicators reduce anxiety during the Activating state                 |Medium|S3.3     |Post-stake wait           |
|A9 |Users distinguish Activating / Active / Deactivating states without support          |High  |S3.3     |All post-stake states     |
|A10|Dual denomination (SOL + USD) is sufficient for reward comprehension                 |Low   |S3.1     |Rewards tab               |
|A11|Unstake flow is intuitive without additional guidance                                |Medium|S3.2     |Unstake Flow              |
|A12|Progressive risk disclosure doesn’t create false confidence                          |High  |S3.2     |Review & Sign             |
|A13|Sovereignty positioning holds through third-party validator moments                  |High  |S3.4     |Review & Sign             |

### Unstaking Assumptions (U1–U6)

|ID|Assumption                                                              |Risk  |UXR Study|Journey Stage      |
|--|------------------------------------------------------------------------|------|---------|-------------------|
|U1|Users know where to find their staked position to unstake               |High  |S3.1     |Unstake discovery  |
|U2|Partial unstake is understood without explaining stake account mechanics|Medium|S3.2     |Cooldown Disclosure|
|U3|Cooldown feels acceptable once anchored to a concrete calendar date     |High  |S3.3     |Cooldown Disclosure|
|U4|Users in deactivating state don’t interpret SOL as lost                 |High  |S3.3     |Deactivating state |
|U5|Users trust the countdown without contacting support                    |High  |S3.3     |Deactivating state |
|U6|One-time restake nudge doesn’t feel predatory                           |Medium|S3.4     |Post-withdraw      |

### Navigation-Level Assumptions (New — V2 nav)

|ID|Assumption                                                                |Risk  |Rationale                                                   |
|--|--------------------------------------------------------------------------|------|------------------------------------------------------------|
|N1|Users understand [+] as a global action trigger, not a tab                |High  |Non-standard pattern — requires clear icon + label treatment|
|N2|Stake in [+] routing directly to Stake Flow (not Earn Hub) is expected    |Medium|Users may expect [+] → Earn Hub → then stake                |
|N3|Earn Hub as a dedicated tab signals yield/staking as a first-class feature|Low   |Positive differentiation signal                             |
|N4|Earn tab in Asset Detail as a pointer (not owner) doesn’t confuse users   |Medium|Cross-tab navigation is uncommon on mobile                  |

-----

## 11. Critical Design Moments

These are the highest-anxiety, highest-consequence moments in the staking experience. Each requires the most careful design attention.

### 11.1 Liquidity Guardrail (Amount Entry)

**What:** Warning that prevents users from staking 100% of SOL balance.
**Why it’s critical:** Users who stake their full balance have no SOL for transaction fees. Common mistake across all wallets.
**Design requirement:** Persistent inline banner (not a modal interrupt) when input would leave < 0.05 SOL. Non-blocking — user can proceed but cannot miss the warning.
**Principle:** P7 — Consequence-Aware by Design.

### 11.2 Validator Transparency (Review & Sign)

**What:** The moment the user sees who they’re delegating to and why.
**Why it’s critical:** This is the deepest sovereignty tension in the product. Proprietary single-validator model removes user choice — the design must earn that trust explicitly.
**Design requirement:** Validator card must be expandable (not a tooltip). “Why this validator?” must link to transparent selection criteria, not marketing copy. Commission, uptime, and stake weight visible without expanding.
**Principle:** P1 (Sovereignty-First), P4 (Transparency as Product Commitment).

### 11.3 Cooldown Disclosure (Unstake Flow)

**What:** The screen informing the user their SOL will be locked for ~1 epoch (~48hrs) before it’s withdrawable.
**Why it’s critical:** Most wallet complaints about staking relate to unexpected lock-up. This screen must land *before* the user feels deceived, not as a disclaimer.
**Design requirement:** Visual 3-step timeline (not a text block). Concrete calendar dates on each step. Epoch number should never appear — only human time anchors. Must be a full screen, not an alert.
**Principle:** P3 (Intervene at the Point That Matters), P7 (Consequence-Aware by Design).

### 11.4 Deactivating State Communication

**What:** The state between Unstake confirmation and SOL being withdrawable.
**Why it’s critical:** Users cannot tell if something went wrong. This is the highest support-call trigger in all staking UIs.
**Design requirement:** Epoch countdown prominently visible in both Home Widget and Earn Hub Position Card. Push notification on epoch boundary (“Your SOL is ready to withdraw”). Status chip must never read “Pending” — must read “Cooldown” with a time anchor.
**Principle:** P4 (Transparency), P6 (Progressive Trust).

-----

## 12. Screen Inventory

Complete list of screens and surfaces in V1 scope.

### Persistent

|ID |Surface|Type            |Parent  |
|---|-------|----------------|--------|
|S00|Tab Bar|Nav (persistent)|App root|

### Home

|ID   |Surface          |Type             |Parent               |
|-----|-----------------|-----------------|---------------------|
|S01  |Home             |Screen           |Tab Bar              |
|S01-A|Portfolio Summary|Content          |Home                 |
|S01-B|Staking Widget   |Row (conditional)|Home                 |
|S02  |Asset Detail     |Screen (push)    |Portfolio Summary row|
|S02-A|Activity tab     |Tab              |Asset Detail         |
|S02-B|Earn tab         |Tab (pointer)    |Asset Detail         |
|S02-C|Info tab         |Tab              |Asset Detail         |

### Activity

|ID   |Surface           |Type  |Parent            |
|-----|------------------|------|------------------|
|S03  |Activity          |Screen|Tab Bar           |
|S03-A|Transaction Detail|Sheet |Activity event row|

### Main Actions

|ID   |Surface     |Type  |Parent            |
|-----|------------|------|------------------|
|S04  |Main Actions|Sheet |Tab Bar [+]       |
|S04-A|Send        |Action|Main Actions sheet|
|S04-B|Receive     |Action|Main Actions sheet|
|S04-C|Buy         |Action|Main Actions sheet|
|S04-D|Stake       |Action|Main Actions sheet|

### Earn Hub

|ID     |Surface                |Type             |Parent                 |
|-------|-----------------------|-----------------|-----------------------|
|S05    |Earn Hub               |Screen           |Tab Bar                |
|S05-A  |SOL Staking Entry Card |State (pre-stake)|Earn Hub               |
|S05-B  |Staking Position Card  |Row (post-stake) |Earn Hub               |
|S06    |Staking Position Detail|Screen (push)    |Position Card          |
|S06-A  |Summary tab            |Tab              |Staking Position Detail|
|S06-B  |Rewards tab            |Tab              |Staking Position Detail|
|S06-B1 |Epoch bar chart        |Content          |Rewards tab            |
|S06-B2 |Epoch progress ring    |Content          |Rewards tab            |
|S06-C  |Accounts tab           |Tab              |Staking Position Detail|
|S06-C1 |Stake Account Detail   |Sheet            |Accounts tab           |
|S06-C1a|Validator info         |Content          |Stake Account Detail   |
|S06-C1b|Status chip            |Content          |Stake Account Detail   |
|S06-D  |Actions section        |Action surface   |Staking Position Detail|

### Shared Flows

|ID   |Surface                 |Type                                 |Entry Points                                  |
|-----|------------------------|-------------------------------------|----------------------------------------------|
|F01  |Stake Flow              |Modal stack                          |[+] Stake, Earn Hub Entry Card, SPD Stake More|
|F01-A|Amount Entry            |Screen                               |F01                                           |
|F01-B|Review & Sign           |Screen                               |F01                                           |
|F01-C|Confirmation            |Screen                               |F01                                           |
|F02  |Unstake Flow            |Modal stack                          |SPD Actions, Stake Account Detail             |
|F02-A|Cooldown Disclosure     |Screen                               |F02                                           |
|F02-B|Deactivating State      |Persistent state                     |F02                                           |
|F02-C|Withdraw                |Screen                               |F02 (when Withdrawable)                       |
|F03  |On-Ramp Flow            |Modal stack                          |[+] Buy, Asset Detail                         |
|F03-A|Asset & Amount Selection|Screen                               |F03                                           |
|F03-B|MoonPay WebView         |External handoff                     |F03                                           |
|F03-C|Confirmation            |Screen                               |F03                                           |
|F04  |Send Flow               |Modal stack                          |[+] Send, Asset Detail                        |
|F04-A|Asset Selection         |Screen (skipped if from Asset Detail)|F04                                           |
|F04-B|Recipient Input         |Screen                               |F04                                           |
|F04-C|Amount Entry            |Screen                               |F04                                           |
|F04-D|Review & Sign           |Screen                               |F04                                           |
|F04-E|Confirmation            |Screen                               |F04                                           |

-----

## 13. Open Design Questions

The following decisions are unresolved and require UXR or product alignment before wireframing those surfaces.

|#  |Question                                                                                                                           |Stakes                                              |Resolution path                                                           |
|---|-----------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|--------------------------------------------------------------------------|
|OQ1|Should Stake in [+] show a brief asset-confirm step before Amount Entry (for future multi-asset readiness)?                        |If skipped now, adding later breaks the flow pattern|Product decision — recommend skipping in V1, adding when ETH staking ships|
|OQ2|Does the Earn tab in Asset Detail ever show position details inline, or is it always a pointer to Earn Hub?                        |Duplication risk vs. discoverability                |UXR: test whether users expect inline vs. navigation away                 |
|OQ3|Re-stake nudge after full withdraw — should it appear in Earn Hub, as a push notification, or both?                                |Aggressive vs. passive re-engagement                |PLG strategy decision                                                     |
|OQ4|Should the validator rationale (“Why this validator?”) link to a Trust Centre section or a contextual sheet?                       |Sovereignty positioning depth                       |Awaiting Trust Centre design                                              |
|OQ5|Partial unstaking — should it be available if the user has a single stake account with a large balance?                            |User control vs. implementation complexity          |Engineering + UXR decision                                                |
|OQ6|How does the [+] action sheet handle cases where the user has no SOL? (Buy should be promoted, Stake should be disabled or removed)|Empty-state logic                                   |State-aware component design required                                     |

-----

## 14. Competitive Reference Points

|Pattern                   |Wallet                               |Sovereign Wallet approach                                    |
|--------------------------|-------------------------------------|-------------------------------------------------------------|
|Stake as main action      |Phantom (has Stake in action bar)    |Same pattern — direct flow trigger                           |
|Validator default         |Phantom (PSOL liquid staking default)|Proprietary single validator — transparent rationale required|
|Earn hub as dedicated tab |Coinbase Wallet (Rewards tab)        |Earn Hub — broader scope, SOL staking V1                     |
|Cooldown disclosure       |Most wallets — buried in confirmation|Full-screen visual timeline — first-class treatment          |
|Post-stake position widget|Solflare (position in main view)     |Home widget + Earn Hub position card                         |
|Epoch visualization       |Marinade, Jito (minimal)             |Epoch ring + bar chart — designed as retention mechanic      |
|On-ramp integration       |MoonPay across multiple wallets      |Provider-agnostic shell — MoonPay V1                         |

-----

## 15. Revision Log

|Version|Change                                                                                                                                             |Date      |
|-------|---------------------------------------------------------------------------------------------------------------------------------------------------|----------|
|1.0    |Initial IA — portfolio-first, staking under SOL Asset Detail                                                                                       |Prior     |
|1.5    |Added Staking Position Detail three-level nav, single-validator pivot                                                                              |Prior     |
|2.0    |Full 5-tab nav shell. Stake promoted to [+] main action. Earn Hub owns position lifecycle. Stake Flow as shared modal. Nav assumptions N1–N4 added.|2026-03-29|

-----

*This document is company-agnostic and externally shareable. Wallet name references are internal working titles only.*