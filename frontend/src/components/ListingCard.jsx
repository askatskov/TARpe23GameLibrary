export default function ListingCard({ item }) {
  return (
    <div style={{
      border: "1px solid #bbb",
      padding: 10,
      borderRadius: 8,
      margin: 10
    }}>
      <p><b>{item.type}</b> | {item.itemType}</p>
      <p>Price: {item.price} {item.currency}</p>
      <p>{item.description}</p>
    </div>
  );
}
