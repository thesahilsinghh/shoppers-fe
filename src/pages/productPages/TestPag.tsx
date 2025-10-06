import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { useState } from "react";


const ALL_PRODUCTS = gql`
    query AllProducts($filters: FilterProducts) {
    allProducts(filters: $filters) {
      _id
      category
      description
      image
      price
      publish
      quantity
      title
    }
  }
`;


const TestPage = () => {

    const [filters, setFilters] = useState({
        category: undefined,
        sortBy: "createdAt",
        sortOrder: "asc",
        page: 1,
        limit: 10,
        minPrice: 0,
        maxPrice:undefined,
    });

    const { data, error, loading, refetch } = useQuery(ALL_PRODUCTS, {
        variables: { filters }
    });

    if(error) {
        return <p> {error.message} </p>
    }

    return (
        <div>
            {
                data?.allProducts?.map(product => (
                    <div key={product._id}>
                        <p> {product.title} </p>
                    </div>
                ))
            }
        </div>
    )
}

export default TestPage;