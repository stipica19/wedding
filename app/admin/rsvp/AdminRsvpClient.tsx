"use client";

import { useMemo, useState } from "react";

type Item = {
  _id: string;
  status: "YES" | "NO";
  guests: string[];
  message?: string;
  createdAt?: string;
};

type Props = {
  items: Item[];
  stats: { yesCount: number; noCount: number; totalYesGuests: number };
};

type Filter = "ALL" | "YES" | "NO";

export default function AdminRsvpClient({ items, stats }: Props) {
  const [filter, setFilter] = useState<Filter>("ALL");

  const filtered = useMemo(() => {
    if (filter === "ALL") return items;
    return items.filter((x) => x.status === filter);
  }, [items, filter]);

  return (
    <div style={styles.page}>
      {/* Sticky header (super za mob) */}
      <div style={styles.stickyTop}>
        <div style={styles.headerRow}>
          <div>
            <h1 style={styles.h1}>Lista gostiju</h1>
            <p style={styles.sub}>
              DOLAZE: <b>{stats.yesCount}</b> · NE DOLAZE:{" "}
              <b>{stats.noCount}</b> · Ukupno osoba dolazi:{" "}
              <b>{stats.totalYesGuests}</b>
            </p>
          </div>
        </div>

        <div style={styles.filters}>
          <Chip
            active={filter === "ALL"}
            onClick={() => setFilter("ALL")}
            label={`Svi (${items.length})`}
          />
          <Chip
            active={filter === "YES"}
            onClick={() => setFilter("YES")}
            label={`Dolaze (${stats.yesCount})`}
            tone="success"
          />
          <Chip
            active={filter === "NO"}
            onClick={() => setFilter("NO")}
            label={`Ne dolaze (${stats.noCount})`}
            tone="danger"
          />
        </div>
      </div>

      {/* List */}
      <div style={styles.list}>
        {filtered.length === 0 ? (
          <div style={styles.empty}>Nema rezultata za odabrani filter.</div>
        ) : (
          filtered.map((it) => (
            <div key={it._id} style={styles.card}>
              <div style={styles.cardTop}>
                <span
                  style={{
                    ...styles.badge,
                    ...(it.status === "YES" ? styles.badgeYes : styles.badgeNo),
                  }}
                >
                  {it.status === "YES" ? "DOLAZE" : "NE DOLAZE"}
                </span>

                {/* mali “count” osoba u unosu */}
                <span style={styles.countPill}>
                  {it.guests?.length || 0} osoba
                </span>
              </div>

              <div style={styles.names}>{(it.guests || []).join(", ")}</div>

              {it.message ? (
                <div style={styles.message}>{it.message}</div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
  tone = "neutral",
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  tone?: "neutral" | "success" | "danger";
}) {
  const base = {
    ...styles.chip,
    ...(tone === "success" ? styles.chipSuccess : {}),
    ...(tone === "danger" ? styles.chipDanger : {}),
    ...(active ? styles.chipActive : {}),
  } as const;

  return (
    <button type="button" onClick={onClick} style={base}>
      {label}
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "14px 14px 28px",
  },

  stickyTop: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    paddingTop: 10,
    paddingBottom: 12,
    borderBottom: "1px solid rgba(0,0,0,0.06)",
  },

  headerRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },

  h1: {
    margin: 0,
    fontSize: 22,
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
  },

  sub: {
    margin: "6px 0 0",
    fontSize: 13,
    opacity: 0.8,
    lineHeight: 1.35,
  },

  filters: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 10,
  },

  chip: {
    border: "1px solid rgba(0,0,0,0.10)",
    background: "white",
    padding: "10px 12px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    lineHeight: 1,
    boxShadow: "0 1px 0 rgba(0,0,0,0.03)",
  },

  chipActive: {
    borderColor: "rgba(0,0,0,0.22)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    transform: "translateY(-1px)",
  },

  chipSuccess: {
    borderColor: "rgba(16,185,129,0.35)",
  },
  chipDanger: {
    borderColor: "rgba(239,68,68,0.35)",
  },

  list: {
    display: "grid",
    gap: 10,
    marginTop: 12,
  },

  card: {
    padding: 14,
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "white",
    boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
  },

  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.04em",
  },

  badgeYes: {
    background: "rgba(16,185,129,0.12)",
    border: "1px solid rgba(16,185,129,0.35)",
  },

  badgeNo: {
    background: "rgba(239,68,68,0.10)",
    border: "1px solid rgba(239,68,68,0.35)",
  },

  countPill: {
    fontSize: 12,
    fontWeight: 700,
    opacity: 0.75,
    border: "1px solid rgba(0,0,0,0.10)",
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(0,0,0,0.02)",
    whiteSpace: "nowrap",
  },

  names: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 1.45,
    fontWeight: 650,
    letterSpacing: "-0.01em",
    wordBreak: "break-word",
  },

  message: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 1.45,
    opacity: 0.85,
    padding: "10px 12px",
    borderRadius: 14,
    background: "rgba(0,0,0,0.03)",
    border: "1px solid rgba(0,0,0,0.06)",
    whiteSpace: "pre-wrap",
  },

  empty: {
    padding: 14,
    borderRadius: 16,
    border: "1px dashed rgba(0,0,0,0.18)",
    background: "rgba(0,0,0,0.02)",
    textAlign: "center",
    opacity: 0.8,
  },
};
