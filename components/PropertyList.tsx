import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_REALTY_API_KEY;

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          'https://realty-in-us.p.rapidapi.com/properties/v3/list',
          {
            limit: 20,
            offset: (page - 1) * 20,
            postal_code: '90004',
            status: ['for_sale', 'ready_to_build'],
            sort: { direction: 'desc', field: 'list_date' },
          },
          {
            headers: {
              'x-rapidapi-host': 'realty-in-us.p.rapidapi.com',
              'Content-Type': 'application/json',
              'x-rapidapi-key': apiKey,
            },
          },
        );
        setLoading(false);
        setProperties(response.data.data.home_search.results);
      } catch (err: ErrorEvent | any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [page]);

  const handlePropertyClick = (property: any) => {
    console.log(property);
    router.push({
      pathname: `/property/${property.property_id}`,
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {properties.map((property: any) => (
          <div
            key={property.listing_id}
            className="border p-4 rounded-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handlePropertyClick(property)}
          >
            <img
              src={
                property.primary_photo
                  ? property.primary_photo.href
                  : 'default_image.jpg'
              }
              alt={property.description ? property.description : 'Property'}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-bold">{property.address?.line}</h2>
            <p>
              {property.last_sold_price
                ? `$${property?.last_sold_price}`
                : 'Price not available'}
            </p>
            <p>
              {property.location?.address?.city},{' '}
              {property.location?.address?.state_code}{' '}
              {property.location?.address?.postal_code}
            </p>
            <p>
              {typeof property.branding[0]?.name === 'string'
                ? property.branding[0]?.name
                : 'No description available'}
            </p>
            <div>
              {property.description.beds} Beds | {property.description.baths}{' '}
              Baths | {property.description.sqft} Sq Ft
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyList;
