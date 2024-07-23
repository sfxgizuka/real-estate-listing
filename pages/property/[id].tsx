import { useRouter } from 'next/router';
import PropertyDetail from '../../components/PropertyDetail';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyDetailPage = () => {
  const router = useRouter();
  const { id, property } = router.query;
  const [propertyData, setPropertyData] = useState<any>(null);
  const apiKey = process.env.NEXT_PUBLIC_REALTY_API_KEY;

  useEffect(() => {
    if (property) {
      setPropertyData(JSON.parse(property as string));
    } else {
      // Fetch property details using the ID if property data is not passed in the query
      const fetchProperty = async () => {
        try {
          const response = await axios.get(
            `https://realty-in-us.p.rapidapi.com/properties/v3/detail`,
            {
              params: { property_id: id },
              headers: {
                'x-rapidapi-host': 'realty-in-us.p.rapidapi.com',
                'Content-Type': 'application/json',
                'x-rapidapi-key': apiKey,
              },
            },
          );
          setPropertyData(response.data?.data?.home);
        } catch (err) {
          console.error(err);
        }
      };

      fetchProperty();
    }
  }, [id, property]);

  return propertyData ? (
    <PropertyDetail property={propertyData} />
  ) : (
    <p>Loading...</p>
  );
};

export default PropertyDetailPage;
