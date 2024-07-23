const PropertyDetail = ({ property }: { property: any }) => {
  console.log(property.location);
  if (!property) {
    return <p>No property details available.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{property.address?.line}</h1>
      <img
        src={property.photos ? property.photos[0].href : 'default_image.jpg'}
        alt={property.description ? property.description : 'Property'}
        className="w-full h-96 object-cover rounded mb-4"
      />
      <p className="text-xl mb-2">
        {property.last_price_change_amount
          ? `$${property?.last_price_change_amount}`
          : 'Price not available'}
      </p>
      <p className="mb-2">
        {property.location?.address?.city},{' '}
        {property.location?.address?.state_code}{' '}
        {property.location?.address?.postal_code}
      </p>
      <p className="mb-4">
        {typeof property.description?.text === 'string'
          ? property.description?.text
          : 'No description available'}
      </p>
      <div className="text-lg">
        {property.description?.beds} Beds | {property.description?.baths} Baths
        | {property.description?.sqft} Sq Ft
      </div>
    </div>
  );
};

export default PropertyDetail;
