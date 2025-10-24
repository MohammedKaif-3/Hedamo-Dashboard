import { useEffect, useState } from "react";
import productsData from "../data/products.json";
import { FiSearch } from "react-icons/fi";
import ProductsGrid from "../components/ui/ProductsGrid";
import SelectModal from "../components/ui/SelectModal";

const getStatus = (score) => {
    if (score >= 80) return "Approved";
    if (score >= 60) return "Pending";
    return "Flagged";
};

const Products = ({ theme }) => {
    const isDark = theme === "dark";
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [scoreRange, setScoreRange] = useState([0, 100]);
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        setProducts(productsData);
    }, []);

    // Filter products
    const filtered = products.filter((p) => {
        const status = getStatus(p.score);
        return (
            p.productName.toLowerCase().includes(query.toLowerCase()) &&
            p.score >= scoreRange[0] &&
            p.score <= scoreRange[1] &&
            (statusFilter === "All" || status === statusFilter)
        );
    });

    return (
        <div
            className={`font-poppins transition-colors duration-300 ${isDark ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
                }`}
            style={{
                maxHeight: "calc(100vh - 70px)",
                overflowY: "auto",
            }}

        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between m-10 gap-4">
                <h1 className="text-3xl font-semibold">Product Transparency</h1>
                {/* Filters */}
                <div className="flex flex-wrap gap-3 items-center">
                    {/* Search */}
                    <div
                        className={`flex items-center px-3 py-2 rounded-lg ${isDark ? "bg-gray-800" : "bg-white"
                            }`}
                    >
                        <FiSearch className="opacity-70 mr-2" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className={`bg-transparent outline-none ${isDark ? "text-white" : "text-gray-800"
                                }`}
                        />
                    </div>

                    <SelectModal
                        theme={theme}
                        value={statusFilter}
                        onChange={setStatusFilter}
                    />

                </div>
            </div>

            {/* Product Grid */}
            <ProductsGrid products={filtered} isDark={isDark} />
        </div>
    );
};

export default Products;
