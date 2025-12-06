export default function ListingCard({ listing }) {
  return (
    <div
      style={{
        borderRadius: 10,
        border: "1px solid #26273a",
        padding: 10,
        marginBottom: 8,
        background: "#0a0b14",
      }}
    >
      <div style={{ fontSize: 13, marginBottom: 4 }}>
        <b>{listing.type}</b> • {listing.itemType}
        {listing.platform ? ` • ${listing.platform}` : ""}
      </div>
      <div style={{ fontSize: 14, marginBottom: 4 }}>
        💰 {listing.price} {listing.currency || "EUR"}
      </div>
      {listing.description && (
        <div style={{ fontSize: 12, opacity: 0.8 }}>
          {listing.description}
        </div>
      )}
      {listing.status && (
        <div style={{ fontSize: 11, marginTop: 4, opacity: 0.6 }}>
          Status: {listing.status}
        </div>
      )}
    </div>
  );
}
